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
    <div className="w-full mb-4">
      {/* Title */}
      <div
        onClick={handleShowTicket}
        className={`w-full px-4 py-2 ${
          showTicket ? "bg-blue-600" : "bg-blue-500"
        }  flex items-center justify-between text-white cursor-pointer hover:bg-blue-600 transition-colors duration-[400ms] `}
      >
        <h1 className="w-[90%]">Ticket ID: {id}</h1>
        {showTicket ? (
          <FaAngleUp className="text-xl" />
        ) : (
          <FaAngleDown className="text-xl" />
        )}
      </div>
      {/* Body */}
      {showTicket && (
        <div className="w-full ">
          <div className="w-full py-2 bg-slate-200 ">
            <div
              className={`hidden w-full border-b-[1px] pb-2 border-neutral-300 md:flex flex-col px-2 items-center justify-between md:flex-row`}
            >
              <h1 className="w-full text-sm text-left md:w-[30%] lg:w-[15%]">
                Date
              </h1>
              <div className="w-full flex items-center justify-between md:w-[70%] lg:w-[80%]">
                {/* Home & Away team */}
                <div className="w-[65%] hidden lg:flex flex-col items-center justify-between text-sm lg:flex-row lg:w-[80%]">
                  <h1 className="w-full">Home team</h1>
                  <h1 className="w-full">Away team</h1>
                </div>
                <h1 className="w-[65%] text-sm lg:hidden">Teams</h1>
                <div className="w-[35%] text-sm flex items-center justify-between lg:w-[20%]">
                  <h1>Game</h1>
                  <h1 className="mr-2">Odd</h1>
                </div>
              </div>
            </div>
            {matches.map((match, index) => (
              <div
                key={index}
                className={`w-full px-2 py-1 ${
                  index === matches.length - 1 && "mb-0"
                } mb-2 flex flex-col items-center justify-between md:flex-row`}
              >
                {/* Date - commence time */}
                <h1 className="w-full mb-1 text-sm text-center md:w-[30%] md:text-left lg:w-[15%]">
                  {match.commence_time.toString().slice(0, 10)}
                </h1>
                {/* Other */}
                <div className="w-full flex items-center justify-between md:w-[70%] lg:w-[80%]">
                  {/* Home & Away team */}
                  <div className="w-[65%] flex flex-col items-center justify-between text-sm lg:flex-row lg:w-[80%]">
                    <h1 className="w-full">{match.home_team}</h1>
                    <h1 className="w-full">{match.away_team}</h1>
                  </div>
                  {/* Odd and game */}
                  <div className="w-[35%] flex items-center justify-between lg:w-[20%]">
                    <h1 className="w-[40px] h-[30px] p-[5px] text-[10px] bg-blue-400 text-white flex items-center justify-center">
                      {match.game}
                    </h1>
                    <h1 className="w-[40px] h-[30px] p-[5px] text-[10px] bg-zinc-600 text-white flex items-center justify-center">
                      {match.oddValue}
                    </h1>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full bg-blue-200 px-4 py-2 text-zinc-800 font-bold">
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
