import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postROutes from './routes/ports.js';
import dotenv from 'dotenv';


// const express = require("express");
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const postRoutes = require("./routes/posts");
// const dotenv = require("dotenv");

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postRoutes);

app.get('/',(req,res)=>{
    res.send('Hello to memories API');
})

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTIONURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`server running on port ${PORT}`)))
    .catch((error) => console.log('error', error.message));

mongoose.set('useFindAndModify', false);
//https://www.mongodb.com/cloud/atlas