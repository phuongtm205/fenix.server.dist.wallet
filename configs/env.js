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
    DAILY_BONUS_SECRET_KEY: process.env.DAILY_BONUS_SECRET_KEY || '',
    SHOP_SECRET_KEY: process.env.SHOP_SECRET_KEY || '',
    FENIX_SECRET_KEY: process.env.FENIX_SECRET_KEY || '',
    FENIX_PUBLIC_KEY: process.env.FENIX_PUBLIC_KEY || '',
    ENCRYPTION_KEY: process.env.ENCRYPTION_KEY || '',
    ENCRYPTION_IV: process.env.ENCRYPTION_IV || '',
    MIN_RENEC_BALANCE: Number.parseFloat(process.env.MIN_RENEC_BALANCE || '0.001'),
    MIN_PPL_BALANCE: Number.parseFloat(process.env.MIN_PPL_BALANCE || '0'),
    MIN_RENEC_WITHDRAW: Number.parseFloat(process.env.MIN_RENEC_WITHDRAW || '0.01'),
    MIN_PPL_WITHDRAW: Number.parseFloat(process.env.MIN_PPL_WITHDRAW || '1'),
    STATISTIC_HOST: process.env.STATISTIC_HOST || 'http://localhost:3030',
    JWT_KEY: process.env.JWT_KEY || 'WLhOBtRW47vhtzNdr5j1qIavrr8HeWAw4V0NQlVqVdnku9gRtB',
};
