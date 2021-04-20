const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require('mongoose');

// Dotenv
require('dotenv').config();

// Mongodb
const mongoUri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWD}@cluster0.qwrnf.mongodb.net/${process.env.MONGODB_DB}?retryWrites=true&w=majority`
mongoose.connect(mongoUri)
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.log('Could not connect to MongoDB: ', err))

const app = express();
app.use(morgan("combined"));
app.use(express.json());
app.use(cors());

// Routes
app.use("/ctf", require('./routes/ctfRoute'))

console.log(`Listening on port ${process.env.PORT || 8081}`);
app.listen(process.env.PORT || 8081);