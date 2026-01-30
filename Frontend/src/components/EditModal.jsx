import { useRef } from "react";
import { useState } from "react";
import { MdClose } from "react-icons/md";

const EditModal = ({ note, onClose, onEditNote }) => {
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const [title, setTitle] = useState(note.title);
  const [description, setDescription] = useState(note.description);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/update-note/${note.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ title, description }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(data.message || "Update failed");
        return;
      }
      onEditNote(data.note);
      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const closeRef = useRef();

  const closeModal = (e) => {
    if (closeRef.current === e.target) {
      onClose();
    }
  };
  return (
    <div
      ref={closeRef}
      onClick={closeModal}
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center"
    >
      <div className="bg-white w-[700px] max-w-[90vw] rounded-xl p-8">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Edit Note</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-xl"
          >
            <MdClose />
          </button>
        </div>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded-md px-4 py-2 mb-4 outline-none"
          placeholder="Title"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="6"
          className="w-full border rounded-md px-4 py-2 mb-6 outline-none resize-none"
          placeholder="Description"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-md"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
