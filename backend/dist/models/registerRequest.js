"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let registerRequest = new Schema({
    user: {
        type: Object
    },
    status: {
        type: String
    }
});
exports.default = mongoose_1.default.model('registerRequest', registerRequest, 'registerRequest');
//# sourceMappingURL=registerRequest.js.map