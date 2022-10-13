import { useContext } from "react";
// context
import SoccerContext from "../../contexts/SoccerContext";

const LeagueBtn = ({ text, fetchKey }) => {
  // context
  const { getLeagueInfo } = useContext(SoccerContext);

  //handleClick
  const handleClick = () => {
    getLeagueInfo(fetchKey);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-neutral-700 w-full transparent px-4 py-2 mb-1 flex items-center justify-left capitalize text-white relative cursor-pointer before:content-[' '] before:absolute before:left-0 before:bottom-0 before:w-full before:h-full before:border-y-2 before:border-blue-400 before:scale-x-0 before:transition-transform before:duration-[500ms] hover:before:scale-x-100 hover:before:cursor-pointer"
    >
      {/* League logo */}
      <img
        src={`/flags/${text}.png`}
        alt="logo"
        className="w-[25px] h-[15px]"
      />
      <p className="ml-2 text-xl">{text}</p>
    </div>
  );
};

export default LeagueBtn;
