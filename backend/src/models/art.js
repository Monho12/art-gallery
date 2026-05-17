import mongoose from "mongoose";

const artSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },

    year: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    medium: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    dimensions: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
}, { timestamps: true })

const Art = mongoose.model("Art", artSchema)

export default Art
