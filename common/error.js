"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FenixError = exports.IFenixError = void 0;
const constants_1 = require("../constants");
class IFenixError {
}
exports.IFenixError = IFenixError;
class FenixError extends Error {
    constructor(error = constants_1.ERROR.System.Unknown) {
        super(error.message || constants_1.ERROR.System.Unknown.message);
        this.code = error.code || constants_1.ERROR.System.Unknown.code;
        this.status = error.status || constants_1.ERROR.System.Unknown.status;
    }
}
exports.FenixError = FenixError;
