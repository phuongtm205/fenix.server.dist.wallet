"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = exports.Service = void 0;
const common_1 = require("../common");
class Service {
    throwError(error, message, code, status) {
        throw new common_1.FenixError({
            code: code || error.code,
            status: status || error.status,
            message: message || error.message,
        });
    }
}
exports.Service = Service;
class BaseService extends Service {
    constructor() {
        super();
        this.repository = this.getRepository();
    }
    generateObjectId(id) {
        return this.repository.generateObjectId(id);
    }
    async createOne(currentUser, data) {
        return await this.repository.createOne(currentUser, data);
    }
    async updateOne(currentUser, query = {}, data) {
        return await this.repository.updateOne(currentUser, query, data);
    }
    async updateById(currentUser, data) {
        return await this.repository.updateById(currentUser, data);
    }
    async deleteOne(currentUser, query = {}) {
        return await this.repository.deleteOne(currentUser, query);
    }
    async deleteById(currentUser, id) {
        return await this.repository.deleteById(currentUser, id);
    }
    async getById(id, options = { lean: true }) {
        return await this.repository.getById(id, options);
    }
    async getOne(query = {}, options = { lean: true }) {
        return await this.repository.getOne(query, options);
    }
    async getMany(query = {}, options = { lean: true }) {
        return await this.repository.getMany(query, options);
    }
    async getAll(query = {}, options = { lean: true }) {
        return await this.repository.getAll(query, options);
    }
}
exports.BaseService = BaseService;
