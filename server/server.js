import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
const morgan = require('morgan');
const authRoute = require('./routes/auth');

require('dotenv').config();


const app = express();


//database connexion
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useFindAndModify:false,
    useUnifiedTopology:true,
    useCreateIndex: true
}).then(()=>console.log('db cnnected')).catch(e=>console.log(e))
 
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use((req, res, next) => {
    console.log("middleware is executed")
    next()
})


//routes:


app.use('/api', authRoute);

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})
