import axios from 'axios';
import cookieParser from 'cookie';
import isEmpty from 'lodash/isEmpty';
import * as Sentry from '@sentry/browser';
import { toast } from 'react-toastify';
import ENV, { Config, envNameConfig } from 'configs';
import { readCookie, ereaseAllCookies } from 'utils/cookieStorage';
import LocalStorageServices from 'utils/localStorage';
import { AUTH_USER, MSG } from 'consts';

const singleton = Symbol('key for first');
const singletonEnforcer = Symbol('key for assign');

const REQUEST_TIMEOUT = 15000;

export const requestTokenHeaders = () => {
    if (!readCookie(AUTH_USER.ACCESS_TOKEN)) {
        return null;
    }
    return {
        Authorization: `Bearer ${readCookie(AUTH_USER.ACCESS_TOKEN)}`,
    };
};

const requestHeaders = () => ({
    'content-type': 'application/json',
});

const getClient = (headers, baseURLDomain) => {
    const baseUrl = baseURLDomain || Config.API_SERVER;
    const customHeaders = headers || {};

    const options = {
        baseURL: baseUrl,
        timeout: REQUEST_TIMEOUT,
        headers: {
            ...requestHeaders(),
            ...customHeaders,
        },
    };
    const client = axios.create(options);

    // Add a request interceptor
    client.interceptors.request.use(
        (requestConfig) => requestConfig,
        (requestError) => {
            return Promise.reject(requestError);
        },
    );

    // Add a response interceptor
    client.interceptors.response.use(
        (response) => response,
        (responseError) => {
            if (ENV === envNameConfig.PRODUCTION) {
                Sentry.captureException(new Error(responseError));
            }
            if (!responseError.response) {
                toast.error(MSG.NETWORK_ERROR, {
                    position: 'top-right',
                });
                LocalStorageServices.removeAll();
                ereaseAllCookies();
                //   redirect login
            }
            const { response } = responseError;
            if (response && response.status === 401 && response?.config?.url !== 'auth/login') {
                //   redirect login
            }
            return response;
        },
    );

    return client;
};

const HttpInstance = (headers = null, baseURLDomain = null, ssrHeaders) => {
    class ApiConfig {
        constructor(enforcer) {
            if (enforcer !== singletonEnforcer) {
                throw new Error('Cannot construct singleton');
            }

            this.client = getClient(headers, baseURLDomain);
            this.srrCookies = (!isEmpty(ssrHeaders?.cookie) && cookieParser.parse(ssrHeaders?.cookie)) || null;
        }

        static get instance() {
            // Try to get an efficient singleton
            if (!this[singleton]) {
                this[singleton] = new ApiConfig(singletonEnforcer);
            }

            return this[singleton];
        }
        // async checkToken() {
        //     let tkType;
        //     let isAccToken;
        //     let isTokenType = 'Bearer';
        //     if (this.srrCookies) {
        //         tkType = this.srrCookies[listCookieStorageName.token_type];
        //         isAccToken = this.srrCookies[listCookieStorageName.access_token];
        //         isTokenType = tkType && uppercaseFirstLetter(tkType);
        //     } else if (typeof document !== 'undefined') {
        //         tkType = getCookie(listCookieStorageName.token_type);
        //         isAccToken = getCookie(listCookieStorageName.access_token);
        //         isTokenType = tkType && uppercaseFirstLetter(tkType);
        //     }
        //     if (isAccToken) {
        //         this.setJwtToken(isAccToken, isTokenType);
        //     } else {
        //         const getRefreshToken = getCookie(listCookieStorageName.refresh_token);
        //         if (getRefreshToken) {
        //             // refresh token
        //         } else {
        //             // logout
        //         }
        //     }
        //     return true;
        // }

        get(url, conf = {}) {
            return this.client
                .get(url, conf)
                .then((response) => Promise.resolve(response))
                .catch((error) => Promise.reject(error));
        }

        delete(url, data, conf = {}) {
            return this.client
                .delete(url, data, conf)
                .then((response) => Promise.resolve(response))
                .catch((error) => Promise.reject(error));
        }

        head(url, conf = {}) {
            return this.client
                .head(url, conf)
                .then((response) => Promise.resolve(response))
                .catch((error) => Promise.reject(error));
        }

        options(url, conf = {}) {
            return this.client
                .options(url, conf)
                .then((response) => Promise.resolve(response))
                .catch((error) => Promise.reject(error));
        }

        post(url, data = {}, conf = {}) {
            return this.client
                .post(url, data, conf)
                .then((response) => Promise.resolve(response))
                .catch((error) => Promise.reject(error));
        }

        put(url, data = {}, conf = {}) {
            return this.client
                .put(url, data, conf)
                .then((response) => Promise.resolve(response))
                .catch((error) => Promise.reject(error));
        }

        patch(url, data = {}, conf = {}) {
            return this.client
                .patch(url, data, conf)
                .then((response) => Promise.resolve(response))
                .catch((error) => Promise.reject(error));
        }
    }
    return ApiConfig.instance;
};

export default HttpInstance;
