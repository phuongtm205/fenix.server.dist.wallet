"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountNotFound = exports.CannotCreateAccountOnRenecNetwork = exports.AccountCreated = exports.GameNotFound = exports.GameEmpty = void 0;
const http_status_codes_1 = require("http-status-codes");
exports.GameEmpty = {
    code: 10,
    status: http_status_codes_1.StatusCodes.BAD_REQUEST,
    message: 'Game is empty',
};
exports.GameNotFound = {
    code: 11,
    status: http_status_codes_1.StatusCodes.NOT_FOUND,
    message: 'Game is not found',
};
exports.AccountCreated = {
    code: 12,
    status: http_status_codes_1.StatusCodes.CREATED,
    message: 'Account is created',
};
exports.CannotCreateAccountOnRenecNetwork = {
    code: 13,
    status: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
    message: 'Cannot create account on renec network',
};
exports.AccountNotFound = {
    code: 13,
    status: http_status_codes_1.StatusCodes.NOT_FOUND,
    message: 'Account is not found',
};
