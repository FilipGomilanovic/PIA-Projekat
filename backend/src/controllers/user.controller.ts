import express from 'express'
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
}