// react
import { useState } from "react";
// icons
import { FaAngleUp, FaAngleDown } from "react-icons/fa";

const SingleTicket = ({
  ticket: {
    id,
    body: { coeff, stake, makings, matches },
  },
}) => {
  // State for show ticket
  const [showTicket, setShowTicket] = useState(false);

  // handleShowTicket
  const handleShowTicket = () => {
    setShowTicket(!showTicket);
  };

  return (
    <div>
      {/* Title */}
      <div
        onClick={handleShowTicket}
        className={`w-full px-4 py-2 ${
          showTicket ? "bg-blue-600" : "bg-blue-500"
        }  flex items-center justify-between text-white cursor-pointer hover:bg-blue-600 transition-colors duration-[400ms] `}
      >
        <h1>Ticket ID: {id}</h1>
        {showTicket ? (
          <FaAngleUp className="text-xl" />
        ) : (
          <FaAngleDown className="text-xl" />
        )}
      </div>
      {/* Body */}
      {showTicket && (
        <div className="w-full bg-slate-200">
          <div className="w-full px-4 py-1 mb-2 border-b-[1px] border-zinc-300 flex items-center justify-between text-sm italic">
            <div className="w-[60%] flex items-center justify-between">
              <h1 className="w-2-4">Home team</h1>
              <h1 className="w-2/4">Away team</h1>
            </div>
            <h1>Game</h1>
            <h1>Odd</h1>
          </div>
          {matches.map((match, index) => (
            <div
              key={index}
              className="w-full px-4 py-1 mb-2 flex items-center justify-between"
            >
              <div className="w-[70%] flex items-center justify-between">
                <h1 className="w-[26%]">
                  {match.commence_time.toString().slice(0, 10)}
                </h1>
                <h1 className="w-[26%]">{match.home_team}</h1>
                <h1 className="w-[26%]">{match.away_team}</h1>
              </div>

              <h1 className="w-[40px] h-[30px] p-[5px] text-[10px] bg-blue-400 text-white flex items-center justify-center">
                {match.game}
              </h1>
              <h1 className="w-[40px] h-[30px] p-[5px] text-[10px] bg-zinc-600 text-white flex items-center justify-center">
                {match.oddValue}
              </h1>
            </div>
          ))}

          <div className="bg-blue-200 px-4 py-2 text-zinc-800 font-bold">
            {["coeff", "stake", "makings"].map((item, index) => (
              <div
                key={index}
                className="w-full mb-2 flex items-center justify-between"
              >
                <p className="text-md">
                  {item === "coeff"
                    ? "Total coefficient:"
                    : item === "stake"
                    ? "Stake:"
                    : "Total makings"}
                </p>
                <p className="text-md">
                  {item === "coeff"
                    ? `${parseFloat(coeff).toFixed(2)} €`
                    : item === "stake"
                    ? `${stake} €`
                    : `${parseFloat(makings).toFixed(2)} €`}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleTicket;
