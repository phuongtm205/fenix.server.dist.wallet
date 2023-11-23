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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
class BaseModel {
    constructor() {
        this.modelName = this.getModelName();
        this.schema = this.getSchema();
        this.initialize();
    }
    initialize() {
        const commonFields = {
            createdBy: {
                type: mongoose_1.Types.ObjectId,
                required: true,
            },
            updatedBy: {
                type: mongoose_1.Types.ObjectId,
                required: true,
            },
            isActive: {
                type: Boolean,
                required: true,
                default: true,
            },
            isDeleted: {
                type: Boolean,
                required: true,
                default: false,
            },
        };
        const model = Object.assign(this.schema, commonFields);
        const schema = new mongoose_1.Schema(model, {
            collection: this.modelName,
            timestamps: true,
            collation: { locale: 'vi' },
        });
        mongoose_1.default.model(this.modelName, schema);
    }
}
exports.BaseModel = BaseModel;
