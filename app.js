const express = require("express");
const app = express();
const mongoose = require("mongoose");
const movieRouter = require("./src/routes/movie");
const reviewRouter = require("./src/routes/review");
const cors = require("cors");
const DB_URL = process.env.DB_URL || "localhost";
const DB_PORT = process.env.DB_PORT ||  27017;


mongoose.connect("mongodb://"+DB_URL+":"+DB_PORT+"/movie-rating");


const port = process.env.port || 5000;

app.use(express.json());
app.use(cors());
app.use(movieRouter);
app.use(reviewRouter);

app.listen(port, () => {
    console.log("App is listening on port:" + port);
});
