import mongoose from "mongoose";

import { MongoMemoryServer } from "mongodb-memory-server";
import ENV from '../config.js'

async function connect(){

    const mongod = await MongoMemoryServer.create();
    const getUri = mongod.getUri();

    mongoose.set('strictQuery', true)
    // const db = await mongoose.connect(getUri);
    const db = await mongoose.connect("mongodb+srv://riw:Vha315Sfv0QM44ki@newcluster.fxldupt.mongodb.net/?retryWrites=true&w=majority");
    console.log("Database Connected")
    return db;
}

export default connect;