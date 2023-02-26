import mongoose from "mongoose";
const Schema = mongoose.Schema;

let Comment = new Schema({
    workshop: {
        type: String
    },
    user: {
        type: Object
    },
    date: {
        type: Date
    },
    numberOfLikes: {
        type: String
    },
    likes: {
        type: Array<String>
    },
    text: {
        type: String
    }
});

export default mongoose.model('Comment', Comment, 'comments');