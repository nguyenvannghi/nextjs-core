const NextI18Next = require('next-i18next').default;
const { localeSubpaths } = require('next/config').default().publicRuntimeConfig;
const path = require('path');

module.exports = new NextI18Next({
    browserLanguageDetection: true,
    serverLanguageDetection: true,
    otherLanguages: ['en'],
    localeSubpaths,
    localePath: path.resolve('./public/static/locales'),
    defaultLanguage: 'vi',
    preload: ['vi', 'en'],
    keySeparator: false,
    detection: {
        lookupCookie: 'language',
        order: ['cookie', 'querystring', 'localStorage', 'path', 'subdomain'],
        caches: ['cookie'],
    },
});
