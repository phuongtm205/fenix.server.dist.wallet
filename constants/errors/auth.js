"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentUserNotFound = exports.InvalidToken = exports.TokenNotFound = void 0;
const http_status_codes_1 = require("http-status-codes");
exports.TokenNotFound = {
    code: 10,
    status: http_status_codes_1.StatusCodes.UNAUTHORIZED,
    message: 'Token is not found',
};
exports.InvalidToken = {
    code: 11,
    status: http_status_codes_1.StatusCodes.UNAUTHORIZED,
    message: 'Token is invalid',
};
exports.CurrentUserNotFound = {
    code: 12,
    status: http_status_codes_1.StatusCodes.UNAUTHORIZED,
    message: 'Current user is not found',
};
