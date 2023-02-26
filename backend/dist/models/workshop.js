"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Workshop = new Schema({
    organizer: {
        type: String
    },
    title: {
        type: String
    },
    date: {
        type: String
    },
    shortDescription: {
        type: String
    },
    description: {
        type: String
    },
    numberOfLikes: {
        type: Number
    },
    likes: {
        type: (Array)
    },
    comments: {
        type: (Array)
    },
    images: {
        type: (Array)
    },
    capacity: {
        type: Number
    },
    participants: {
        type: (Array)
    },
    waitingList: {
        type: (Array)
    },
    finished: {
        type: Boolean
    },
    latitude: {
        type: String
    },
    longitude: {
        type: String
    },
    street: {
        type: String
    },
    city: {
        type: String
    },
    country: {
        type: String
    },
    status: {
        type: String
    }
});
exports.default = mongoose_1.default.model('Workshop', Workshop, 'workshops');
//# sourceMappingURL=workshop.js.map