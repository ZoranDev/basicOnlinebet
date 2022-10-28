// react
import { useContext, useEffect, useState } from "react";
// context
import SoccerContext from "../../contexts/SoccerContext";
// icons
import { FaTrash } from "react-icons/fa";

const MatchOnTicket = ({
  info: { id, game, oddValue, commence_time, home_team, away_team },
}) => {
  // context
  const { matchesToShow, deleteFromTicket } = useContext(SoccerContext);

  // handleOnClick
  const handleOnClick = () => {
    deleteFromTicket(id);
  };

  return (
    <div className="w-full mb-1 p-2 border-[1px] border-blue-500 text-white">
      {/* Title */}
      <div className="w-full mb-1 border-b-[1px] border-b-white flex items-center justify-between">
        <h1>{commence_time.slice(0, 10)}</h1>
        <FaTrash
          onClick={handleOnClick}
          className="cursor-pointer hover:text-red-500 hover:transition-all hover:duration-[300ms] hover:scale-[1.2]"
        />
      </div>
      {/* Body */}
      <div className="w-full flex items-center justify-between">
        <div className="w-[60%] flex flex-col text-sm">
          <h1>{home_team}</h1>
          <h1>{away_team}</h1>
        </div>
        <div className="w-[70px] flex items-center justify-end text-sm">
          <h1 className="w-[40px] h-[30px] mr-1 bg-blue-400 text-white flex items-center justify-center">
            {game}
          </h1>
          <h1 className="w-[40px] h-[30px] bg-neutral-500 text-white flex items-center justify-center">
            {oddValue}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default MatchOnTicket;
