"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const user_routes_1 = __importDefault(require("./routers/user.routes"));
const workshop_routes_1 = __importDefault(require("./routers/workshop.routes"));
const workshop_1 = __importDefault(require("./models/workshop"));
const nodemailer = require("nodemailer");
const app = (0, express_1.default)();
app.post('/sendEmail', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let email = req.body.email;
    console.log(email);
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'alize.cronin@ethereal.email',
            pass: '8srb8zPKVbBfsfWwSx'
        }
    });
    const msg = {
        from: '"The Exapress App" <theExpressApp@example.com>',
        to: `${email}`,
        subject: "Sup",
        text: "Long time no see", // plain text body
    };
    // send mail with defined transport object
    console.log("????");
    const info = yield transporter.sendMail(msg);
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    res.send('Email Sent!');
}));
var imagePath = new Array();
const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../frontend/src/assets/Images/workshop');
    },
    filename: (req, file, cb) => {
        let image = Date.now() + path.extname(file.originalname);
        imagePath.push(image);
        cb(null, image);
    }
});
const upload = multer({ storage: storage });
app.post("/uploadPhoto", upload.single('file'), (req, res) => {
    console.log(imagePath);
    res.json({ "message": imagePath });
});
app.post("/addNewWorkshop", upload.array('files', 10), (req, res) => {
    imagePath.forEach(i => {
        console.log(i);
    });
    res.json({ "message": imagePath });
    let workshop = new workshop_1.default({
        organizer: req.body.organizer,
        title: req.body.title,
        date: req.body.date,
        capacity: req.body.capacity,
        shortDescription: req.body.shortDescription,
        description: req.body.description,
        images: imagePath,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        street: req.body.street,
        city: req.body.city,
        country: req.body.country,
        finished: false,
        numberOfLikes: 0,
        status: "inactive"
        // likes: null,
        // comments: null,
        // waitingList: null,
    });
    workshop.save().then(resp => {
        console.log("workshopAdded");
    });
});
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
mongoose_1.default.connect('mongodb://127.0.0.1:27017/art_workshop');
const conn = mongoose_1.default.connection;
conn.once('open', () => {
    console.log('mongo open');
});
const router = express_1.default.Router();
router.use('/users', user_routes_1.default);
router.use('/workshops', workshop_routes_1.default);
app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map