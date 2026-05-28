import mongoose from "mongoose";

const artSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    artist: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    medium: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    dimensions: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
}, { timestamps: true })

const Art = mongoose.model("Art", artSchema)

export default Art
