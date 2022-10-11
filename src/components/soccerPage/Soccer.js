// react

// context
import { SoccerContextProvider } from "../../contexts/SoccerContext";
// components
import AvailableLeagues from "./AvailableLeagues";

const Soccer = () => {
  return (
    <div className="w-[280px] p-2">
      <SoccerContextProvider>
        <AvailableLeagues />
      </SoccerContextProvider>
    </div>
  );
};

export default Soccer;
