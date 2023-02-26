import express from 'express'
import Organization from '../models/organization';
import User from '../models/user'
import Workshop from '../models/workshop'
import Comment from '../models/comment'
import { Console } from 'console';
import { ObjectId } from 'mongodb';


let imagePath = null
const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../Images/workshop')
        // backend\src\Images\workshop
    },
    filename: (req, file, cb) => {
        console.log("usao u multer")
        imagePath = Date.now() + path.extname(file.originalname);
        // imagePaths.push(image)
        cb(null, imagePath)
    }
})

const upload = multer({storage: storage})




// uploadPhotos = (upload.array('files'), (req: express.Request, res: express.Response) => {
//    res.json({"message": imagePath})
// })

//Ovo mi ne radi kako treba zbog fakepath

export class workshopController{

    // upload = (req: express.Request, res: express.Response)=>{
    //     console.log("testUpload")
    //     // let obj = req.body
    //     // console.log(obj)
    //     // upload.single('file')
    //     res.json({"message": "ok"})
        
    // }

    uploadPhotos = (upload.array('files'), (req: express.Request, res: express.Response) => {
        let organizer = req.body['organizer']
        console.log(organizer);
        res.json({"MESSAGE":"OK"})
     })

     uploadPhoto = (upload.single('file'),(req: express.Request, res: express.Response) =>{
        upload.single('file')
        console.log(imagePath)
        console.log("okiii")
        console.log("posle")
        res.json({"message": "ok"})
  
     })

    addParticipant = (req: express.Request, res: express.Response) => {
        Workshop.findByIdAndUpdate({'_id': req.body._id}, {$push: {'participants': req.body.user}}, (err, resp)=>{
            if(err) console.log(err)
            else {
                res.json({'message': 'ok'})
            }
        });
    }

    removeParticipant = (req: express.Request, res: express.Response) => {
        Workshop.findByIdAndUpdate({'_id': req.body._id}, {$pull: {'participants': req.body.user}}, (err, resp)=>{
            if(err) console.log(err)
            else {
                res.json({'message': 'ok'})
            }
        });
    }

    addParticipantToWaitingList = (req: express.Request, res: express.Response) => {
        Workshop.findByIdAndUpdate({'_id': req.body._id}, {$push: {'waitingList': req.body.user}}, (err, resp)=>{
            if(err) console.log(err)
            else {
                res.json({'message': 'ok'})
            }
        });
    }

    getAllWorkshops = (req: express.Request, res: express.Response) => {
        Workshop.find({'status': "active"}, (err, workshops) => {
            if (err) console.log(err);
            else res.json(workshops)
        })
    }

    getAllWorkshopsAdmin = (req: express.Request, res: express.Response) => {
      
        Workshop.find({'status': "inactive"}, (err, workshops) => {
            if (err) console.log(err);
            else res.json(workshops)
        })
    }

    post = (upload.single('file'), (req,res) => {
        // let organizer = req.body['organizer']
        // console.log(organizer);
        // imagePaths.forEach(i => {
        //     console.log(i);
        // })
        // res.json({"MESSAGE":"OK"})
        console.log('ok')
     })

     addComment = (req: express.Request, res: express.Response) => {
       
        let comment = new Comment({
            text: req.body.text,
            workshop: req.body._id,
            date: new Date(),
            user: req.body.user,
            numberOfLikes: 0,
            likes: null
        })
        comment.save()
        Workshop.updateOne({ '_id': req.body._id}, {$push: {'comments': comment}}, (err, resp)=>{
            if(err) console.log(err)
            else {
                res.json({'message': 'ok'})
            }
        });
     }

     deleteComment = (req: express.Request, res: express.Response) => {
       
        Comment.findByIdAndDelete({ _id: new ObjectId(req.body.comment_id)  }).then(n => {
            Workshop.updateOne({ '_id': new ObjectId(req.body.workshop_id)}, { $pull: { comments: {'_id':new ObjectId(req.body.comment_id)}}}, (err, resp)=>{
            if(err) console.log(err)
            else {
                res.json({'message': 'ok'})
            }})})
    
     }

     updateWorkshop = (req: express.Request, res: express.Response) => {
       
        Workshop.findByIdAndUpdate({"_id": new ObjectId(req.body._id)},
                                    {$set: {    
                                        title: req.body.title,
                                        date: req.body.date,
                                        shortDescription: req.body.shortDescription,
                                        description: req.body.description,
                                        latitude: req.body.latitude,
                                        longitude: req.body.longitude,
                                        street: req.body.street,
                                        city: req.body.city,
                                        country: req.body.country,
                                        
        }}, (err, resp)=>{
            if(err) console.log(err)
            else {
                res.json({'message': 'ok'})
            }
      });
    
     }

     updateLikes = (req: express.Request, res: express.Response) => {
       if (!req.body.flag) {
          Workshop.findByIdAndUpdate({"_id": new ObjectId(req.body.id)}, {$inc: {"numberOfLikes": -1}}).then(r=>{
            Workshop.findByIdAndUpdate({'_id': new ObjectId(req.body.id)}, {$pull: {'likes': req.body.username}}, (err, resp)=>{
                if(err) console.log(err)
                else {
                    res.json({'message': 'ok'})
                }
          });
         
        });
       } else {
        Workshop.findByIdAndUpdate({"_id": new ObjectId(req.body.id)}, {$inc: {"numberOfLikes": 1}}).then(r=>{
            Workshop.findByIdAndUpdate({'_id': new ObjectId(req.body.id)}, {$push: {'likes': req.body.username}}, (err, resp)=>{
                if(err) console.log(err)
                else {
                    res.json({'message': 'ok'})
                }
          });
         
        });
       }
    
     }

     getAllComments = (req: express.Request, res: express.Response) => {
        Comment.find({workshop: req.body._id}, (err, comments) => {
            if (err) console.log(err);
            else res.json(comments)
        })
     }

     getWorkshop =(req: express.Request, res: express.Response) => {
        Workshop.findById({'_id': req.body._id}, (err, workshop) =>{
            if (err) console.log(err);
            else res.json(workshop)
        })
     }
       

    getAllRequests = (req: express.Request, res: express.Response) => {

        User.find({ status: "new request" }, (err, users) => {
            if (err) console.log(err);
            else res.json(users)
        })
    }

    setFinished = (req: express.Request, res: express.Response) => {

        Workshop.findByIdAndUpdate({'_id': req.body._id}, {$set: {'finished': true}}, (err,success)=>{
            if (err) console.log(err);
            else res.json({ msg: "Success" })
        }) 
    }

    updateStatus = (req: express.Request, res: express.Response) => {

        Workshop.findByIdAndUpdate({"_id": new ObjectId(req.body._id)}, {$set: {"status": req.body.status}}, (err, success) => {
            if (err) console.log(err);
            else res.json({ msg: "Success" })
        })
    }



    clearWaithingList = (req: express.Request, res: express.Response) => {

        Workshop.findByIdAndUpdate({'_id': req.body._id}, { $set: { 'waitingList': [] }}, (err, resp)=>{
            if(err) console.log(err)
            else {
                res.json({'message': 'ok'})
            }
        });
    }

    
}