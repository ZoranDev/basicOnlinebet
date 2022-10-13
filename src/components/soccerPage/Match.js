import React from "react";
// components
import Odd from "./Odd";

const Match = ({ info: { away_team, home_team, bookmakers } }) => {
  return (
    <div className="w-full h-[55px] bg-neutral-500 mb-[2px] px-5 py-2 flex items-center justify-between">
      {/* Teams */}
      <div className="w-[60%] flex flex-col items-center justify-between">
        <h1 className="w-full">{home_team}</h1>
        <h1 className="w-full">{away_team} </h1>
      </div>
      {/* Odds */}
      <div className="w-[30%] h-full flex items-center justify-between">
        <Odd oddValue={bookmakers[0].markets[0].outcomes[0].price} />
        <Odd oddValue={bookmakers[0].markets[0].outcomes[2].price} />
        <Odd oddValue={bookmakers[0].markets[0].outcomes[1].price} />
      </div>
    </div>
  );
};

export default Match;
