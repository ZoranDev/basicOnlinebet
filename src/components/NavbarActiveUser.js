// react
import { useState, useContext } from "react";
// context
import MainContext from "../contexts/MainContext";
// router dom
import { Link } from "react-router-dom";
// icons
import { FaUserCircle } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { BiUserCircle, BiLogOut } from "react-icons/bi";

const NavbarActiveUser = () => {
  // context
  const { activeUser, logOut } = useContext(MainContext);

  // state for show money
  const [showMoney, setShowMoney] = useState(true);

  // state for show user info
  const [showUserInfo, setShowUserInfo] = useState(false);

  // handleShowMoney
  const handleShowMoney = () => {
    setShowMoney(!showMoney);
  };

  // handleShowUserInfo
  const handleShowUserInfo = () => {
    setShowUserInfo(!showUserInfo);
  };

  // handleLogOut
  const handleLogOut = () => {
    handleShowUserInfo();
    logOut();
  };

  return (
    <div className="flex items-center h-full relative">
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
          <input
            className="w-[50px] text-center"
            type={showMoney ? "text" : "password"}
            value={activeUser.money}
            disabled={true}
          />
          <p className="">€</p>
        </div>
        {/* Pay in */}
        <Link
          className="h-full bg-blue-500 px-3 text-white hover:bg-blue-400 flex"
          to="/myProfile/payment"
          children={<button>+ Pay In</button>}
        />
      </div>
      {/* My proflie */}

      <div
        onClick={handleShowUserInfo}
        className="h-ful ml-4 flex items-center justify-center text-white hover:text-blue-500 hover:transition-colors hover:duration-[500ms]  cursor-pointer"
      >
        <FaUserCircle className="mr-2 text-2xl " />
        <p className="text-sm">{activeUser.userName}</p>
      </div>

      {/* User info */}

      {/*  -52px da bi bilo poravnato jer je na navbar padding py-2, 53 da bude malo spusteno */}
      <div
        className={`w-[300px] ${
          !showUserInfo ? "h-0" : "h-[100px]"
        } transition-[height] duration-[300ms] bg-zinc-800 absolute top-[53px] -right-[20px] z-20 overflow-hidden`}
      >
        <Link
          to="/myProfile/accountDetails"
          children={
            <div
              onClick={handleShowUserInfo}
              className="w-full h-[50px] px-3  flex items-center justify-start text-white hover:bg-blue-500 hover:text-white hover:cursor-pointer  transition-colors duration-[200ms]"
            >
              <BiUserCircle className="text-2xl mr-1" />
              <p className="text-lg">My proflie</p>
            </div>
          }
        />

        <div
          onClick={handleLogOut}
          className="w-full h-[50px] px-3 flex items-center justify-start text-white hover:bg-blue-500 hover:text-white hover:cursor-pointer  transition-colors duration-[200ms]"
        >
          <BiLogOut className="text-2xl mr-1" />
          <p className="text-lg">Logout</p>
        </div>
      </div>
    </div>
  );
};

export default NavbarActiveUser;
