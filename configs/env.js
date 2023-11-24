"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Env = void 0;
exports.Env = {
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || 'DEV',
    SERVICE_NAME: process.env.SERVICE_NAME || 'wallet',
    SERVER_API_KEY: process.env.SERVER_API_KEY || 'XNHjIpukH6JL72X0bdaQ4j7bI7FaoqZxpZePf5cL1k7y6qcase',
    DB_URI: process.env.DB_URI || 'mongodb://localhost:27017/wallet',
    REDIS_HOST: process.env.REDIS_HOST || 'redis-16193.c295.ap-southeast-1-1.ec2.cloud.redislabs.com',
    REDIS_PORT: Number(process.env.REDIS_PORT || '0') || 16193,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD || 'vl3dy7j79xVtvBgGMgkXvibpMNeeZrJp',
    RENEC_CONNECTION: process.env.RENEC_CONNECTION || 'https://api-mainnet-beta.renec.foundation:8899',
    FENIX_SECRET_KEY: process.env.FENIX_SECRET_KEY || '',
    ENCRYPTION_KEY: process.env.ENCRYPTION_KEY || '',
    ENCRYPTION_IV: process.env.ENCRYPTION_IV || '',
    MIN_RENEC_BALANCE: process.env.MIN_RENEC_BALANCE || '0.005',
    MIN_PPL_BALANCE: process.env.MIN_PPL_BALANCE || '0',
    STATISTIC_HOST: process.env.STATISTIC_HOST || 'http://localhost:3030',
};
