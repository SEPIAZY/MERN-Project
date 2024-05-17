import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connect from './database/conn.js';
import router from './router/route.js';
import http from 'http';

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
            console.log('Cannot connect to the server')
        }
    }).catch(error => {
        console.log("Invalid database connection...!");
    })
});


/** api routes */
app.use('/api', router)

/** start server only when we have valid connection */
connect().then(() => {
    try {
        ser.listen(port, () => {
            console.log(`Server connected to http://localhost:${port}`);
        })
    } catch (error) {
        console.log('Cannot connect to the server')
    }
}).catch(error => {
    console.log("Invalid database connection...!");
})

export default app