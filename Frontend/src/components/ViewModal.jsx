import { useRef } from "react";

const ViewModal = ({ onClose }) => {
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
      className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm "
    >
      <div className="mt-10 flex flex-col gap-5 text-white">
        {/* Close button */}
        <button
          onClick={onClose}
          className="place-self-end-safe py-1 px-2 cursor-pointer rounded-lg hover:bg-gray-500"
        >
          ✕
        </button>

        <div className="bg-white w-[750px] max-w-[90vw] rounded-xl px-10 py-10 flex flex-col gap-5 mx-1">
          {/* Title */}
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            This is Note Title
          </h2>

          {/* Description */}
          <p className="text-gray-600 whitespace-pre-wrap break-words leading-relaxed max-h-[22rem] overflow-y-auto pr-2">
            (Client): The user interface (e.g., built with React, Angular, Vue,
            or plain HTML/CSS/JavaScript) where users interact with the
            application. It runs in a browser or as a mob frontend and backend
            communicate, typically using H Backend Server: Build a backend using
            a suitable framework (e.g., Express.js for Node.js, Django for
            Python). Install a PostgreSQL Library: Use a client library specific
            to your backend language to enabl credentials. Connection strings
            are a common method for this.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewModal;
