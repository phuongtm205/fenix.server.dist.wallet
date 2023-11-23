"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CannotGetGoogleProfile = exports.CannotGetGoogleToken = void 0;
const http_status_codes_1 = require("http-status-codes");
exports.CannotGetGoogleToken = {
    code: 20,
    status: http_status_codes_1.StatusCodes.UNAUTHORIZED,
    message: 'Cannot get google token',
};
exports.CannotGetGoogleProfile = {
    code: 21,
    status: http_status_codes_1.StatusCodes.UNAUTHORIZED,
    message: 'Cannot get google profile',
};
