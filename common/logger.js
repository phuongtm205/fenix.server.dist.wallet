"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
class Logger {
    static info(info) {
        console.log(info);
    }
    static error(error) {
        console.error(error);
    }
}
exports.Logger = Logger;
