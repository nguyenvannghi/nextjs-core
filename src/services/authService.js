import jwtDecode from 'jwt-decode';
import cookieParser from 'cookie';
import isEmpty from 'lodash/isEmpty';
import isUndefined from 'lodash/isUndefined';
import { STORAGE_COMMON_KEY, USER_ROLE } from 'consts';
import { ROUTER, ROUTER_SIGN_IN } from 'consts/router';
import { createCookie, readCookie, ereaseAllCookies } from 'utils/cookieStorage';
import localStorage from 'utils/localStorage';

const setToken = (accessToken) => {
    createCookie(STORAGE_COMMON_KEY.ACCESS_TOKEN, accessToken);
};

const getToken = () => {
    return readCookie(STORAGE_COMMON_KEY.ACCESS_TOKEN);
};

const loggedIn = () => {
    const token = getToken();
    if (!token) return false;
    try {
        const date = new Date(0);
        const decoded = jwtDecode(token);
        date.setUTCSeconds(decoded.exp);
        return date.valueOf() > new Date().valueOf() && getProfile();
    } catch (err) {
        return false;
    }
};

const setProfile = (profile) => {
    localStorage.setItemJson(STORAGE_COMMON_KEY.CURRENT_USER, profile);
};

const getProfile = () => {
    const profile = localStorage.getItemJson(STORAGE_COMMON_KEY.CURRENT_USER);
    return !isEmpty(profile?.fullName) && !isUndefined(profile?.fullName) ? profile : {};
};

const getNameProfile = () => {
    const profile = localStorage.getItemJson(STORAGE_COMMON_KEY.CURRENT_USER);
    return !isEmpty(profile?.fullName) && !isUndefined(profile?.fullName)
        ? profile.fullName
        : `${profile?.firstName}  ${profile?.lastName}`;
};

const getAdminRole = () => {
    const profile = getProfile();
    return profile?.userType === USER_ROLE.ADMIN;
};

const getStudentRole = () => {
    const profile = getProfile();
    return profile?.userType === USER_ROLE.STUDENT;
};

const redirectLoggedIn = () => {
    const url = localStorage.getItem(STORAGE_COMMON_KEY.RETURN_URL) || ROUTER;
    if (typeof window.location !== 'undefined') {
        window.location.href = url;
    }
};

const logout = () => {
    ereaseAllCookies();
    localStorage.removeAll();
    if (typeof window.location !== 'undefined') {
        window.location.href = ROUTER_SIGN_IN;
    }
};

const checkAdminRole = ({ res, headers }) => {
    const srrCookies = (!isEmpty(headers?.cookie) && cookieParser.parse(headers?.cookie)) || null;
    const accessToken = srrCookies[STORAGE_COMMON_KEY.ACCESS_TOKEN];
    let allowAccess = true;
    if (accessToken) {
        allowAccess = false;
    }
    const decoded = accessToken && jwtDecode(accessToken);
    allowAccess = decoded?.userType === USER_ROLE.ADMIN;
    if (!allowAccess) {
        res.setHeader('location', '/');
        res.statusCode = 302;
        res.end();
        return null;
    }
    return true;
};

export {
    setToken,
    getToken,
    loggedIn,
    setProfile,
    getProfile,
    getNameProfile,
    getAdminRole,
    getStudentRole,
    redirectLoggedIn,
    logout,
    checkAdminRole,
};
