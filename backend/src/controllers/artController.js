import Art from "../models/art.js"
import { cloudinary } from "../config/cloudinary.js"

export async function getArtsByUser(req, res) {
    try {
        const arts = await Art.find({ userId: req.params.userId }).sort({ createdAt: -1 })
        res.status(200).json(arts)
    } catch (error) {
        console.error("error in getArtsByUser controller", error)
        res.status(500).json({ message: "internal server error" })
    }
}

export async function getAllArts(req, res) {
    try {
        const arts = await Art.find({}).sort({ createdAt: -1 })
        res.status(200).json(arts)
    } catch (error) {
        console.error("error in getAllArts controller", error)
        res.status(500).json({ message: "internal server error" })
    }
}

export async function getArtById(req, res) {
    try {
        const art = await Art.findById(req.params.id)
        if (!art) return res.status(404).json({ message: "not found" })
        res.status(200).json(art)
    } catch (error) {
        console.error("error in getArtById controller", error)
        res.status(500).json({ message: "internal server error" })
    }
}

export async function createArt(req, res) {
    try {
        const { title, artist, year, image, medium, genre, dimensions, description } = req.body
        const art = new Art({ userId: req.user._id, title, artist, year, image, medium, genre, dimensions, description })
        const savedArt = await art.save()
        res.status(201).json(savedArt)
    } catch (error) {
        console.error("error in createArt controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export async function updateArt(req, res) {
    try {
        const art = await Art.findById(req.params.id)
        if (!art) return res.status(404).json({ message: "art not found" })
        if (art.userId.toString() !== req.user._id.toString())
            return res.status(403).json({ message: "Not authorized" })
        const { title, artist, year, image, medium, genre, dimensions, description } = req.body
        const updatedArt = await Art.findByIdAndUpdate(
            req.params.id,
            { title, artist, year, image, medium, genre, dimensions, description },
            { new: true }
        )
        res.status(200).json(updatedArt)
    } catch (error) {
        console.log("error in updateArt controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export async function deleteArt(req, res) {
    try {
        const art = await Art.findById(req.params.id)
        if (!art) return res.status(404).json({ message: "Not found" })
        if (art.userId.toString() !== req.user._id.toString())
            return res.status(403).json({ message: "Not authorized" })

        if (art.image) {
            const afterUpload = art.image.split("/upload/")[1]
            if (afterUpload) {
                const withoutVersion = afterUpload.split("/").slice(1).join("/")
                const publicId = withoutVersion.replace(/\.[^/.]+$/, "")
                await cloudinary.uploader.destroy(publicId)
            }
        }

        await art.deleteOne()
        res.status(200).json(art)
    } catch (error) {
        console.log("error in deleteArt controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}
