// react
import { useContext, useState, useEffect } from "react";
// router
import { Link, useLocation } from "react-router-dom";
// context
import MainContext from "../contexts/MainContext";
// components
import NavbarActiveUser from "./NavbarActiveUser";
// icons
import { FaBars, FaWindowClose } from "react-icons/fa";

const Navbar = () => {
  // context
  const { activeUser } = useContext(MainContext);

  // state for showNavbar
  const [showNavbar, setShowNavbar] = useState(true);

  const location = useLocation();

  // on small screens when location is changed then close navbar!
  useEffect(() => {
    setShowNavbar(false);
  }, [location]);

  // iconClick
  const iconClick = () => {
    setShowNavbar(!showNavbar);
  };

  return (
    <div className="w-full h-[60px] px-5 py-2 bg-zinc-800 flex flex items-center justify-between relative z-20 ">
      {/* Logo */}
      <div className="text-white text-2xl  flex items-center justify-center cursor-pointer">
        <h1 className="font-bold text-blue-700 uppercase">Bet</h1>
        <h1 className="capitalize">Online</h1>
      </div>

      {/* Links & Login */}

      <div
        className={`${
          !showNavbar ? "h-0 overflow-hidden" : "h-[110px]"
        } w-full flex flex-col bg-zinc-700 items-center justify-start absolute top-[60px] left-0 transition-[height] duration-[100ms] sm:overflow-visible sm:h-auto sm:w-[70%] sm:relative sm:top-0  sm:flex-row sm:py-0 sm:justify-between sm:bg-transparent sm:h-full lg:w-2/4`}
      >
        <Link
          to="/"
          children={
            <h1 className="mb-3 pt-3 text-xl text-white capitalize cursor-pointer hover:text-blue-700 hover:transition-colors hover:duration-[400ms] sm:mb-0 sm:pt-0">
              Soccer
            </h1>
          }
        />

        {activeUser ? (
          <NavbarActiveUser />
        ) : (
          <Link
            to="/login"
            children={
              <button className="w-[150px] py-1 bg-white text-lg text-black capitalize hover:shadow-[inset_152px_0_0_0_rgba(12,34,244,0.7)] hover:transition-shadow hover:duration-[700ms] hover:text-white transition-shadow duration-[700ms]">
                Log In
              </button>
            }
          />
        )}
      </div>

      {/* Menu icon */}
      {!showNavbar ? (
        <FaBars
          onClick={iconClick}
          className="text-2xl text-white cursor-pointer hover:text-blue-700 transition-colors duration-[300ms] sm:hidden"
        />
      ) : (
        <FaWindowClose
          onClick={iconClick}
          className="text-2xl text-white cursor-pointer hover:text-blue-700 transition-colors duration-[300ms] sm:hidden"
        />
      )}
    </div>
  );
};

export default Navbar;
