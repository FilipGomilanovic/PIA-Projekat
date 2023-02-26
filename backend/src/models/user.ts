import mongoose from "mongoose";
const Schema = mongoose.Schema;

let User = new Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    phone: {
        type: String
    },
    type: {
        type: String
    },
    email: {
        type: String
    },
    image: {
        type: String
    },
    status: {
        type: String
    },  
    organization: {
        type: Object
    },
    verification_number: {
        type: Number
    },
    change_password_request_time:{
        type: Date
    },
    attended_workshops: {
        type: Array<String>
    },

});

export default mongoose.model('User', User, 'users');