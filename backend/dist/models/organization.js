"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Ogranizaton = new Schema({
    organization_name: {
        type: String
    },
    organization_id: {
        type: String
    },
    country: {
        type: String
    },
    city: {
        type: String
    },
    postal_code: {
        type: Number
    },
    street_name: {
        type: String
    }
});
exports.default = mongoose_1.default.model('Ogranizaton', Ogranizaton, 'organizations');
//# sourceMappingURL=organization.js.map