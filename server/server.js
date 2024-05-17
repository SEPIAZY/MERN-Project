import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connect from './database/conn.js';
import router from './router/route.js';
import http from 'http';
import mongoose from "mongoose";

import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const ser  = http.createServer(app);

/** middlewares */
app.use(express.json({ limit: '10mb' }));
app.use(cors());
app.use(morgan('tiny'));
//app.disable('x-powered-by'); // less hackers know about our stack


const port = 8080;

/** HTTP GET Request */
app.get('/', (req, res) => {
    res.status(201).json("Home GET Request");
});
/** HTTP GET Request */
app.get('/testdb', (req, res) => {
    connect().then(() => {
        try {
            res.status(201).json("Connected DB");
        } catch (error) {
            res.status(500).json(error);
        }
    }).catch(error => {
        res.status(500).json(error);
    })
});

mongoose.connect("mongodb+srv://yeez2615:GmVj8q9qdXEvXMRU@cluster0.1dqnpuf.mongodb.net/?retryWrites=true&w=majority").then(() => {
    
    console.log("Mongodb connected sdsdsdsd");

  }).catch((err) => {
    console.log({ err });
    process.exit(1);
  });


/** api routes */
app.use('/api', router)

/** start server only when we have valid connection */
// connect().then(() => {
//     try {
//         ser.listen(port, () => {
//             console.log(`Server connected to http://localhost:${port}`);
//         })
//     } catch (error) {
//         console.log('Cannot connect to the server')
//     }
// }).catch(error => {
//     console.log("Invalid database connection...!");
// })

export default app