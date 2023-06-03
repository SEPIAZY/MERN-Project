import mongoose from "mongoose";

export const Bearbrick = new mongoose.Schema({
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

export default mongoose.model.Admins || mongoose.model('Bearbrick', Bearbrick);