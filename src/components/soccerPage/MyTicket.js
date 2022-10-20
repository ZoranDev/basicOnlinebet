// react
import { useContext, useState, useEffect } from "react";
// context
import SoccerContext from "../../contexts/SoccerContext";
// components
import MatchOnTicket from "./MatchOnTicket";
import Error from "../Error";

const MyTicket = () => {
  // context
  const {
    myTicket: { matches, coeff, makings, stake },
    setStake,
    payTicket,
  } = useContext(SoccerContext);

  // state for ok stake
  const [okStake, setOkStake] = useState(true);

  useEffect(() => {
    isStakeOk();
  }, [stake]);

  const isStakeOk = () => {
    setOkStake(stake < 1 || stake > 500 || stake === "" ? false : true);
  };

  // handleClick
  const handleClick = () => {
    if (matches.length !== 0 && okStake) {
      alert("success");
      payTicket();
    }
  };

  return (
    <div className="w-[20%] bg-neutral-400 rounded-tl-md rounded-tr-md overflow-hidden flex flex-col justify-center">
      {/* Title */}
      <h1 className="w-full px-4 py-2 bg-blue-500 text-white border-b-[1px] border-b-white">
        My Ticket
      </h1>

      {/* Played matches */}
      <div className="p-2">
        {matches.length === 0 ? (
          <div className="w-full text-center text-white">
            Nothing on ticket yet
          </div>
        ) : (
          matches.map((match, index) => (
            <MatchOnTicket key={index} info={match} />
          ))
        )}
      </div>

      {/* Stake, coeff, makings, payBtn and more */}
      <div className="w-full px-2 flex flex-col justify-center items-center">
        {/* Stake */}
        <div
          className={`w-full h-[40px] bg-white mb-2 flex items-center justify-center border-[3px] ${
            okStake ? "border-white" : "border-red-500"
          }`}
        >
          <input
            type="number"
            value={stake}
            onChange={setStake}
            min={1}
            max={500}
            placeholder="Stake"
            className="w-[80%] h-full p-2 focus:outline-0"
          />
          <h1 className="w-[20%] h-full p-2 flex items-center justify-center bg-blue-400 text-white">
            €
          </h1>
        </div>
        {/* Coeff */}
        <div className="w-full mb-2 flex items-center justify-between text-white">
          <h1>Coefficient:</h1>
          <h1>{parseFloat(coeff).toFixed(2)}</h1>
        </div>
        {/* Makings */}
        <div className="w-full mb-2 flex items-center justify-between text-white">
          <h1>Makings:</h1>
          <h1>{parseFloat(makings).toFixed(2)}</h1>
        </div>
        {/* Pay btn */}
        <button
          onClick={handleClick}
          className={`w-[100px] my-2 ${
            okStake && matches.length !== 0
              ? "bg-blue-400"
              : "bg-neutral-300 cursor-not-allowed"
          }  py-2 text-white rounded-lg`}
        >
          PAY
        </button>

        {/* Additional */}
        <div className="w-full mb-2 text-white text-md">
          <p>* Min stake 1€ max 500€</p>
          <div className="w-full flex items-center justify-between">
            <label htmlFor="deleteAfterPay">Delete after pay</label>
            <input
              type="checkbox"
              name="deleteAfterPay"
              id="deleteAfterPay"
              className="w-[20px] h-[20px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTicket;
