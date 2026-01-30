import { useState, useRef } from "react";
import { MdClose } from "react-icons/md";

const Modal = ({ onClose, onNoteCreated }) => {
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const closeRef = useRef();

  const closeModal = (e) => {
    if (closeRef.current === e.target) {
      onClose();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/create-note`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ title, description }),
      });
      const data = await res.json();
      console.log(data);
      onNoteCreated(data.note);

      setTitle("");
      setDescription("");
      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      ref={closeRef}
      onClick={closeModal}
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center"
    >
      <div className="bg-white w-[700px] max-w-[90vw] rounded-xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Create New Note
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-xl"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="text-xl"
            >
              <MdClose />
            </button>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Title"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="6"
            className="w-full border rounded-md px-4 py-2 outline-none resize-none focus:ring-2 focus:ring-blue-500"
            placeholder="Description"
          />

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
