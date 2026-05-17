
import Art from "../models/art.js"

export async function getAllArts(req, res) {
    try {
        const arts = await Art.find({}).sort({ createdAt: -1 })
        res.status(200).json(arts)

    } catch (error) {
        console.error("error in getAllArts controller", error)
        res.status(500).json({ message: "internal server error" })
    }
};

export async function getArtById(req, res) {
    try {
        const art = await Art.findById(req.params.id)
        if (!art) return res.status(404).json({ message: "not found" })
        res.status(200).json(art)

    } catch (error) {
        console.error("error in getArtById controller", error)
        res.status(500).json({ message: "internal server error" })
    }
};

export async function createArt(req, res) {
    try {
        const { title, artist, year, image, medium, genre, location, dimensions, description } = req.body
        const art = new Art({ title, artist, year, image, medium, genre, location, dimensions, description })

        const savedArt = await art.save()
        res.status(201).json(savedArt)
    } catch (error) {
        console.error("error in createArt controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
};

export async function updateArt(req, res) {
    try {
        const { title, artist, artistImage, year, image, medium, genre, location, dimensions, description } = req.body
        const updatedArt = await Art.findByIdAndUpdate(req.params.id, { title, artist, artistImage, year, image, medium, genre, location, dimensions, description }, { new: true })
        if (!updatedArt) return res.status(404).json({ message: "art not found" })
        res.status(200).json(updatedArt)
    } catch (error) {
        console.log("error in updateArt controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
};

export async function deleteArt(req, res) {
    try {
        const deletedArt = await Art.findByIdAndDelete(req.params.id)
        if (!deletedArt) return res.status(404).json({ message: "Not found" })
        res.status(200).json(deletedArt)
    } catch (error) {
        console.log("error in deleteArt controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
};
