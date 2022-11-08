// react
import { useState, useContext, useEffect } from "react";
// context
import UsersContext from "../contexts/UsersContext";
// router dom
import { Link, useLocation } from "react-router-dom";
// icons
import { FaUserCircle } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { BiUserCircle, BiLogOut } from "react-icons/bi";

const NavbarActiveUser = () => {
  // context
  const { activeUser, logOut } = useContext(UsersContext);

  // state for show money
  const [showMoney, setShowMoney] = useState(true);

  // state for show user menu - when click on user icon on the right side of navbar
  const [showUserMenu, setShowUserMenu] = useState(false);

  const location = useLocation();

  // when click on something close user menu
  useEffect(() => {
    setShowUserMenu(false);
  }, [location]);

  // handleShowMoney
  const handleShowMoney = () => {
    setShowMoney(!showMoney);
  };

  // handleShowUserMenu
  const handleShowUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  return (
    <div className="flex items-center h-[44px] ">
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
          <p>€</p>
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
        onClick={handleShowUserMenu}
        className="h-ful ml-4 flex items-center justify-center text-white hover:text-blue-500 hover:transition-colors hover:duration-[500ms]  cursor-pointer"
      >
        <FaUserCircle className="mr-2 text-2xl " />
        <p className="text-sm">{activeUser.userName}</p>
      </div>

      {/* User info */}

      {/*  -52px da bi bilo poravnato jer je na navbar padding py-2, 53 da bude malo spusteno za large screens*/}
      <div
        className={`w-full ${
          !showUserMenu ? "h-0" : "h-[100px]"
        } transition-[height] duration-[150ms] bg-zinc-800 absolute top-[108px] right-0 z-20 overflow-hidden sm:top-[53px] sm:w-[300px] sm:right-[-20px]`}
      >
        <Link
          to="/myProfile/accountDetails"
          children={
            <div className="w-full h-[50px] px-3  flex items-center justify-start text-white hover:bg-blue-500 hover:text-white hover:cursor-pointer  transition-colors duration-[200ms]">
              <BiUserCircle className="text-2xl mr-1" />
              <p className="text-lg">My proflie</p>
            </div>
          }
        />

        <div
          onClick={logOut}
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
