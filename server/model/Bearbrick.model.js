import mongoose from "mongoose";

export const Bearbrick = new mongoose.Schema({
    name : {
        type: String,
        required : [true],
        unique: [true]
    },
    type: {
        type: String,
        required: [true],
        unique : false,
    },
    size: {
        type: String,
        required : [true],
        unique: true,
    },
    published: { 
        type: Date, 
        default: Date.now
    },
    image: { 
        type: String,
        required: true
    },
    
},
{timestamps: true}
);

export default mongoose.model.Admins || mongoose.model('Bearbrick', Bearbrick);