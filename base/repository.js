"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
const lodash_1 = __importDefault(require("lodash"));
const mongoose_1 = __importStar(require("mongoose"));
class BaseRepository {
    constructor() {
        const modelName = this.getModelName();
        this.model = mongoose_1.default.model(modelName);
    }
    normalizeQuery(query) {
        query.isDeleted = false;
        return query;
    }
    generateObjectId(id) {
        return new mongoose_1.Types.ObjectId(id);
    }
    async createOne(currentUser, data) {
        data.createdBy = lodash_1.default.get(currentUser, 'id');
        data.updatedBy = lodash_1.default.get(currentUser, 'id');
        return await this.model.create(data);
    }
    async updateOne(currentUser, query = {}, data) {
        data.updatedBy = lodash_1.default.get(currentUser, 'id');
        return await this.model.findOneAndUpdate(this.normalizeQuery(query), data, { lean: true, returnDocument: 'before' });
    }
    async updateById(currentUser, data) {
        const query = { _id: data._id || data.id };
        return await this.updateOne(currentUser, query, data);
    }
    async deleteOne(currentUser, query = {}) {
        const data = { isDeleted: true };
        return await this.updateOne(currentUser, query, data);
    }
    async deleteById(currentUser, id) {
        const query = { _id: id };
        return await this.deleteOne(currentUser, query);
    }
    async getById(id, options = { lean: true }) {
        const query = { _id: id };
        return await this.getOne(query, options);
    }
    async getOne(query = {}, options = { lean: true }) {
        return await this.model
            .findOne(this.normalizeQuery(query))
            .sort(options.sort)
            .populate(options.populate)
            .select(options.select || '')
            .lean(options.lean || true);
    }
    async getMany(query = {}, options = { lean: true }) {
        const limit = Math.min(options.limit || 0, 100);
        const page = Math.max(options.page || 1, 1);
        const skip = (page - 1) * limit;
        return await this.model
            .find(this.normalizeQuery(query))
            .sort(options.sort)
            .populate(options.populate)
            .skip(skip)
            .limit(limit)
            .select(options.select || '')
            .lean(options.lean || true);
    }
    async getAll(query = {}, options = { lean: true }) {
        return await this.model
            .find(this.normalizeQuery(query))
            .sort(options.sort)
            .populate(options.populate)
            .select(options.select || '')
            .lean(options.lean || true);
    }
}
exports.BaseRepository = BaseRepository;
