import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    username : {
        type: String,
        required : [true, "Please provide unique Username"],
        unique: [true, "Username Exist"]
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        unique : false,
    },
    email: {
        type: String,
        required : [true, "Please provide a unique email"],
        unique: true,
    },
    profile: {
        type: String,
        required : [false]
    },
    bio: { 
        type: String
    },
    role: { 
        type: String, 
        default: 'user'
    },
    item: {
        type: Array,
        default: []
    }
});

export default mongoose.model.Users || mongoose.model('User', UserSchema);