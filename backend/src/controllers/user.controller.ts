import express from 'express'
import Organization from '../models/organization';
import User from '../models/user'
import Comment from '../models/comment'
import Workshop from '../models/workshop'
import { ObjectId } from 'mongodb';


const nodemailer = require("nodemailer");


const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'backend\src\Images')
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage})
//Ovo mi ne radi kako treba zbog fakepath

export class UserController{

    loginAdmin = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let password = req.body.password;
        let type = "administrator";
        
        User.findOne({'username': username, 'password': password, 'type': type}, (err, user)=>{
            if (err) console.log(err);
            else res.json(user);
        })
    }

    upload = (req: express.Request, res: express.Response)=>{
        console.log("testUpload")
        // let obj = req.body
        // console.log(obj)
        upload.single('file')
        res.json({"message": "ok"})
        
    }


    login = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let password = req.body.password;
        let type = req.body.type;
        
        User.findOne({'username': username, 'password': password, 'type': type, 'status': 'active'}, (err, user)=>{
            if (err) console.log(err);
            else res.json(user);
        })
    }

    register = (req: express.Request, res: express.Response)=>{
        let user = null
        if (req.body.type == "participant") {
                user = new User({
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
                user = new User({
                first_name: req.body.firstname,
                last_name: req.body.lastname,
                username: req.body.username,
                password: req.body.password,
                phone: req.body.phone,
                email: req.body.email,
                type: req.body.type,
                image: req.body.image,
                status: "new request",
                organization: new Organization({
                    organization_name: req.body.o_name,
                    organization_id: req.body.o_id,
                    country: req.body.country,
                    city: req.body.city,
                    postal_code: req.body.zip,
                    street_name: req.body.street    
                })
            })
        }
        user.save((err, resp)=>{
            if(err) {
                console.log(err);
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        })
    } 

    getAllRequests = (req: express.Request, res: express.Response) => {

        User.find({ status: "new request" }, (err, users) => {
            if (err) console.log(err);
            else res.json(users)
        })
    }

    getAllUsers = (req: express.Request, res: express.Response) => {
        User.find({}, (err, users) => {
            if (err) console.log(err);
            else res.json(users)
        })
    }

    getUser = (req: express.Request, res: express.Response) => {

        User.findOne({'username': req.body.username}, (err, user) => {
            if (err) console.log(err);
            else res.json(user)
        })
    }

    updateStatus = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let status = req.body.status;

        User.findOneAndUpdate({ 'username': username }, { $set: { 'status': status } }, (err, success) => {
            if (err) console.log(err);
            else res.json({ msg: "Success" })
        })
    }

    updateOrganizer = (req: express.Request, res: express.Response)=>{
        User.findByIdAndUpdate({ '_id': req.body._id, },
             { $set: { 'first_name': req.body.firstname,
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
                } },
              (err, success) => {
            if (err) console.log(err);
            else res.json({ msg: "Success" })
        })
    }

    updateParticipant = (req: express.Request, res: express.Response)=>{
        Comment.collection.updateMany(
            { 'user._id': req.body._id},
            { $set: {   'user.first_name': req.body.firstname,
                        'user.last_name': req.body.lastname,  
                        'user.username': req.body.username,  
                        'user.password': req.body.password,  
                        'user.email': req.body.email,  
                        'user.phone': req.body.phone,  
                        'user.image': req.body.image, } }
                  );
                  
        Workshop.collection.updateMany({ "comments.user._id": req.body._id},
        { $set: { "comments.$[comment].user.first_name": req.body.firstname,
                  "comments.$[comment].user.last_name": req.body.lastname,
                  "comments.$[comment].user.username": req.body.username,
                  "comments.$[comment].user.password": req.body.password,
                  "comments.$[comment].user.email": req.body.email,
                  "comments.$[comment].user.phone": req.body.phone,
                  "comments.$[comment].user.image": req.body.image,
                }},
                     
        { arrayFilters: [{ "comment.user._id": req.body._id}] }
        );
        console.log(req.body.oldUsername);

       
          Workshop.collection.updateMany(
            { participants: req.body.oldUsername },
            { $set: { 'participants.$': req.body.username } }
          );

          Workshop.collection.updateMany(
            { likes: req.body.oldUsername },
            { $set: { 'likes.$': req.body.username } }
          );

          Workshop.collection.updateMany(
            { waitingList: req.body.oldUsername },
            { $set: { 'waitingList.$': req.body.username } }
          );

       

        User.findByIdAndUpdate({ '_id': req.body._id, },
             { $set: { 'first_name': req.body.firstname,
                       'last_name': req.body.lastname,   
                       'username': req.body.username,  
                       'password': req.body.password,  
                       'email': req.body.email,  
                       'phone': req.body.phone,  
                       'image': req.body.image,
                 }},
              (err, success) => {
            if (err) console.log(err);
            else res.json({ msg: "Success" })
        })
    }

    changePassword = (req: express.Request, res: express.Response)=>{
        User.findOneAndUpdate({ 'username': req.body.username },{ $set: { 'password': req.body.password}}, (err, success) => {
            if (err) console.log(err);
            else res.json({ msg: "Success" })
        })
    }
  
    sendEmail = (req: express.Request, res: express.Response)=>{
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

        User.findOneAndUpdate({ 'email': req.body.email },
             { $set: { 'change_password_request_time': new Date(),
                        'verification_number': verificationNumber
                   
                }},
              (err, success) => {
            })
   
        const msg = {
            from: '"The Workshop App" <theExpressApp@example.com>', // sender address
            to: `${email}`, // list of receivers
            subject: "Password change", // Subject line
            text: "If you did not initiate the request for a password change, kindly disregard this email.", // plain text body
            html: "Change your password: <a href='http://localhost:4200/change-password'>here.</a><br>Your verification code is: "+ verificationNumber
        }
        transporter.sendMail(msg).then(o =>{
            res.json({ msg: "Success" })
        })   
    }

    notifyAll = (req: express.Request, res: express.Response)=>{
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
            from: '"The Workshop App" <theExpressApp@example.com>', // sender address
            to: `${emails}`, // list of receivers
            subject: workshopName + " - Available places", // Subject line
            text: "You can join now.", // plain text body
            html: "There are available places in the " + workshopName + " workshop, and you can join now!"
        }
        transporter.sendMail(msg).then(o =>{
            res.json({ msg: "Success" })
        })   
        
        
    }

}