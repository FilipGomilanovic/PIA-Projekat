import express from "express";
import { workshopController } from "../controllers/workshop.controller";

const workshopRouter = express.Router();

workshopRouter.route('/post').post(
    (req, res)=>new workshopController().post(req,res)
)

workshopRouter.route('/uploadPhoto').post(
    (req, res)=>new workshopController().uploadPhoto(req,res)
)

workshopRouter.route('/getAllWorkshops').get(
    (req, res)=>new workshopController().getAllWorkshops(req,res)
)
workshopRouter.route('/getAllWorkshopsAdmin').get(
    (req, res)=>new workshopController().getAllWorkshopsAdmin(req,res)
)


workshopRouter.route('/addComment').post(
    (req, res)=>new workshopController().addComment(req,res)
)

workshopRouter.route('/getWorkshop').post(
    (req, res)=>new workshopController().getWorkshop(req,res)
)

workshopRouter.route('/addParticipant').post(
    (req, res)=>new workshopController().addParticipant(req,res)
)

workshopRouter.route('/addParticipantToWaitingList').post(
    (req, res)=>new workshopController().addParticipantToWaitingList(req,res)
)

workshopRouter.route('/removeParticipant').post(
    (req, res)=>new workshopController().removeParticipant(req,res)
)

workshopRouter.route('/clearWaithingList').post(
    (req, res)=>new workshopController().clearWaithingList(req,res)
)

workshopRouter.route('/setFinished').post(
    (req, res)=>new workshopController().setFinished(req,res)
)

workshopRouter.route('/getAllComments').post(
    (req, res)=>new workshopController().getAllComments(req,res)
)

workshopRouter.route('/deleteComment').post(
    (req, res)=>new workshopController().deleteComment(req,res)
)

workshopRouter.route('/updateLikes').post(
    (req, res)=>new workshopController().updateLikes(req,res)
)

workshopRouter.route('/updateWorkshop').post(
    (req, res)=>new workshopController().updateWorkshop(req,res)
)

workshopRouter.route('/updateStatus').post(
    (req, res)=>new workshopController().updateStatus(req,res)
)

















export default workshopRouter;