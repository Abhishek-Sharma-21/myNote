import express from "express";
import {
  createNote,
  deleteNote,
  fetchNotes,
  updateNote,
} from "../controllers/note.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create-note", protect, createNote);

router.get("/fetch-note", protect, fetchNotes);
router.delete("/delete-note/:id", protect, deleteNote);
router.put("/update-note/:id", protect, updateNote);

export default router;
