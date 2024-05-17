import mongoose from "mongoose";

import { MongoMemoryServer } from "mongodb-memory-server";
import ENV from "../config.js";

async function connect() {
//   const mongod = await MongoMemoryServer.create();
  const mongod = new MongoMemoryServer();
  await mongod.start();
  const mongoUri = mongod.getUri();

  mongoose.set("strictQuery", true);
  // const db = await mongoose.connect(getUri);
  const db = await mongoose.connect(
    ENV.ATLAS_URI || mongoUri
    ,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );


  console.log("Database Connected ...");
  return db;
}

export default connect;
