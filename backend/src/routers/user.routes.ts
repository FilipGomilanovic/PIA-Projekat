import express from 'express';
import { UserController } from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.route('/login').post(
    (req, res)=>new UserController().login(req,res)
)

userRouter.route('/loginAdmin').post(
    (req, res)=>new UserController().loginAdmin(req,res)
)

userRouter.route('/register').post(
    (req, res)=>new UserController().register(req,res)
)

userRouter.route('/getAllRequests').get(
    (req, res)=>new UserController().getAllRequests(req,res)
)

userRouter.route('/updateStatus').post(
    (req, res)=>new UserController().updateStatus(req,res)
)

userRouter.route('/upload').post(
    (req, res)=>new UserController().upload(req,res)
)

userRouter.route('/getUser').post(
    (req, res)=>new UserController().getUser(req,res)
)

userRouter.route('/getAllUsers').get(
    (req, res)=>new UserController().getAllUsers(req,res)
)


userRouter.route('/updateOrganizer').post(
    (req, res)=>new UserController().updateOrganizer(req,res)
)

userRouter.route('/updateParticipant').post(
    (req, res)=>new UserController().updateParticipant(req,res)
)

userRouter.route('/sendEmail').post(
    (req, res)=>new UserController().sendEmail(req,res)
)

userRouter.route('/notifyAll').post(
    (req, res)=>new UserController().notifyAll(req,res)
)

userRouter.route('/changePassword').post(
    (req, res)=>new UserController().changePassword(req,res)
)


export default userRouter;