const mongoose = require("mongoose");
const validator = require("validator");

const Movie = mongoose.model("Movie", {
    name: {
        type: String,
        required: true,
        trim: true
    },
    releaseDate: {
        type: Date,
        required: false
        // todo

    },
    averageRating: {
        type: Number,
        required: false,
        default: null,
        validator(value) {
            if(value && (value>10 || value<1)) {
                throw new Error("Average rating out of range");
            }
        }

    }
});


module.exports = Movie;
