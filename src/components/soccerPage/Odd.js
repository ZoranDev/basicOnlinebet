// react
import { useContext, useState, useEffect } from "react";
// context
import SoccerContext from "../../contexts/SoccerContext";

const Odd = ({ oddValue, game, id, away_team, home_team }) => {
  // context
  const { addToTicket, myTicket } = useContext(SoccerContext);

  // onClick
  const onClick = () => {
    addToTicket(game, oddValue, id, away_team, home_team);
  };

  // onTicket?
  const [onTicket, setOnTicket] = useState(false);

  useEffect(() => {
    isOnTicket();
  }, [myTicket]);

  // isOnTicket
  const isOnTicket = () => {
    let onTicket = false;
    myTicket.matches.forEach((match) => {
      if (match.id === id && match.oddValue === oddValue) {
        onTicket = true;
      }
    });
    setOnTicket(onTicket);
  };

  return (
    <button
      onClick={onClick}
      className={`w-[32%] h-full ${
        onTicket ? "bg-yellow-600" : "bg-neutral-600 hover:bg-neutral-400"
      } flex items-center justify-center cursor-pointer `}
    >
      {oddValue}
    </button>
  );
};

export default Odd;
