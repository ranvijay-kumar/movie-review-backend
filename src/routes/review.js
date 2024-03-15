const express = require("express");
const router = express.Router();
const Movie = require("../models/movie");
const Review = require("../models/review");

router.post("/review", async (req, res) => {
    let review = new Review(req.body);
    try {
        await review.save();
        let totalRating = req.body.rating;
        let numberOfRating = 1;
        for await (const item of Review.find({ movie: req.body.movie })) {
            totalRating += item.rating;
            numberOfRating += 1;
        }
        let avgRating = totalRating / numberOfRating;
        const movie = await Movie.updateOne(
            { _id: req.body.movie },
            { averageRating: avgRating }
        );
        return res.status(201).send(movie);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get("/review/:id", async (req, res) => {
    let _movieId = req.params.id;
    try {
        let review = await Review.find({ movie: _movieId });
        res.status(200).send(review);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.delete("/review/:id", async (req, res) => {
    let _id = req.params.id;
    try {
        await Review.deleteOne({ _id });
        res.status(200).send({ Success: "True" });
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
