"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatisticService = void 0;
const base_1 = require("../../base");
const configs_1 = require("../../configs");
const constants_1 = require("../../constants");
const helpers_1 = require("../../helpers");
class StatisticService extends base_1.Service {
    async getTransactionById(currentUser, transId) {
        const res = await helpers_1.HttpHelper.get({
            url: `${configs_1.Env.STATISTIC_HOST}/transactions/${transId}`,
            currentUser,
        });
        if (res.success)
            return res.data;
        this.throwError(res);
    }
    async startBuyPromotionPackage(currentUser, promotionPackage, body) {
        const res = await helpers_1.HttpHelper.post({
            url: `${configs_1.Env.STATISTIC_HOST}/transactions`,
            currentUser,
            data: {
                type: constants_1.TRANSACTION_TYPE.BuyPromotionPackage,
                promotionPackage,
                body,
            },
        });
        if (res.success)
            return res.data.id;
        this.throwError(res);
    }
    async startClaimDailyReward(currentUser, dailyBonus, body) {
        const res = await helpers_1.HttpHelper.post({
            url: `${configs_1.Env.STATISTIC_HOST}/transactions`,
            currentUser,
            data: {
                type: constants_1.TRANSACTION_TYPE.ClaimDailyReward,
                dailyBonus,
                body,
            },
        });
        if (res.success)
            return res.data.id;
        this.throwError(res);
    }
    async startClaimReferralReward(currentUser, referralReward, body) {
        const res = await helpers_1.HttpHelper.post({
            url: `${configs_1.Env.STATISTIC_HOST}/transactions`,
            currentUser,
            data: {
                type: constants_1.TRANSACTION_TYPE.ClaimReferralReward,
                referralReward,
                body,
            },
        });
        if (res.success)
            return res.data.id;
        this.throwError(res);
    }
    async startWithdraw(currentUser, withdrawTo, body) {
        const res = await helpers_1.HttpHelper.post({
            url: `${configs_1.Env.STATISTIC_HOST}/transactions`,
            currentUser,
            data: {
                type: constants_1.TRANSACTION_TYPE.Withdraw,
                withdrawTo,
                body,
            },
        });
        if (res.success)
            return res.data.id;
        this.throwError(res);
    }
    async startBet(currentUser, body) {
        const res = await helpers_1.HttpHelper.post({
            url: `${configs_1.Env.STATISTIC_HOST}/transactions`,
            currentUser,
            data: {
                type: constants_1.TRANSACTION_TYPE.Bet,
                body,
            },
        });
        if (res.success)
            return res.data.id;
        this.throwError(res);
    }
    async startRefundBet(currentUser, body) {
        const res = await helpers_1.HttpHelper.post({
            url: `${configs_1.Env.STATISTIC_HOST}/transactions`,
            currentUser,
            data: {
                type: constants_1.TRANSACTION_TYPE.RefundBet,
                body,
            },
        });
        if (res.success)
            return res.data.id;
        this.throwError(res);
    }
    async startSplitReward(currentUser, body) {
        const res = await helpers_1.HttpHelper.post({
            url: `${configs_1.Env.STATISTIC_HOST}/transactions`,
            currentUser,
            data: {
                type: constants_1.TRANSACTION_TYPE.SplitReward,
                body,
            },
        });
        if (res.success)
            return res.data.id;
        this.throwError(res);
    }
    async startReceivePoolReward(currentUser, body) {
        const res = await helpers_1.HttpHelper.post({
            url: `${configs_1.Env.STATISTIC_HOST}/transactions`,
            currentUser,
            data: {
                type: constants_1.TRANSACTION_TYPE.ReceivePoolReward,
                body,
            },
        });
        if (res.success)
            return res.data.id;
        this.throwError(res);
    }
    async startShareFacebook(currentUser, body) {
        const res = await helpers_1.HttpHelper.post({
            url: `${configs_1.Env.STATISTIC_HOST}/transactions`,
            currentUser,
            data: {
                type: constants_1.TRANSACTION_TYPE.ShareFacebook,
                body,
            },
        });
        if (res.success)
            return res.data.id;
        this.throwError(res);
    }
    async startRefer(currentUser, body) {
        const res = await helpers_1.HttpHelper.post({
            url: `${configs_1.Env.STATISTIC_HOST}/transactions`,
            currentUser,
            data: {
                type: constants_1.TRANSACTION_TYPE.Refer,
                body,
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
    async countNumOfBoughtPackages(currentUser, packageId, promotionId, campaignId) {
        const res = await helpers_1.HttpHelper.get({
            url: `${configs_1.Env.STATISTIC_HOST}/transactions/packages/count?packageId=${packageId}&promotionId=${promotionId}&campaignId=${campaignId}`,
            currentUser,
        });
        if (res.success)
            return res.data.size;
        return 0;
    }
}
exports.StatisticService = StatisticService;
exports.default = new StatisticService();
