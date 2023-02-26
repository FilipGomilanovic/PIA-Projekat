import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRouter from './routers/user.routes';
import workshopRouter from './routers/workshop.routes'
import Workshop from './models/workshop'

const nodemailer = require("nodemailer");
const app = express();

app.post('/sendEmail', async (req, res) => {
    let email = req.body.email;
    console.log(email)
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
        from: '"The Exapress App" <theExpressApp@example.com>', // sender address
        to: `${email}`, // list of receivers
        subject: "Sup", // Subject line
        text: "Long time no see", // plain text body
    }
    // send mail with defined transport object
    console.log("????")
    const info = await transporter.sendMail(msg);

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    
    res.send('Email Sent!')
})

var imagePath = new Array(); 
const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../frontend/src/assets/Images/workshop')
    },
    filename: (req, file, cb) => {
        let image: string =Date.now() + path.extname(file.originalname)
        imagePath.push(image)
        cb(null, image)
    }
})

const upload = multer({storage: storage})

app.post("/uploadPhoto", upload.single('file'), (req: express.Request, res: express.Response) =>{
    console.log(imagePath)
    res.json({"message": imagePath}) 
 })

 app.post("/addNewWorkshop", upload.array('files', 10), (req: express.Request, res: express.Response) =>{
 
    imagePath.forEach(i =>{
        console.log(i)
    })
    res.json({"message": imagePath})
    let workshop = new Workshop({
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
    })
    workshop.save().then(resp=>{
        console.log("workshopAdded")
      
    })
   
 })

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/art_workshop');

const conn = mongoose.connection;

conn.once('open', ()=>{
    console.log('mongo open');
})

const router = express.Router();
router.use('/users', userRouter)
router.use('/workshops', workshopRouter)

app.use('/', router)

app.listen(4000, () => console.log(`Express server running on port 4000`));