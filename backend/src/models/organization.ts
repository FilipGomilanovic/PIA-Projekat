import mongoose from "mongoose";
const Schema = mongoose.Schema;

let Ogranizaton = new Schema({
    organization_name: {
        type: String
    },
    organization_id: {
        type: String
    },
    country: {
        type: String
    },
    city: {
        type: String
    },
    postal_code: {
        type: Number
    },
    street_name: {
        type: String
    }
});

export default mongoose.model('Ogranizaton', Ogranizaton, 'organizations');