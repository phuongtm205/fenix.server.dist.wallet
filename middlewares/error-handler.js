"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
const constants_1 = require("../constants");
const common_1 = require("../common");
class ErrorHandler {
    static handle() {
        return (err, req, res, next) => {
            common_1.Logger.error(err.message);
            if (err instanceof common_1.FenixError) {
                res.status(err.status).json({
                    success: false,
                    message: err.message,
                    code: err.code,
                    status: err.status,
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
