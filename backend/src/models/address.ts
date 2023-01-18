import mongoose from "mongoose";
const Schema = mongoose.Schema;

let Address = new Schema({
    country: {
        type: String
    },
    city: {
        type: String
    },
    postal_code: {
        type: String
    },
    street_name: {
        type: String
    },
    street_number: {
        type: Number
    }
});

export default mongoose.model('Address', Address, 'adresses');