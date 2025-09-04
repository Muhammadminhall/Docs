import React, { useRef, useState } from "react";
import { motion } from "motion/react";
import Cards from "./Cards";
const ForeBackGround = () => {
  const ref = useRef(null);
  const [description, setDescription] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [file, setFile] = useState([]);

  const [cardDetails, setCardDetails] = useState([]);

  const handleDescription = (val) => {
    setDescription(val);
    console.log(val);
  };

  const handleFile = (val) => {
    const filesArray = Array.from(val);
    setFile((prev) => [...prev, ...filesArray]); // ✅ fix nested array
  };

  const addCardData = () => {
    setShowInput(false);

    setCardDetails((prev) => {
      const updated = [...prev, { description, file: [...file] }];
      localStorage.setItem("data", JSON.stringify(updated)); // save correct array
      return updated; // update state
    });

    setFile([]);
    setDescription("");

    console.log("description:", description, "files:", file);
  };

  const createCard = () => {
    setShowInput(true);
  };

  return (
    <div
      ref={ref}
      className="absolute h-full w-full bg-transparent overflow-hidden"
    >
      <div className="flex w-full py-4 justify-between px-10">
        <div>
          <h1 className="text-white text-xl">DOCS</h1>
        </div>

        {/* + Button & Input */}
        <div className="relative">
          <button
            onClick={createCard}
            className="absolute block text-white px-3 active:scale-110 duration-300 border-white border-2 rounded py-2  justify-center items-center"
          >
            +
          </button>

          {/* Floating Input Box */}
          <div
            className={`absolute top-12 right-0 w-64 p-4 bg-zinc-800 text-white rounded shadow-lg transition-all duration-300 ${
              showInput
                ? "opacity-100 scale-100"
                : "opacity-0 scale-90 pointer-events-none"
            }`}
          >
            <div className="mb-5"></div>
            <input
              type="text"
              value={description}
              onChange={(e) => handleDescription(e.target.value)}
              className="border w-full p-2 rounded mb-5"
              placeholder="Enter description..."
            />
            <input
              multiple // ✅ allow multiple files
              onChange={(e) => handleFile(e.target.files)}
              type="file"
              className="block w-full text-sm text-gray-600
               file:mr-4 file:py-2 file:px-4
               file:rounded file:border-0
               file:text-sm file:font-semibold
               file:bg-blue-50 file:text-blue-700
               hover:file:bg-blue-100"
            />
            <button
              onClick={addCardData}
              className="bg-white py-2 px-4 mt-5 text-blue-600 font-bold rounded "
            >
              ADD
            </button>
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <div className="p-5 flex gap-3">
        {cardDetails.map((card, index) => (
          <Cards key={index} card={card} refrance={ref} />
        ))}
      </div>
    </div>
  );
};

export default ForeBackGround;
