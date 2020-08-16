import axios from 'axios';
import { Config } from 'configs';
import { readCookie } from 'utils/cookieStorage';
import { AUTH_USER } from 'consts';

const REQUEST_TIMEOUT = 15000;

/**
 * Create a new Axios client instance
 */

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
            if (!responseError.response) {
                // redirect login
            }
            const { response } = responseError;
            if (response && response.status === 401 && response?.config?.url !== 'auth/login') {
                // redirect login
            }
            return response;
        },
    );

    return client;
};

class HttpClient {
    constructor(headers = null, baseURLDomain = null) {
        this.client = getClient(headers, baseURLDomain);
    }

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

export default HttpClient;
