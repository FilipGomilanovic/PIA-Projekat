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
    organization_name: {
        type: String
    },
    address_of_the_headquarters_of_the_organization: {
        type: Object
    },
    registration_number_of_the_organization: {
        type: String
    }
});

export default mongoose.model('User', User, 'users');