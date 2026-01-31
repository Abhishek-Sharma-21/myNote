import pool from "../config/db.js";

export const createNote = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      return res
        .status(400)
        .json({ message: "Please Fill all required Fields" });
    }

    const userId = req.user.id;

    const newNote = await pool.query(
      "INSERT INTO notes (user_id, title, description) VALUES ($1, $2, $3) RETURNING *",
      [userId, title, description],
    );
    return res.status(201).json({
      message: "New Note Created Successfully",
      note: newNote.rows[0],
    });
  } catch (error) {
    console.error("CREATE NOTE ERROR:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const fetchNotes = async (req, res) => {
  try {
    const userId = req.user.id;

    const notes = await pool.query(
      "SELECT id, title,description,created_at  FROM notes WHERE user_id = $1 ORDER BY created_at DESC",
      [userId],
    );
    return res.status(200).json({
      notes: notes.rows,
    });
  } catch (error) {
    console.error("FETCH NOTES ERROR:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const userId = req.user.id;

    const note = await pool.query(
      "SELECT * FROM notes WHERE id = $1 AND user_id = $2",
      [noteId, userId],
    );

    if (note.rows.length === 0) {
      return res.status(404).json({ message: "Note Not Found" });
    }
    await pool.query("DELETE FROM notes WHERE id = $1 AND user_id = $2", [
      noteId,
      userId,
    ]);

    return res.status(200).json({
      message: "Note Delete Successfull",
    });
  } catch (error) {
    console.error("DELETE NOTE ERROR:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const userId = req.user.id;
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const updatedNote = await pool.query(
      `UPDATE notes
       SET title = $1, description = $2
       WHERE id = $3 AND user_id = $4
       RETURNING *`,
      [title, description, noteId, userId],
    );

    if (updatedNote.rows.length === 0) {
      return res.status(404).json({ message: "Note not found" });
    }

    return res.status(200).json({
      message: "Note updated",
      note: updatedNote.rows[0],
    });
  } catch (error) {
    console.error("UPDATE NOTE ERROR:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
