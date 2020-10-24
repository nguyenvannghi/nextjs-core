import axios from 'axios';
import cookieParser from 'cookie';
import isEmpty from 'lodash/isEmpty';
import { toast } from 'react-toastify';
import ENV, { Config, envNameConfig } from 'configs';
import * as authService from 'services/authService';
import { readCookie, ereaseAllCookies } from 'utils/cookieStorage';
import LocalStorageServices from 'utils/localStorage';
import { STORAGE_COMMON_KEY, MSG } from 'consts';

export const METHOD_TYPE = {
    GET: 'get',
    POST: 'post',
    PUT: 'put',
    PATCH: 'patch',
    DELETE: 'delete',
};
const REQUEST_TIMEOUT = 15000;

const singleton = Symbol('key for first');
const singletonEnforcer = Symbol('key for assign');

const getClient = (baseURLDomain) => {
    const baseUrl = !isEmpty(baseURLDomain) ? baseURLDomain : Config.API_SERVER;
    const options = {
        baseURL: baseUrl,
        timeout: REQUEST_TIMEOUT,
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
                // to do something
            }
            if (!responseError.response) {
                toast.error(MSG.NETWORK_ERROR, {
                    position: 'top-right',
                });
                if (typeof localStorage !== 'undefined') {
                    LocalStorageServices.removeAll();
                }
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

const HttpInstance = (headerConfigs = null, baseURLDomain = null, ssrHeaders) => {
    class ApiConfig {
        constructor(enforcer) {
            if (enforcer !== singletonEnforcer) {
                throw new Error('Cannot construct singleton');
            }

            this.client = getClient(baseURLDomain);
            this.srrCookies = (!isEmpty(ssrHeaders?.cookie) && cookieParser.parse(ssrHeaders?.cookie)) || null;
            this.headerConfigs = headerConfigs;
            this.headers = null;
        }

        static get instance() {
            // Try to get an efficient singleton
            if (!this[singleton]) {
                this[singleton] = new ApiConfig(singletonEnforcer);
            }

            return this[singleton];
        }

        setJwtToken(token, type, headersConfigRequest) {
            const typeToken = type;
            let headersConfigBase = {
                'content-type': 'application/json',
                Authorization: `${typeToken} ${token}`,
            };
            if (this.headerConfigs) {
                headersConfigBase = {
                    ...headersConfigBase,
                    ...this.headerConfigs,
                    ...headersConfigRequest,
                };
            }
            this.headers = headersConfigBase;
        }

        async checkToken(headersConfigRequest) {
            if (this.headerConfigs?.notAuthorization) {
                return true;
            }
            let accessToken;
            let tokenType = '';
            if (this.srrCookies) {
                tokenType = this.srrCookies[STORAGE_COMMON_KEY.TOKEN_TYPE] || 'Bearer';
                accessToken = this.srrCookies[STORAGE_COMMON_KEY.ACCESS_TOKEN];
            } else if (typeof document !== 'undefined') {
                tokenType = readCookie(STORAGE_COMMON_KEY.TOKEN_TYPE) || 'Bearer';
                accessToken = readCookie(STORAGE_COMMON_KEY.ACCESS_TOKEN);
            }
            if (accessToken) {
                this.setJwtToken(accessToken, tokenType, headersConfigRequest);
            } else {
                const getRefreshToken = readCookie(STORAGE_COMMON_KEY.REFRESH_TOKEN);
                if (getRefreshToken) {
                    // refresh token
                } else {
                    // logout
                    toast.error(MSG.LOGIN_FAILED);
                    if (typeof localStorage !== 'undefined') {
                        authService.logout();
                    }
                }
            }
            return true;
        }

        async fetch(url, method = METHOD_TYPE.GET, params) {
            return this.client({
                method,
                url,
                data: params,
            })
                .then((response) => Promise.resolve(response))
                .catch((error) => Promise.reject(error));
        }

        async get(url, params, conf = {}) {
            await this.checkToken(conf);
            const paramsConfig = {
                params,
                headers: this.headers,
            };
            return this.client
                .get(url, paramsConfig)
                .then((response) => Promise.resolve(response))
                .catch((error) => Promise.reject(error));
        }

        async delete(url, data, conf = {}) {
            await this.checkToken(conf);
            return this.client
                .delete(url, data, this.headers)
                .then((response) => Promise.resolve(response))
                .catch((error) => Promise.reject(error));
        }

        async head(url, conf = {}) {
            await this.checkToken(conf);
            return this.client
                .head(url, this.headers)
                .then((response) => Promise.resolve(response))
                .catch((error) => Promise.reject(error));
        }

        async options(url, conf = {}) {
            await this.checkToken(conf);
            return this.client
                .options(url, this.headers)
                .then((response) => Promise.resolve(response))
                .catch((error) => Promise.reject(error));
        }

        async post(url, data = {}, conf = {}) {
            await this.checkToken(conf);
            return this.client
                .post(url, data, this.headers)
                .then((response) => Promise.resolve(response))
                .catch((error) => Promise.reject(error));
        }

        async put(url, data = {}, conf = {}) {
            await this.checkToken(conf);
            return this.client
                .put(url, data, this.headers)
                .then((response) => Promise.resolve(response))
                .catch((error) => Promise.reject(error));
        }

        async patch(url, data = {}, conf = {}) {
            await this.checkToken(conf);
            return this.client
                .patch(url, data, this.headers)
                .then((response) => Promise.resolve(response))
                .catch((error) => Promise.reject(error));
        }
    }
    return ApiConfig.instance;
};

export default HttpInstance;
