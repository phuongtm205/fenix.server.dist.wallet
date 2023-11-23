"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unknown = void 0;
const http_status_codes_1 = require("http-status-codes");
exports.Unknown = {
    code: 0,
    status: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
    message: 'Unknown',
};
