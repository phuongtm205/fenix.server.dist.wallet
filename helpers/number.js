"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberHelper = void 0;
class NumberHelper {
    static floor(n, decimals = 9) {
        decimals = decimals < 0 || decimals > 9 ? 9 : decimals;
        return Math.floor(n * (10 ** decimals)) / (10 ** decimals);
    }
}
exports.NumberHelper = NumberHelper;
