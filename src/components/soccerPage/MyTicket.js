// react
import { useContext } from "react";
// context
import SoccerContext from "../../contexts/SoccerContext";
// components
import MatchOnTicket from "./MatchOnTicket";

const MyTicket = () => {
  // context
  const {
    myTicket: { matches, coeff, makings },
  } = useContext(SoccerContext);

  return (
    <div className="w-[20%] bg-neutral-400 rounded-tl-md rounded-tr-md overflow-hidden flex flex-col justify-center">
      {/* Title */}
      <h1 className="w-full px-4 py-2 bg-blue-500 text-white border-b-[1px] border-b-white">
        My Ticket
      </h1>

      {/* Played matches */}
      <div className="p-2">
        {matches.length === 0 ? (
          <div>Select game</div>
        ) : (
          matches.map((match, index) => (
            <MatchOnTicket key={index} info={match} />
          ))
        )}
      </div>

      {/* Stake, coeff, makings, payBtn and more */}
      <div className="w-full px-2 flex flex-col justify-center items-center">
        {/* Stake */}
        <div className="w-full h-[40px] mb-2 flex items-center justify-center">
          <input
            type="number"
            placeholder="Stake"
            className="w-[80%] h-full p-2 focus:outline-0"
          />
          <h1 className="w-[20%] h-full p-2 flex items-center justify-center bg-blue-400 text-white border-[2px] border-white">
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

        <button className="w-[100px] my-2 bg-blue-400 py-2 text-white rounded-lg">
          PAY
        </button>

        {/* Additional */}
        <div className="w-full mb-2 text-white text-md">
          <p>* Min stake is 1 €</p>
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
