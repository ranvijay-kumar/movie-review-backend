const express = require("express");
const app = express();
const mongoose = require("mongoose");
const movieRouter = require("./src/routes/movie");
const reviewRouter = require("./src/routes/review");



mongoose.connect("mongodb://127.0.0.1:27017/movie-rating");


const port = process.env.port || 3000;

app.use(express.json());
app.use(movieRouter);
app.use(reviewRouter);

app.listen(port, () => {
    console.log("App is listening on port:" + port);
});
