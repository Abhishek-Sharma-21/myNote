import { Link, useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { useState } from "react";
import { useEffect } from "react";
import ViewModal from "./ViewModal";
import EditModal from "./EditModal";

const NotesDashboard = () => {
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [notes, setNotes] = useState("");
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [editNote, setEditNote] = useState(null);

  //Getting users detail
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/auth/getProfile`, {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) {
          console.log("Data fetching failed");
        }
        if (res.status === 401) {
          navigate("/login");
          return;
        }
        const data = await res.json();
        setUser(data.user);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  //Getting Notes
  useEffect(() => {
    const fetchNotes = async () => {
      const res = await fetch(`${BASE_URL}/api/fetch-note`, {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) {
        console.log("Notes Fetching Failed");
      }
      const data = await res.json();
      setNotes(data.notes);
    };
    fetchNotes();
  }, []);

  const handleLogout = async () => {
    await fetch(`${BASE_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    setUser(null);
    navigate("/login");
  };

  // delete function
  const handleDelete = async (noteId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this note?",
    );
    if (!confirmDelete) return;
    try {
      const res = await fetch(`${BASE_URL}/api/delete-note/${noteId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        console.log("Delete failed");
        return;
      }

      // 🔥 remove note from UI
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
    } catch (error) {
      console.log(error);
    }
  };

  const [showModal, setShowModal] = useState(false);
  const onClose = () => {
    setShowModal(false);
  };

  const handleUpdate = (note) => {
    if (editNote) {
      setNotes((prev) => prev.map((n) => (n._id === note._id ? note : n)));
    } else {
      setNotes((prev) => [note, ...prev]);
    }
  };
  return (
    <div className=" p-5 bg-[#f3f8fe] h-screen">
      <div className="bg-white h-[80px]  shadow-md flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold px-4 text-blue-600">
            My Notes
          </h1>
        </div>
        <div className="flex items-center gap-10">
          {user ? (
            <>
              <p className="text-base text-gray-400">{user.name}</p>
              <button
                onClick={handleLogout}
                className="cursor-pointer hover:bg-gray-400 px-4 py-1 m-2 rounded-md inline-block"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="cursor-pointer hover:bg-gray-400 px-4 py-1 m-2 rounded-md inline-block"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/*  */}
      <div>
        <div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-700 border-none rounded-md py-2 px-8  text-2xl text-white my-5 mx-8 cursor-pointer hover:bg-blue-600"
          >
            + Create New Note
          </button>
          {showModal && (
            <Modal
              onClose={onClose}
              onNoteCreated={(newNote) =>
                setNotes((prev) => [newNote, ...prev])
              }
            />
          )}
        </div>
        <div>
          {/*  */}
          <div className="py-8 px-5 rounded-md bg-white w-full shadow">
            {notes.length === 0 ? (
              <h1 className="text-center text-3xl text-gray-400 ">
                No notes yet. Create your first note!
              </h1>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
                {notes.map((note) => (
                  <div
                    key={note.id}
                    className="bg-white p-5 rounded-lg shadow flex flex-col gap-3 min-h-[260px]"
                  >
                    <h2 className="text-xl font-semibold">{note.title}</h2>

                    <p className="text-gray-600 line-clamp-4 break-words">
                      {note.description}
                    </p>

                    <div className="flex justify-end gap-3 mt-auto">
                      <button
                        onClick={() => {
                          setSelectedNote(note);
                          setIsViewModalOpen(true);
                        }}
                        className="px-3 py-1 text-sm rounded-md bg-gray-600 text-white hover:bg-gray-700"
                      >
                        View Full
                      </button>
                      {isViewModalOpen && selectedNote && (
                        <ViewModal
                          note={selectedNote}
                          onClose={() => {
                            setIsViewModalOpen(false);
                            setSelectedNote(null);
                          }}
                        />
                      )}

                      <button
                        onClick={() => setEditNote(note)}
                        className="px-3 py-1 text-sm rounded-md bg-blue-500 text-white hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      {editNote && (
                        <EditModal
                          note={editNote}
                          onClose={() => setEditNote(null)}
                          onEditNote={handleUpdate}
                        />
                      )}

                      <button
                        onClick={() => handleDelete(note.id)}
                        className="px-3 py-1 text-sm rounded-md bg-red-500 text-white hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/*  */}
        </div>
      </div>
    </div>
  );
};
export default NotesDashboard;
