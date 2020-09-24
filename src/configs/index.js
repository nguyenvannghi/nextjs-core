const env = process.env.ENV;

export const envNameConfig = {
    DEVELOPMENT: 'dev',
    STAGING: 'qc',
    UAT: 'uat',
    PRODUCTION: 'production',
};

const listConfigs = {
    [envNameConfig.DEVELOPMENT]: {
        API_SERVER: 'http://210.245.20.199:3001/api/',
    },
    [envNameConfig.STAGING]: {
        API_SERVER: 'http://210.245.20.199:3001/api/',
    },
    [envNameConfig.UAT]: {
        API_SERVER: 'http://210.245.20.199:3001/api/',
    },
    [envNameConfig.PRODUCTION]: {
        API_SERVER: 'http://210.245.20.199:3000/api/',
    },
};

export const Config = listConfigs[env];
export default env;
