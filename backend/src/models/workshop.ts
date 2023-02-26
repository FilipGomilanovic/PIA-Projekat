import mongoose from "mongoose";
const Schema = mongoose.Schema;

let Workshop = new Schema({
    organizer: {
        type: String
    },
    title: {
        type: String
    },
    date: {
        type: String
    },
    shortDescription: {
        type: String
    },
    description: {
        type: String
    },
    numberOfLikes: {
        type: Number
    },
    likes: {
        type: Array<String>
    },
    comments: {
        type: Array<Object>
    },
    images: {
        type: Array<String>
    },
    capacity: {
        type: Number
    },  
    participants: {
        type: Array<String>
    },
    waitingList: {
        type: Array<String>
    },
    finished: {
        type: Boolean
    },
    latitude: {
        type: String
    },
    longitude: {
        type: String
    },
    street: {
        type: String
    },
    city: {
        type: String
    },
    country: {
        type: String
    },
    status: {
        type: String
    }

});

export default mongoose.model('Workshop', Workshop, 'workshops');