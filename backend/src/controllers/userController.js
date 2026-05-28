import User from "../models/user.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

function generateToken(userId) {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" })
}

function safeUser(user) {
    return { _id: user._id, username: user.username, email: user.email, savedArts: user.savedArts || [] }
}

export async function register(req, res) {
    try {
        const { username, email, password } = req.body
        const existing = await User.findOne({ email })
        if (existing) return res.status(400).json({ message: "Email already in use" })
        const hashed = await bcrypt.hash(password, 10)
        const user = await User.create({ username, email, password: hashed })
        const token = generateToken(user._id)
        res.status(201).json({ token, user: safeUser(user) })
    } catch (error) {
        console.error("error in register controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) return res.status(400).json({ message: "Invalid credentials" })
        const match = await bcrypt.compare(password, user.password)
        if (!match) return res.status(400).json({ message: "Invalid credentials" })
        const token = generateToken(user._id)
        res.status(200).json({ token, user: safeUser(user) })
    } catch (error) {
        console.error("error in login controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export async function toggleSave(req, res) {
    try {
        const user = req.user
        const artId = req.params.id
        const isSaved = user.savedArts.some(id => id.toString() === artId)
        if (isSaved) {
            user.savedArts = user.savedArts.filter(id => id.toString() !== artId)
        } else {
            user.savedArts.push(artId)
        }
        await user.save()
        res.status(200).json({ savedArts: user.savedArts })
    } catch (error) {
        console.error("error in toggleSave controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export async function getSaved(req, res) {
    try {
        const user = await User.findById(req.user._id).populate("savedArts")
        res.status(200).json(user.savedArts)
    } catch (error) {
        console.error("error in getSaved controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}
