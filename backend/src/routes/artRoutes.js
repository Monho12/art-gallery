import express from "express"
import { createArt, deleteArt, getAllArts, getArtById, updateArt } from "../controllers/artController.js";

const router = express.Router();

router.get("/arts", getAllArts);
router.get("/art/:id", getArtById);
router.post("/arts", createArt);
router.put("/art/:id", updateArt);
router.delete("/art/:id", deleteArt);

export default router