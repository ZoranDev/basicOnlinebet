// react
import { useContext } from "react";
// context
import MainContext from "../../contexts/MainContext";
// components
import SingleTicket from "./SingleTicket";

const MyTicktes = () => {
  // context
  const {
    activeUser: { tickets },
  } = useContext(MainContext);

  return (
    <div>
      {tickets.length === 0 ? (
        <div>No tickets yet</div>
      ) : (
        <div>
          {tickets.map((ticket, index) => (
            <SingleTicket key={index} ticket={ticket} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTicktes;
