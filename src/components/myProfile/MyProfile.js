// react
import { useState, useEffect } from "react";
// router dom
import { Routes, Route, Link, useParams } from "react-router-dom";
// components
import AccountDetails from "./AccountDetails";
import ChangePassword from "./ChangePassword";
import Payment from "./Payment";
import MyTicktes from "./MyTicktes";
// icons
import { AiOutlineCloseCircle } from "react-icons/ai";

const MyProfile = () => {
  // state for active info
  const [activeInfo, setActiveInfo] = useState(null);

  const params = useParams();

  useEffect(() => {
    setActiveInfo(Object.values(params)[0]);
  }, [params]);

  return (
    <div className="w-[80%] mx-auto my-10 flex items-start relative">
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
          <Link
            key={index}
            to={`/myProfile/${item.id}`}
            children={
              <h2
                className={`w-full ${
                  activeInfo === item.id ? "bg-blue-400 px-5" : "bg-zinc-500"
                } px-3 py-2 text-white cursor-pointer hover:bg-blue-400 hover:px-5 transition-[padding] duration-[300ms]`}
              >
                {item.title}
              </h2>
            }
          />
        ))}
      </div>

      <div className="w-[70%] min-h-[300px] p-5 px-10 bg-zinc-400">
        <Routes>
          <Route path={`/accountDetails`} element={<AccountDetails />} />
          <Route path="/changePassword" element={<ChangePassword />} />
          <Route path="/myTickets" element={<MyTicktes />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </div>

      {/* Close my profile info */}
      <Link
        to="/soccer"
        children={
          <AiOutlineCloseCircle className="absolute right-2 top-2 text-2xl text-white hover:text-blue-500 transition-colors duration-[300ms] cursor-pointer" />
        }
      />
    </div>
  );
};

export default MyProfile;

/* ${
  
} */
