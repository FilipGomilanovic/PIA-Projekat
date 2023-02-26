"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const organization_1 = __importDefault(require("../models/organization"));
const user_1 = __importDefault(require("../models/user"));
const comment_1 = __importDefault(require("../models/comment"));
const workshop_1 = __importDefault(require("../models/workshop"));
const nodemailer = require("nodemailer");
const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'backend\src\Images');
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });
//Ovo mi ne radi kako treba zbog fakepath
class UserController {
    constructor() {
        this.loginAdmin = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            let type = "administrator";
            user_1.default.findOne({ 'username': username, 'password': password, 'type': type }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.upload = (req, res) => {
            console.log("testUpload");
            // let obj = req.body
            // console.log(obj)
            upload.single('file');
            res.json({ "message": "ok" });
        };
        this.login = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            let type = req.body.type;
            user_1.default.findOne({ 'username': username, 'password': password, 'type': type, 'status': 'active' }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.register = (req, res) => {
            let user = null;
            if (req.body.type == "participant") {
                user = new user_1.default({
                    first_name: req.body.firstname,
                    last_name: req.body.lastname,
                    username: req.body.username,
                    password: req.body.password,
                    phone: req.body.phone,
                    email: req.body.email,
                    type: req.body.type,
                    image: req.body.image,
                    status: "new request",
                    organization: null,
                });
            }
            else {
                user = new user_1.default({
                    first_name: req.body.firstname,
                    last_name: req.body.lastname,
                    username: req.body.username,
                    password: req.body.password,
                    phone: req.body.phone,
                    email: req.body.email,
                    type: req.body.type,
                    image: req.body.image,
                    status: "new request",
                    organization: new organization_1.default({
                        organization_name: req.body.o_name,
                        organization_id: req.body.o_id,
                        country: req.body.country,
                        city: req.body.city,
                        postal_code: req.body.zip,
                        street_name: req.body.street
                    })
                });
            }
            user.save((err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "message": "error" });
                }
                else
                    res.json({ "message": "ok" });
            });
        };
        this.getAllRequests = (req, res) => {
            user_1.default.find({ status: "new request" }, (err, users) => {
                if (err)
                    console.log(err);
                else
                    res.json(users);
            });
        };
        this.getAllUsers = (req, res) => {
            user_1.default.find({}, (err, users) => {
                if (err)
                    console.log(err);
                else
                    res.json(users);
            });
        };
        this.getUser = (req, res) => {
            user_1.default.findOne({ 'username': req.body.username }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.updateStatus = (req, res) => {
            let username = req.body.username;
            let status = req.body.status;
            user_1.default.findOneAndUpdate({ 'username': username }, { $set: { 'status': status } }, (err, success) => {
                if (err)
                    console.log(err);
                else
                    res.json({ msg: "Success" });
            });
        };
        this.updateOrganizer = (req, res) => {
            user_1.default.findByIdAndUpdate({ '_id': req.body._id, }, { $set: { 'first_name': req.body.firstname,
                    'last_name': req.body.lastname,
                    'username': req.body.username,
                    'password': req.body.password,
                    'email': req.body.email,
                    'phone': req.body.phone,
                    'image': req.body.image,
                    'organization.organization_name': req.body.o_name,
                    'organization.organization_id': req.body.o_id,
                    'organization.street_name': req.body.street,
                    'organization.city': req.body.city,
                    'organization.postal_code': req.body.zip,
                    'organization.country': req.body.country,
                } }, (err, success) => {
                if (err)
                    console.log(err);
                else
                    res.json({ msg: "Success" });
            });
        };
        this.updateParticipant = (req, res) => {
            comment_1.default.collection.updateMany({ 'user._id': req.body._id }, { $set: { 'user.first_name': req.body.firstname,
                    'user.last_name': req.body.lastname,
                    'user.username': req.body.username,
                    'user.password': req.body.password,
                    'user.email': req.body.email,
                    'user.phone': req.body.phone,
                    'user.image': req.body.image, } });
            workshop_1.default.collection.updateMany({ "comments.user._id": req.body._id }, { $set: { "comments.$[comment].user.first_name": req.body.firstname,
                    "comments.$[comment].user.last_name": req.body.lastname,
                    "comments.$[comment].user.username": req.body.username,
                    "comments.$[comment].user.password": req.body.password,
                    "comments.$[comment].user.email": req.body.email,
                    "comments.$[comment].user.phone": req.body.phone,
                    "comments.$[comment].user.image": req.body.image,
                } }, { arrayFilters: [{ "comment.user._id": req.body._id }] });
            console.log(req.body.oldUsername);
            workshop_1.default.collection.updateMany({ participants: req.body.oldUsername }, { $set: { 'participants.$': req.body.username } });
            workshop_1.default.collection.updateMany({ likes: req.body.oldUsername }, { $set: { 'likes.$': req.body.username } });
            workshop_1.default.collection.updateMany({ waitingList: req.body.oldUsername }, { $set: { 'waitingList.$': req.body.username } });
            user_1.default.findByIdAndUpdate({ '_id': req.body._id, }, { $set: { 'first_name': req.body.firstname,
                    'last_name': req.body.lastname,
                    'username': req.body.username,
                    'password': req.body.password,
                    'email': req.body.email,
                    'phone': req.body.phone,
                    'image': req.body.image,
                } }, (err, success) => {
                if (err)
                    console.log(err);
                else
                    res.json({ msg: "Success" });
            });
        };
        this.changePassword = (req, res) => {
            user_1.default.findOneAndUpdate({ 'username': req.body.username }, { $set: { 'password': req.body.password } }, (err, success) => {
                if (err)
                    console.log(err);
                else
                    res.json({ msg: "Success" });
            });
        };
        this.sendEmail = (req, res) => {
            let email = req.body.email;
            const transporter = nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                auth: {
                    user: 'joana.senger35@ethereal.email',
                    pass: 'TNTcRStKZquM6C6A6X'
                }
            });
            let verificationNumber = Math.floor(Math.random() * 1000000) + 100000;
            user_1.default.findOneAndUpdate({ 'email': req.body.email }, { $set: { 'change_password_request_time': new Date(),
                    'verification_number': verificationNumber
                } }, (err, success) => {
            });
            const msg = {
                from: '"The Workshop App" <theExpressApp@example.com>',
                to: `${email}`,
                subject: "Password change",
                text: "If you did not initiate the request for a password change, kindly disregard this email.",
                html: "Change your password: <a href='http://localhost:4200/change-password'>here.</a><br>Your verification code is: " + verificationNumber
            };
            transporter.sendMail(msg).then(o => {
                res.json({ msg: "Success" });
            });
        };
        this.notifyAll = (req, res) => {
            let emails = req.body.emails;
            let workshopName = req.body.workshopName;
            const transporter = nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                auth: {
                    user: 'joana.senger35@ethereal.email',
                    pass: 'TNTcRStKZquM6C6A6X'
                }
            });
            const msg = {
                from: '"The Workshop App" <theExpressApp@example.com>',
                to: `${emails}`,
                subject: workshopName + " - Available places",
                text: "You can join now.",
                html: "There are available places in the " + workshopName + " workshop, and you can join now!"
            };
            transporter.sendMail(msg).then(o => {
                res.json({ msg: "Success" });
            });
        };
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map