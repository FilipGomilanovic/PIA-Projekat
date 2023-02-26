"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const userRouter = express_1.default.Router();
userRouter.route('/login').post((req, res) => new user_controller_1.UserController().login(req, res));
userRouter.route('/loginAdmin').post((req, res) => new user_controller_1.UserController().loginAdmin(req, res));
userRouter.route('/register').post((req, res) => new user_controller_1.UserController().register(req, res));
userRouter.route('/getAllRequests').get((req, res) => new user_controller_1.UserController().getAllRequests(req, res));
userRouter.route('/updateStatus').post((req, res) => new user_controller_1.UserController().updateStatus(req, res));
userRouter.route('/upload').post((req, res) => new user_controller_1.UserController().upload(req, res));
userRouter.route('/getUser').post((req, res) => new user_controller_1.UserController().getUser(req, res));
userRouter.route('/getAllUsers').get((req, res) => new user_controller_1.UserController().getAllUsers(req, res));
userRouter.route('/updateOrganizer').post((req, res) => new user_controller_1.UserController().updateOrganizer(req, res));
userRouter.route('/updateParticipant').post((req, res) => new user_controller_1.UserController().updateParticipant(req, res));
userRouter.route('/sendEmail').post((req, res) => new user_controller_1.UserController().sendEmail(req, res));
userRouter.route('/notifyAll').post((req, res) => new user_controller_1.UserController().notifyAll(req, res));
userRouter.route('/changePassword').post((req, res) => new user_controller_1.UserController().changePassword(req, res));
exports.default = userRouter;
//# sourceMappingURL=user.routes.js.map