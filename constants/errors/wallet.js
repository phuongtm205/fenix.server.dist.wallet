"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageNotFound = void 0;
const http_status_codes_1 = require("http-status-codes");
exports.PackageNotFound = {
    code: 0,
    status: http_status_codes_1.StatusCodes.BAD_REQUEST,
    message: 'Package is not found',
};
