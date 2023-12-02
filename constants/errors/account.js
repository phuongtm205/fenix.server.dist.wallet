"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsufficientMinimumPpl = exports.InsufficientMinimumRenec = exports.InsufficientBalance = exports.AccountNotFound = exports.CannotCreateAccountOnRenecNetwork = exports.AccountCreated = exports.GameNotFound = exports.GameEmpty = void 0;
const http_status_codes_1 = require("http-status-codes");
exports.GameEmpty = {
    code: 100,
    status: http_status_codes_1.StatusCodes.BAD_REQUEST,
    message: 'Game is empty',
};
exports.GameNotFound = {
    code: 101,
    status: http_status_codes_1.StatusCodes.NOT_FOUND,
    message: 'Game is not found',
};
exports.AccountCreated = {
    code: 102,
    status: http_status_codes_1.StatusCodes.CREATED,
    message: 'Account is created',
};
exports.CannotCreateAccountOnRenecNetwork = {
    code: 103,
    status: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
    message: 'Cannot create account on renec network',
};
exports.AccountNotFound = {
    code: 104,
    status: http_status_codes_1.StatusCodes.NOT_FOUND,
    message: 'Account is not found',
};
exports.InsufficientBalance = {
    code: 105,
    status: http_status_codes_1.StatusCodes.BAD_REQUEST,
    message: 'Balance is insufficient',
};
exports.InsufficientMinimumRenec = {
    code: 106,
    status: http_status_codes_1.StatusCodes.BAD_REQUEST,
    message: 'The amount to withdraw must be greater than or equals to ',
};
exports.InsufficientMinimumPpl = {
    code: 107,
    status: http_status_codes_1.StatusCodes.BAD_REQUEST,
    message: 'The amount to withdraw must be greater than or equals to ',
};
