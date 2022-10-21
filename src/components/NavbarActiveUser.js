// react
import { useState } from "react";
// icons
import { FaUserCircle } from "react-icons/fa";
// icons
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const NavbarActiveUser = () => {
  // state for show money
  const [showMoney, setShowMoney] = useState(true);

  // handleShowMoney
  const handleShowMoney = () => {
    setShowMoney(!showMoney);
  };

  return (
    <div className="flex items-center h-full">
      {/* Available money and pay btn */}
      <div className="h-full flex items-center overflow-hidden rounded-[25px]">
        {/* Money */}
        <div className="w-[120px] h-full px-3 bg-white flex items-center justify-between">
          {showMoney ? (
            <AiFillEye onClick={handleShowMoney} className="cursor-pointer" />
          ) : (
            <AiFillEyeInvisible
              onClick={handleShowMoney}
              className="cursor-pointer"
            />
          )}
          <p>5</p>
          <p className="">€</p>
        </div>
        {/* Pay in */}
        <button className="h-full bg-blue-500 px-3 text-white hover:bg-blue-400">
          + Pay In
        </button>
      </div>
      {/* My proflie */}
      <FaUserCircle className="ml-4 text-3xl text-white cursor-pointer hover:text-blue-500 hover:transition-colors hover:duration-[500ms]" />
    </div>
  );
};

export default NavbarActiveUser;
