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
          file.map((umm) => {
            const fileURL = URL.createObjectURL(umm);

            if (umm.type.startsWith("image/")) {
              return (
                <img
                  key={`${umm.name}-${umm.lastModified}`}
                  src={fileURL}
                  alt={umm.name}
                  className="w-full h-full object-cover"
                />
              );
            }

            if (umm.type === "application/pdf") {
              return (
                <div
                  key={`${umm.name}-${umm.lastModified}`}
                  className="flex items-center justify-center w-full h-full bg-red-200 text-red-800 font-bold"
                >
                  PDF
                </div>
              );
            }

            return (
              <div
                key={`${umm.name}-${umm.lastModified}`}
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
          <p className="text-xs text-gray-400 truncate">{file[0].name}</p>
        )}

        {/* Download button */}
        {file.length > 0 && (
          <a
            href={URL.createObjectURL(file[0])}
            download={file[0].name}
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
