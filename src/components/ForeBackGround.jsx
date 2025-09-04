import React, { useRef, useState } from "react";
import Cards from "./Cards";

const ForeBackGround = () => {
  const ref = useRef(null);
  const [description, setDescription] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [file, setFile] = useState([]);

  // Initialize with 3 permanent cards (static images)
  const [cardDetails, setCardDetails] = useState([
    { description: "Document 1", file: ["/file1.jpg"] },
    { description: "Document 2", file: ["/file2.jpg"] },
    { description: "Document 3", file: ["/file3.jpg"] },
  ]);

  const handleDescription = (val) => setDescription(val);

  const handleFile = (val) => {
    const filesArray = Array.from(val);
    setFile(filesArray); // store uploaded files
  };

  const addCardData = () => {
    if (!description && file.length === 0) return; // prevent empty cards

    setCardDetails((prev) => [...prev, { description, file: [...file] }]);

    // reset inputs
    setFile([]);
    setDescription("");
    setShowInput(false);
  };

  const createCard = () => setShowInput(true);

  return (
    <div
      ref={ref}
      className="absolute h-full w-full bg-transparent overflow-hidden"
    >
      <div className="flex w-full py-4 justify-between px-10">
        <h1 className="text-white text-xl">DRAG</h1>

        {/* + Button & Input */}
        <div className="relative flex items-center gap-4">
          {/* ADD new docs button */}
          <button
            onClick={createCard}
            className="text-white px-3 py-2 border-2 border-white rounded active:scale-110 duration-300"
          >
            ADD new docs
          </button>

          {/* Floating Input Box */}
          <div
            className={`absolute top-12 right-0 w-64 p-4 bg-zinc-800 text-white rounded shadow-lg transition-all duration-300 ${
              showInput
                ? "opacity-100 scale-100"
                : "opacity-0 scale-90 pointer-events-none"
            }`}
          >
            <input
              type="text"
              value={description}
              onChange={(e) => handleDescription(e.target.value)}
              className="border w-full p-2 rounded mb-5"
              placeholder="Enter description..."
            />
            <input
              multiple
              onChange={(e) => handleFile(e.target.files)}
              type="file"
              className="block w-full text-sm text-gray-600
                file:mr-4 file:py-2 file:px-4
                file:rounded file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100 mb-5"
            />
            <button
              onClick={addCardData}
              className="bg-white py-2 px-4 text-blue-600 font-bold rounded w-full"
            >
              ADD
            </button>
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <div className="p-5 flex gap-3 flex-wrap">
        {cardDetails.map((card, index) => (
          <Cards key={index} card={card} refrance={ref} />
        ))}
      </div>
    </div>
  );
};

export default ForeBackGround;
