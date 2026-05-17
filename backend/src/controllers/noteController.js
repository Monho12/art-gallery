
import Note from "../models/note.js"

export async function getAllNotes(req, res) {
    try {
        const notes = await Note.find({}).sort({ createdAt: -1 })
        res.status(200).json(notes)

    } catch (error) {
        console.error("error in getAllNotes controller", error)
        res.status(500).json({ message: "internal server error" })
    }
};

export async function getNoteById(req, res) {
    try {
        const note = await Note.findById(req.params.id)
        if (!note) return res.status(404).json({ message: "not found" })
        res.status(200).json(note)

    } catch (error) {
        console.error("error in getNoteById controller", error)
        res.status(500).json({ message: "internal server error" })
    }
};

export async function createNote(req, res) {
    try {
        const { title, content } = req.body
        const note = new Note({ title, content })

        const savedNote = await note.save()
        res.status(201).json(savedNote)
    } catch (error) {
        console.error("error in createNote controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
};
export async function updateNote(req, res) {
    try {
        const { title, content } = req.body
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, { title, content }, { new: true })
        if (!updatedNote) return res.status(404).json({ message: "note not found" })
        res.status(200).json(updatedNote)
    } catch (error) {
        console.log("error in UpdateController", error)
        res.status(500).json({ message: "Internal server error" })
    }
};
export async function deleteNote(req, res) {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id)
        if (!deletedNote) return res.status(404).json({ message: "Not found" })
        res.status(200).json(deletedNote)
    } catch (error) {
        console.log("error in UpdateController", error)
        res.status(500).json({ message: "Internal server error" })
    }
};