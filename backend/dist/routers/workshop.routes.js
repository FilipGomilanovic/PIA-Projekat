"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const workshop_controller_1 = require("../controllers/workshop.controller");
const workshopRouter = express_1.default.Router();
workshopRouter.route('/post').post((req, res) => new workshop_controller_1.workshopController().post(req, res));
workshopRouter.route('/uploadPhoto').post((req, res) => new workshop_controller_1.workshopController().uploadPhoto(req, res));
workshopRouter.route('/getAllWorkshops').get((req, res) => new workshop_controller_1.workshopController().getAllWorkshops(req, res));
workshopRouter.route('/getAllWorkshopsAdmin').get((req, res) => new workshop_controller_1.workshopController().getAllWorkshopsAdmin(req, res));
workshopRouter.route('/addComment').post((req, res) => new workshop_controller_1.workshopController().addComment(req, res));
workshopRouter.route('/getWorkshop').post((req, res) => new workshop_controller_1.workshopController().getWorkshop(req, res));
workshopRouter.route('/addParticipant').post((req, res) => new workshop_controller_1.workshopController().addParticipant(req, res));
workshopRouter.route('/addParticipantToWaitingList').post((req, res) => new workshop_controller_1.workshopController().addParticipantToWaitingList(req, res));
workshopRouter.route('/removeParticipant').post((req, res) => new workshop_controller_1.workshopController().removeParticipant(req, res));
workshopRouter.route('/clearWaithingList').post((req, res) => new workshop_controller_1.workshopController().clearWaithingList(req, res));
workshopRouter.route('/setFinished').post((req, res) => new workshop_controller_1.workshopController().setFinished(req, res));
workshopRouter.route('/getAllComments').post((req, res) => new workshop_controller_1.workshopController().getAllComments(req, res));
workshopRouter.route('/deleteComment').post((req, res) => new workshop_controller_1.workshopController().deleteComment(req, res));
workshopRouter.route('/updateLikes').post((req, res) => new workshop_controller_1.workshopController().updateLikes(req, res));
workshopRouter.route('/updateWorkshop').post((req, res) => new workshop_controller_1.workshopController().updateWorkshop(req, res));
workshopRouter.route('/updateStatus').post((req, res) => new workshop_controller_1.workshopController().updateStatus(req, res));
exports.default = workshopRouter;
//# sourceMappingURL=workshop.routes.js.map