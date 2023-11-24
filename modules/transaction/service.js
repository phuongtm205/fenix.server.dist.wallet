"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatisticService = void 0;
const base_1 = require("../../base");
const configs_1 = require("../../configs");
const constants_1 = require("../../constants");
const helpers_1 = require("../../helpers");
class StatisticService extends base_1.Service {
    async startBuy(currentUser, itemId) {
        const res = await helpers_1.HttpHelper.post({
            url: `${configs_1.Env.STATISTIC_HOST}/transactions`,
            currentUser,
            data: {
                type: constants_1.TRANSACTION_TYPE.Buy,
                itemId,
            },
        });
        if (res.success)
            return res.data.id;
        this.throwError(res);
    }
    async startClaim(currentUser, dailyBonus) {
        const res = await helpers_1.HttpHelper.post({
            url: `${configs_1.Env.STATISTIC_HOST}/transactions`,
            currentUser,
            data: {
                type: constants_1.TRANSACTION_TYPE.Claim,
                dailyBonus,
            },
        });
        if (res.success)
            return res.data.id;
        this.throwError(res);
    }
    async startWithdraw(currentUser, withdrawTo) {
        const res = await helpers_1.HttpHelper.post({
            url: `${configs_1.Env.STATISTIC_HOST}/transactions`,
            currentUser,
            data: {
                type: constants_1.TRANSACTION_TYPE.Withdraw,
                withdrawTo,
            },
        });
        if (res.success)
            return res.data.id;
        this.throwError(res);
    }
    async updateSuccess(currentUser, transId, tokens) {
        const res = await helpers_1.HttpHelper.put({
            url: `${configs_1.Env.STATISTIC_HOST}/transactions/${transId}/success`,
            currentUser,
            data: { tokens },
        });
        if (res.success)
            return res.data.id;
        this.throwError(res);
    }
    async updateFailed(currentUser, transId, errorMessage) {
        const res = await helpers_1.HttpHelper.put({
            url: `${configs_1.Env.STATISTIC_HOST}/transactions/${transId}/failed`,
            currentUser,
            data: { errorMessage },
        });
        if (res.success)
            return res.data.id;
        this.throwError(res);
    }
    async countBoughtItem(currentUser, itemId) {
        const res = await helpers_1.HttpHelper.get({
            url: `${configs_1.Env.STATISTIC_HOST}/transactions/count/${itemId}`,
            currentUser,
        });
        if (res.success)
            return res.data.size;
        return 0;
    }
}
exports.StatisticService = StatisticService;
exports.default = new StatisticService();