import React from "react";
import { FaRegFileAlt } from "react-icons/fa";
import { motion } from "motion/react";

const Cards = ({ card, refrance }) => {
  const { description, file = [] } = card;

  return (
    <motion.div
      drag
      dragConstraints={refrance}
      className="w-[180px] h-[230px] bg-zinc-800 rounded-xl shadow-md border border-gray-700 overflow-hidden flex flex-col"
    >
      {/* File Preview */}
      <div className="flex-1 flex items-center justify-center bg-zinc-900">
        {file.length > 0 ? (
          file.map((f, idx) => {
            // Check if f is a string (static URL) or File object
            const fileURL = typeof f === "string" ? f : URL.createObjectURL(f);

            if (
              fileURL.endsWith(".jpg") ||
              fileURL.endsWith(".jpeg") ||
              fileURL.endsWith(".png") ||
              fileURL.endsWith(".gif")
            ) {
              return (
                <img
                  key={idx}
                  src={fileURL}
                  alt={description}
                  className="w-full h-full object-cover"
                />
              );
            }

            if (f.type === "application/pdf") {
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

      {/* File Info + Download Button */}
      <div className="p-2 bg-zinc-900 flex flex-col gap-1">
        <p className="text-sm text-white font-medium truncate">
          {description || "Untitled"}
        </p>
        {file.length > 0 && (
          <p className="text-xs text-gray-400 truncate">
            {typeof file[0] === "string"
              ? file[0].split("/").pop()
              : file[0].name}
          </p>
        )}
        {file.length > 0 && (
          <a
            href={
              typeof file[0] === "string"
                ? file[0]
                : URL.createObjectURL(file[0])
            }
            download={
              typeof file[0] === "string"
                ? file[0].split("/").pop()
                : file[0].name
            }
            className="mt-1 text-xs px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-center transition"
          >
            Download
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default Cards;
