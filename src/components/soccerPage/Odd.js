import React from "react";

const Odd = ({ oddValue }) => {
  return (
    <button className="w-[32%] h-full bg-neutral-600 flex items-center justify-center cursor-pointer hover:bg-neutral-400">
      {oddValue}
    </button>
  );
};

export default Odd;
