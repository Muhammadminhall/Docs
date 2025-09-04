import React, { useRef, useState, useEffect } from "react";
import Cards from "./Cards";

const ForeBackGround = () => {
  const ref = useRef(null);
  const [description, setDescription] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [file, setFile] = useState([]);

  // Initialize cardDetails from localStorage or default
  const [cardDetails, setCardDetails] = useState(() => {
    const saved = localStorage.getItem("cardDetails");
    if (saved) return JSON.parse(saved);
    return [
      { description: "Document 1", file: ["/file1.jpg"] },
      { description: "Document 2", file: ["/file2.jpg"] },
      { description: "Document 3", file: ["/file3.jpg"] },
    ];
  });

  // Save to localStorage whenever cardDetails changes
  useEffect(() => {
    localStorage.setItem("cardDetails", JSON.stringify(cardDetails));
  }, [cardDetails]);

  const handleDescription = (val) => setDescription(val);

  // Convert uploaded files to base64
  const handleFile = async (files) => {
    const filesArray = Array.from(files);
    const filePromises = filesArray.map(
      (file) =>
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target.result); // Base64 string
          reader.readAsDataURL(file);
        })
    );
    const base64Files = await Promise.all(filePromises);
    setFile(base64Files);
  };

  const addCardData = () => {
    if (!description && file.length === 0) return;
    setCardDetails((prev) => [...prev, { description, file: [...file] }]);
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

        <div className="relative flex items-center gap-4">
          <button
            onClick={createCard}
            className="text-white px-3 py-2 border-2 border-white rounded active:scale-110 duration-300"
          >
            ADD new docs
          </button>

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

      <div className="p-5 flex gap-3 flex-wrap">
        {cardDetails.map((card, index) => (
          <Cards key={index} card={card} refrance={ref} />
        ))}
      </div>
    </div>
  );
};

export default ForeBackGround;
