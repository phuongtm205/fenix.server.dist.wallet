"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RewardNotFound = exports.BetRefunded = exports.InvalidBody = exports.TokenNotFound = exports.OutOfStock = exports.PackageNotFound = void 0;
const http_status_codes_1 = require("http-status-codes");
exports.PackageNotFound = {
    code: 300,
    status: http_status_codes_1.StatusCodes.BAD_REQUEST,
    message: 'Package is not found',
};
exports.OutOfStock = {
    code: 301,
    status: http_status_codes_1.StatusCodes.LOCKED,
    message: 'Out of stock',
};
exports.TokenNotFound = {
    code: 302,
    status: http_status_codes_1.StatusCodes.NOT_FOUND,
    message: 'Token is not found',
};
exports.InvalidBody = {
    code: 303,
    status: http_status_codes_1.StatusCodes.BAD_REQUEST,
    message: 'Invalid body',
};
exports.BetRefunded = {
    code: 304,
    status: http_status_codes_1.StatusCodes.BAD_REQUEST,
    message: 'Bet refunded',
};
exports.RewardNotFound = {
    code: 305,
    status: http_status_codes_1.StatusCodes.BAD_REQUEST,
    message: 'Rewards not found',
};
