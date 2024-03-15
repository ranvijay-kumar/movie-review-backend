const mongoose = require("mongoose");


const Review = mongoose.model("Review", {
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Movie"
    },
    reviewerName: {
        type: String,
        required: false,
        trim: true
    },
    rating: {
        type: Number,
        required: true,
        validator(value) {
            if(value>10 || value<1) {
                throw new Error("Average rating out of range");
            }
        }
    },
    comment: {
        type: String,
        required: true,
        trim: true
    }
});

module.exports = Review;
