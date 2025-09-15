import React from "react";
import { FaRegFileAlt, FaTrash } from "react-icons/fa";
import { motion } from "motion/react";

const Cards = ({ card, refrance, onDelete }) => {
  const { id, description, file = [] } = card;

  const handleDelete = () => {
    // Remove from localStorage
    const savedCards = JSON.parse(localStorage.getItem("cards")) || [];
    const updatedCards = savedCards.filter((c) => c.id !== id);
    localStorage.setItem("cards", JSON.stringify(updatedCards));

    // Call parent callback to remove from state
    if (onDelete) onDelete(id);
  };

  return (
    <motion.div
      drag
      dragConstraints={refrance}
      className="w-[180px] h-[230px] bg-zinc-800 rounded-xl shadow-md border border-gray-700 overflow-hidden flex flex-col relative"
    >
      {/* Delete Button */}
      <button
        onClick={handleDelete}
        className="absolute top-2 right-2 text-red-500 hover:text-red-700 z-10"
        title="Delete"
      >
        <FaTrash />
      </button>

      {/* File Preview */}
      <div className="flex-1 flex items-center justify-center bg-zinc-900">
        {file.length > 0 ? (
          file.map((f, idx) => {
            let fileURL = f;
            if (f instanceof File) fileURL = URL.createObjectURL(f);

            if (
              fileURL.startsWith("data:image/") ||
              fileURL.endsWith(".jpg") ||
              fileURL.endsWith(".png")
            ) {
              return (
                <img
                  key={idx}
                  src={fileURL}
                  alt={description || "file"}
                  className="w-full h-full object-cover"
                />
              );
            }

            if (f.type === "application/pdf" || fileURL.endsWith(".pdf")) {
              return (
                <div
                  key={idx}
                  className="flex items-center justify-center w-full h-full bg-red-200 text-red-800 font-bold"
                >
                  PDF
                </div>
              );
            }

            return (
              <div
                key={idx}
                className="flex items-center justify-center w-full h-full bg-blue-200 text-blue-800 font-bold"
              >
                <FaRegFileAlt className="h-10 w-10" />
              </div>
            );
          })
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gray-700">
            <FaRegFileAlt className="h-10 w-10 text-gray-400" />
          </div>
        )}
      </div>

      {/* Description & Download */}
      <div className="p-2 bg-zinc-900 flex flex-col gap-1">
        <p className="text-sm text-white font-medium truncate">
          {description || "Untitled"}
        </p>

        {file.length > 0 && (
          <>
            <p className="text-xs text-gray-400 truncate">
              {file[0] instanceof File ? file[0].name : file[0].split("/").pop()}
            </p>
            <a
              href={file[0] instanceof File ? URL.createObjectURL(file[0]) : file[0]}
              download={file[0] instanceof File ? file[0].name : undefined}
              className="mt-1 text-xs px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-center transition"
            >
              Download
            </a>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default Cards;
