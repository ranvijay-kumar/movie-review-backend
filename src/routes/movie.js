const express = require("express");
const router = express.Router();
const Movie = require("../models/movie");
const Review = require("../models/review");

router.post("/movie", async (req, res) => {
    let movie = new Movie(req.body);
    try {
        let movieList = await Movie.find();
        if (movieList) {
            let duplicateMovie = movieList.filter((item) => {
                if (item.name === movie.name) {
                    // todo add date validation
                    return item;
                }
            });
            if (duplicateMovie.length > 0) {
                return res.status(400).send({
                    Success: "False",
                    message: "Movie already in the movie list",
                });
            }
        }
        await movie.save();
        return res.status(201).send({ Success: "True" });
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get("/movie", async (req, res) => {
    try {
        let movie = await Movie.find();
        if (!movie) {
            return res.status(404).send();
        }
        res.status(200).send(movie);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.delete("/movie/:id", async (req, res) => {
    let _id = req.params.id;
    try {
        await Movie.deleteOne({ _id });
        await Review.deleteMany({ movie: _id });
        res.status(200).send({ Success: "True" });
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
