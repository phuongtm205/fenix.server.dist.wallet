"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
const constants_1 = require("../constants");
const common_1 = require("../common");
const configs_1 = require("../configs");
class ErrorHandler {
    static handle() {
        return (err, req, res, next) => {
            common_1.Logger.error(err);
            if (err instanceof common_1.FenixError) {
                res.status(err.status).json({
                    success: false,
                    message: err.message,
                    code: err.code,
                    status: err.status,
                    service: configs_1.Env.SERVICE_NAME,
                });
            }
            else {
                res.status(constants_1.ERROR.System.Unknown.status).json({
                    success: false,
                    message: err.message,
                });
            }
        };
    }
}
exports.ErrorHandler = ErrorHandler;
