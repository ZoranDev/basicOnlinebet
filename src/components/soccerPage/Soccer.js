// components
import AvailableLeagues from "./AvailableLeagues";
import Matches from "./Matches";
import MyTicket from "./MyTicket";

const Soccer = () => {
  return (
    <div className="w-full p-2 flex justify-between items-baseline">
      <AvailableLeagues />
      <Matches />
      <MyTicket />
    </div>
  );
};

export default Soccer;
