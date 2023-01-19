import mongoose from "mongoose";
const Schema = mongoose.Schema;

let registerRequest = new Schema({
    user: {
        type: Object
    },
    status: {
        type: String
    }
});

export default mongoose.model('registerRequest', registerRequest, 'registerRequest');