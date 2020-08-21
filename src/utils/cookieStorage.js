import Cookies from 'js-cookie';
import { AUTH_USER } from 'consts';

export const createCookie = (name, value, days = 1) => {
    return Cookies.set(name, value, { expires: days });
};

export const readCookie = (name) => {
    return Cookies.get(name);
};

export const eraseCookie = (name) => {
    return Cookies.remove(name);
};

export const ereaseAllCookies = () => {
    Object.values(AUTH_USER).forEach((item) => {
        eraseCookie(item);
    });
};
