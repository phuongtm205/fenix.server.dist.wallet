"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
const common_1 = require("../common");
class BaseController {
    throwError(error) {
        throw new common_1.FenixError(error);
    }
}
exports.BaseController = BaseController;
