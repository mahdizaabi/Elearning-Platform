import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
const morgan = require('morgan');
import courseModel from './models/course';
require("dotenv").config();

import csrf from "csurf";

import cookieParser from 'cookie-parser'

/*  ROUTES  */
const authRoute = require('./routes/auth');
const InstructorRoute = require('./routes/auth');

const csrfProtection = csrf({ cookie: true })

require('dotenv').config();


const app = express();


//database connexion
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => console.log('db cnnected')).catch(e => console.log(e))
app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use(cookieParser())
app.use(morgan("dev"));



//routes: 
app.use('/api', authRoute);


app.use(csrfProtection);



app.get('/api/csrf-token', (req, res) => {
    console.log("csrf generated");
    res.json({ csrfToken: req.csrfToken() })
})
const port = process.env.PORT || 8000;

app.listen(port, () => {

   
    console.log(`server is running on port ${port}`)
})
