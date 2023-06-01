import mongoose from "mongoose";

export const Collection = new mongoose.Schema({
    userid: {
        type: String,
        required : [true],
        unique: [true]
    },
    itemid: {
        type: String,
        required: [true],
        unique : [true]
    },
});

export default mongoose.model.Collection || mongoose.model('Collection', Collection);