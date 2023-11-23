"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRouter = void 0;
const express_1 = require("express");
class BaseRouter {
    constructor() {
        this._router = (0, express_1.Router)();
    }
    getRouter() {
        this.route(this._router);
        return this._router;
    }
}
exports.BaseRouter = BaseRouter;
