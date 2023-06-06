import mongoose from "mongoose";

export const RequestItem = new mongoose.Schema({
    name : {
        type: String,
        required : true
    },
    type: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required : true
    },
    image: { 
        type: String,
        required: true
    },
    
},
{timestamps: true}
);

export default mongoose.model('RequestItem', RequestItem);