const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
require('dotenv').config();
const PORT = process.env.PORT || 8000;
const MONGODB_URL = process.env.MONGODB_URL;


app.use(express.json());
app.use(morgan('dev'));


const connectToDB = async () => {
    try {
        await mongoose.connect(MONGODB_URL)
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};


app.use('/todos', require('./routes/todoRouter'));



app.use((err, req, res, next) => {
    console.error(err);
    return res.send({errMsg: err.message});
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});