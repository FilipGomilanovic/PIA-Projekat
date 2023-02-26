"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.workshopController = void 0;
const user_1 = __importDefault(require("../models/user"));
const workshop_1 = __importDefault(require("../models/workshop"));
const comment_1 = __importDefault(require("../models/comment"));
const mongodb_1 = require("mongodb");
let imagePath = null;
const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../Images/workshop');
        // backend\src\Images\workshop
    },
    filename: (req, file, cb) => {
        console.log("usao u multer");
        imagePath = Date.now() + path.extname(file.originalname);
        // imagePaths.push(image)
        cb(null, imagePath);
    }
});
const upload = multer({ storage: storage });
// uploadPhotos = (upload.array('files'), (req: express.Request, res: express.Response) => {
//    res.json({"message": imagePath})
// })
//Ovo mi ne radi kako treba zbog fakepath
class workshopController {
    constructor() {
        // upload = (req: express.Request, res: express.Response)=>{
        //     console.log("testUpload")
        //     // let obj = req.body
        //     // console.log(obj)
        //     // upload.single('file')
        //     res.json({"message": "ok"})
        // }
        this.uploadPhotos = (upload.array('files'), (req, res) => {
            let organizer = req.body['organizer'];
            console.log(organizer);
            res.json({ "MESSAGE": "OK" });
        });
        this.uploadPhoto = (upload.single('file'), (req, res) => {
            upload.single('file');
            console.log(imagePath);
            console.log("okiii");
            console.log("posle");
            res.json({ "message": "ok" });
        });
        this.addParticipant = (req, res) => {
            workshop_1.default.findByIdAndUpdate({ '_id': req.body._id }, { $push: { 'participants': req.body.user } }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ 'message': 'ok' });
                }
            });
        };
        this.removeParticipant = (req, res) => {
            workshop_1.default.findByIdAndUpdate({ '_id': req.body._id }, { $pull: { 'participants': req.body.user } }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ 'message': 'ok' });
                }
            });
        };
        this.addParticipantToWaitingList = (req, res) => {
            workshop_1.default.findByIdAndUpdate({ '_id': req.body._id }, { $push: { 'waitingList': req.body.user } }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ 'message': 'ok' });
                }
            });
        };
        this.getAllWorkshops = (req, res) => {
            workshop_1.default.find({ 'status': "active" }, (err, workshops) => {
                if (err)
                    console.log(err);
                else
                    res.json(workshops);
            });
        };
        this.getAllWorkshopsAdmin = (req, res) => {
            console.log("usao");
            workshop_1.default.find({ 'status': "inactive" }, (err, workshops) => {
                if (err)
                    console.log(err);
                else
                    res.json(workshops);
            });
        };
        this.post = (upload.single('file'), (req, res) => {
            // let organizer = req.body['organizer']
            // console.log(organizer);
            // imagePaths.forEach(i => {
            //     console.log(i);
            // })
            // res.json({"MESSAGE":"OK"})
            console.log('ok');
        });
        this.addComment = (req, res) => {
            let comment = new comment_1.default({
                text: req.body.text,
                workshop: req.body._id,
                date: new Date(),
                user: req.body.user,
                numberOfLikes: 0,
                likes: null
            });
            comment.save();
            workshop_1.default.updateOne({ '_id': req.body._id }, { $push: { 'comments': comment } }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ 'message': 'ok' });
                }
            });
        };
        this.deleteComment = (req, res) => {
            comment_1.default.findByIdAndDelete({ _id: new mongodb_1.ObjectId(req.body.comment_id) }).then(n => {
                workshop_1.default.updateOne({ '_id': new mongodb_1.ObjectId(req.body.workshop_id) }, { $pull: { comments: { '_id': new mongodb_1.ObjectId(req.body.comment_id) } } }, (err, resp) => {
                    if (err)
                        console.log(err);
                    else {
                        res.json({ 'message': 'ok' });
                    }
                });
            });
        };
        this.updateWorkshop = (req, res) => {
            workshop_1.default.findByIdAndUpdate({ "_id": new mongodb_1.ObjectId(req.body._id) }, { $set: {
                    title: req.body.title,
                    date: req.body.date,
                    shortDescription: req.body.shortDescription,
                    description: req.body.description,
                    latitude: req.body.latitude,
                    longitude: req.body.longitude,
                    street: req.body.street,
                    city: req.body.city,
                    country: req.body.country,
                } }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ 'message': 'ok' });
                }
            });
        };
        this.updateLikes = (req, res) => {
            if (!req.body.flag) {
                workshop_1.default.findByIdAndUpdate({ "_id": new mongodb_1.ObjectId(req.body.id) }, { $inc: { "numberOfLikes": -1 } }).then(r => {
                    workshop_1.default.findByIdAndUpdate({ '_id': new mongodb_1.ObjectId(req.body.id) }, { $pull: { 'likes': req.body.username } }, (err, resp) => {
                        if (err)
                            console.log(err);
                        else {
                            res.json({ 'message': 'ok' });
                        }
                    });
                });
            }
            else {
                workshop_1.default.findByIdAndUpdate({ "_id": new mongodb_1.ObjectId(req.body.id) }, { $inc: { "numberOfLikes": 1 } }).then(r => {
                    workshop_1.default.findByIdAndUpdate({ '_id': new mongodb_1.ObjectId(req.body.id) }, { $push: { 'likes': req.body.username } }, (err, resp) => {
                        if (err)
                            console.log(err);
                        else {
                            res.json({ 'message': 'ok' });
                        }
                    });
                });
            }
        };
        this.getAllComments = (req, res) => {
            comment_1.default.find({ workshop: req.body._id }, (err, comments) => {
                if (err)
                    console.log(err);
                else
                    res.json(comments);
            });
        };
        this.getWorkshop = (req, res) => {
            workshop_1.default.findById({ '_id': req.body._id }, (err, workshop) => {
                if (err)
                    console.log(err);
                else
                    res.json(workshop);
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
        this.setFinished = (req, res) => {
            workshop_1.default.findByIdAndUpdate({ '_id': req.body._id }, { $set: { 'finished': true } }, (err, success) => {
                if (err)
                    console.log(err);
                else
                    res.json({ msg: "Success" });
            });
        };
        this.updateStatus = (req, res) => {
            workshop_1.default.findByIdAndUpdate({ "_id": new mongodb_1.ObjectId(req.body._id) }, { $set: { "status": req.body.status } }, (err, success) => {
                if (err)
                    console.log(err);
                else
                    res.json({ msg: "Success" });
            });
        };
        this.clearWaithingList = (req, res) => {
            workshop_1.default.findByIdAndUpdate({ '_id': req.body._id }, { $set: { 'waitingList': [] } }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ 'message': 'ok' });
                }
            });
        };
    }
}
exports.workshopController = workshopController;
//# sourceMappingURL=workshop.controller.js.map