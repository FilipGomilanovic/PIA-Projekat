import express from 'express'
import Organization from '../models/organization';
import registerRequest from '../models/registerRequest';
import User from '../models/user'

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

    login = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let password = req.body.password;
        let type = req.body.type;
        
        User.findOne({'username': username, 'password': password, 'type': type}, (err, user)=>{
            if (err) console.log(err);
            else res.json(user);
        })
    }

    register = (req: express.Request, res: express.Response)=>{
     
        let registerR = new registerRequest()
        if (req.body.type == "participant") {
            registerR.user = new User({
                first_name: req.body.firstname,
                last_name: req.body.lastname,
                username: req.body.username,
                password: req.body.password,
                phone: req.body.phone,
                email: req.body.email,
                type: req.body.type,
                organization: null,
          
            });
            registerR.status = "new request"
        } 
        else {
            registerR.user = new User({
                first_name: req.body.firstname,
                last_name: req.body.lastname,
                username: req.body.username,
                password: req.body.password,
                phone: req.body.phone,
                email: req.body.email,
                type: req.body.type,
                organization: new Organization({
                    organization_name: req.body.o_name,
                    organization_id: req.body.o_id,
                    country: req.body.country,
                    city: req.body.city,
                    postal_code: req.body.zip,
                    street_name: req.body.street    
                })
            })
            registerR.status = "new request"
        }

        registerR.save((err, resp)=>{
            if(err) {
                console.log(err);
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        })
    } 
}