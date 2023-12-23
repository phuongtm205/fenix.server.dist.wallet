"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsufficientMinimumPpl = exports.InsufficientMinimumRenec = exports.InsufficientPplBalance = exports.InsufficientRenecBalance = exports.InsufficientBalance = exports.AccountNotFound = exports.CannotCreateAccountOnRenecNetwork = exports.AccountCreated = exports.GameNotFound = exports.GameEmpty = void 0;
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
exports.InsufficientRenecBalance = {
    code: 106,
    status: http_status_codes_1.StatusCodes.BAD_REQUEST,
    message: 'Your RENEC balance is insufficient. The amount you are withdrawing is <b>{withdrawingAmount}</b> RENEC but the maximum amount that can be withdrawn is <b>{maximumAmount}</b> RENEC.',
};
exports.InsufficientPplBalance = {
    code: 107,
    status: http_status_codes_1.StatusCodes.BAD_REQUEST,
    message: 'Your PPL balance is insufficient. The amount you are withdrawing is <b>{withdrawingAmount}</b> PPL but the maximum amount that can be withdrawn is <b>{maximumAmount}</b> PPL.',
};
exports.InsufficientMinimumRenec = {
    code: 108,
    status: http_status_codes_1.StatusCodes.BAD_REQUEST,
    message: 'The withdrawal amount must be greater than or equals to {amount} RENEC.',
};
exports.InsufficientMinimumPpl = {
    code: 109,
    status: http_status_codes_1.StatusCodes.BAD_REQUEST,
    message: 'The withdrawal amount must be greater than or equals to {amount} PPL.',
};
