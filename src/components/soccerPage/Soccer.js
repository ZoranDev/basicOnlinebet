// react
import { useState, useEffect } from "react";
// components
import AvailableLeagues from "./AvailableLeagues";
import Matches from "./Matches";
import MyTicket from "./MyTicket";
// icons
import { TiDocumentText } from "react-icons/ti";

const Soccer = () => {
  // state for show my ticket
  const [showMyTicket, setShowMyTicket] = useState(true);

  // handleShowMyTicket
  const handleShowMyTicket = () => {
    setShowMyTicket(!showMyTicket);
  };

  // show hide myTicket based on screen width
  window.addEventListener("resize", () => {
    window.innerWidth > 1024 ? setShowMyTicket(true) : setShowMyTicket(false);
  });

  useEffect(() => {
    window.innerWidth > 640 ? setShowMyTicket(true) : setShowMyTicket(false);
  }, []);

  return (
    <div className="w-full p-2 flex flex-col justify-between items-center relative overflow-hidden sm:flex-row sm:items-baseline">
      <AvailableLeagues />
      <Matches />
      <MyTicket
        showMyTicket={showMyTicket}
        handleShowMyTicket={handleShowMyTicket}
      />
      {!showMyTicket && (
        <TiDocumentText
          onClick={handleShowMyTicket}
          className="w-[30px] h-[30px] text-blue-500 active:scale-[0.90] hover:text-neutral-200 absolute right-0 top-14 cursor-pointer transition-colors duration-[300ms] lg:hidden"
        />
      )}
    </div>
  );
};

export default Soccer;
