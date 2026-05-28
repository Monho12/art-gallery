import express from "express"
import { register, login, toggleSave, getSaved } from "../controllers/userController.js"
import { protect } from "../middleware/auth.js"

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.post("/arts/:id/save", protect, toggleSave)
router.get("/saved", protect, getSaved)

export default router
