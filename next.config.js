const { nextI18NextRewrites } = require('next-i18next/rewrites');
const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');

const localeSubpaths = {};
module.exports = withPlugins([
    {
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
    },
    [
        optimizedImages,
        {
            optimizeImagesInDev: true,
            handleImages: ['jpeg', 'png', 'svg', 'webp', 'gif'],
        },
    ],
]);
