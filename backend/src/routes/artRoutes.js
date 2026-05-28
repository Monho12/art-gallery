import express from "express"
import { createArt, deleteArt, getAllArts, getArtById, getArtsByUser, updateArt } from "../controllers/artController.js"
import { upload, cloudinary } from "../config/cloudinary.js"
import { protect } from "../middleware/auth.js"

const router = express.Router()

router.post("/upload", protect, upload.single("image"), async (req, res) => {
  try {
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "mern-art" },
        (error, result) => (error ? reject(error) : resolve(result))
      )
      stream.end(req.file.buffer)
    })
    res.json({ url: result.secure_url })
  } catch (error) {
    console.error("upload error", error)
    res.status(500).json({ message: "Upload failed" })
  }
})

router.get("/arts", getAllArts)
router.get("/arts/user/:userId", getArtsByUser)
router.get("/art/:id", getArtById)
router.post("/arts", protect, createArt)
router.put("/art/:id", protect, updateArt)
router.delete("/art/:id", protect, deleteArt)

export default router
