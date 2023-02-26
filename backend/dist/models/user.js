"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let User = new Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    phone: {
        type: String
    },
    type: {
        type: String
    },
    email: {
        type: String
    },
    image: {
        type: String
    },
    status: {
        type: String
    },
    organization: {
        type: Object
    },
    verification_number: {
        type: Number
    },
    change_password_request_time: {
        type: Date
    },
    attended_workshops: {
        type: (Array)
    },
});
exports.default = mongoose_1.default.model('User', User, 'users');
//# sourceMappingURL=user.js.map