// react
import { useContext } from "react";
// router dom
import { Link } from "react-router-dom";
// context
import UsersContext from "../../contexts/UsersContext";
// components
import SingleTicket from "./SingleTicket";

const MyTicktes = () => {
  // context
  const {
    activeUser: { tickets },
  } = useContext(UsersContext);

  return (
    <div>
      {tickets.length === 0 ? (
        <div>
          <h1>No tickets yet.</h1>
          <Link
            to="/"
            children={
              <button
                className={`w-[280px] py-2 px-2 my-4 bg-blue-400 text-white cursor-pointer hover:bg-blue-500 transform-colors duration-[300ms] flex items-center justify-center rounded`}
              >
                See what's on offer
              </button>
            }
          />
        </div>
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
