import React from "react";
import ForeBackGround from "./ForeBackGround";

const BackGround = () => {
  return (
    <div className="relative h-screen w-full bg-zinc-900">
      <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2">
        <h1 className="text-9xl tracking-tight font-bold text-white">DOCS</h1>
      </div>
      <ForeBackGround />
    </div>
  );
};

export default BackGround;
