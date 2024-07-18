import "dotenv/config"
import express from 'express';
import https from 'https'
import cookieParser from 'cookie-parser';
import getDB from './db/connect';
import apiRouter from './routes';
import cors from 'cors';
import { getUserByEmail } from './db/auth';
import { readFileSync } from "fs";

const demoEmail = "user@example.com"

const app = express();
const port = 4000;

const options = {
    key: readFileSync('./cert/localhost.key'),
    cert: readFileSync('./cert/localhost.crt')
}

app.use(express.json())
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000', 'https://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))
app.use(cookieParser())
app.use("/api", apiRouter)

app.post('/', async (req: any, res: any) => {
    const token = req.cookies;
    console.log(req)
    if (token) {
        res.status(200).json({ message: 'Authenticated', token: token });
    } else {
        res.status(401).json({ message: 'Not authenticated' });
    }
});

async function launchServer() {
    try {
        const connection = await getDB();
        if (connection === null) throw Error(`Failed to connect to database. ${process.env.DB_DATABASE}`)
        const rows = await getUserByEmail(demoEmail)
        if (rows) {
            console.log("Server connected to database")
        }
    } catch (err) {
        console.error(err)
    }
    console.log(`Server is running on https://localhost:${port}`);

}

app.listen(port, launchServer)
//https.createServer(options, app).listen(port, launchServer)

