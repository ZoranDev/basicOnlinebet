// react
import { useState } from "react";
// components
import AccountDetails from "./myProfile/AccountDetails";
import ChangePassword from "./myProfile/ChangePassword";
import Payment from "./myProfile/Payment";
import MyTicktes from "./myProfile/MyTicktes";

const MyProfile = () => {
  // state for displaying info
  const [displayItem, setDisplayItem] = useState("accountDetails");

  // changeDisplayItem
  const changeDisplayItem = (e) => {
    setDisplayItem(e.target.id);
  };

  return (
    <div className="w-[80%] mx-auto my-10 p-10 border-2 border-white flex items-start">
      <div className="w-[30%]">
        <h1 className="w-full bg-zinc-700 px-3 py-2 text-white">
          Profile settings
        </h1>
        {[
          { id: "accountDetails", title: "Account details" },
          { id: "changePassword", title: "Change password" },
          { id: "myTickets", title: "My Tickets" },
          { id: "payment", title: "Payment" },
        ].map((item, index) => (
          <h2
            className={`w-full ${
              displayItem === item.id ? "bg-blue-400 px-5" : "bg-zinc-500"
            } px-3 py-2 text-white cursor-pointer hover:bg-blue-400 hover:px-5 transition-[padding] duration-[300ms]`}
            key={index}
            id={item.id}
            onClick={changeDisplayItem}
          >
            {item.title}
          </h2>
        ))}
      </div>
      <div className="w-[70%] min-h-[300px] p-5 px-10 bg-zinc-400">
        {displayItem === "accountDetails" && <AccountDetails />}
        {displayItem === "changePassword" && <ChangePassword />}
        {displayItem === "myTickets" && <MyTicktes />}
        {displayItem === "payment" && <Payment />}
      </div>
    </div>
  );
};

export default MyProfile;
