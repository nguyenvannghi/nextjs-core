const { nextI18NextRewrites } = require('next-i18next/rewrites');

const localeSubpaths = {};

module.exports = () => {
    return {
        rewrites: async () => nextI18NextRewrites(localeSubpaths),
        publicRuntimeConfig: {
            localeSubpaths,
        },
        experimental: {
            reactRefresh: true,
        },
        env: {
            ENV: process.env.NODE_ENV,
        },
    };
};
