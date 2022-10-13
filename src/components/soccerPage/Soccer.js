// react

// context
import { SoccerContextProvider } from "../../contexts/SoccerContext";
// components
import AvailableLeagues from "./AvailableLeagues";
import Matches from "./Matches";
import MyTicket from "./MyTicket";

const Soccer = () => {
  return (
    <div className="w-full p-2 flex justify-between items-baseline">
      <SoccerContextProvider>
        <AvailableLeagues />
        <Matches />
        <MyTicket />
      </SoccerContextProvider>
    </div>
  );
};

export default Soccer;
