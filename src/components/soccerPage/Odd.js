// react
import { useContext, useState, useEffect } from "react";
// context
import SoccerContext from "../../contexts/SoccerContext";

const Odd = ({ info: { oddValue, id }, info }) => {
  // context
  const { addToTicket, myTicket } = useContext(SoccerContext);

  // onClick
  const onClick = () => {
    addToTicket(info);
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
      className={`w-[33.33%] h-full ${
        onTicket ? "bg-blue-400" : " hover:bg-blue-400"
      } flex items-center justify-center cursor-pointer `}
    >
      {oddValue}
    </button>
  );
};

export default Odd;
