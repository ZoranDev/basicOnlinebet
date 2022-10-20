// react
import { useContext } from "react";
// context
import SoccerContext from "../../contexts/SoccerContext";

const Odd = ({ oddValue, game, id }) => {
  // context
  const { addToTicket } = useContext(SoccerContext);

  // onClick
  const onClick = () => {
    addToTicket(game, oddValue, id);
  };

  return (
    <button
      onClick={onClick}
      className="w-[32%] h-full bg-neutral-600 flex items-center justify-center cursor-pointer hover:bg-neutral-400"
    >
      {oddValue}
    </button>
  );
};

export default Odd;
