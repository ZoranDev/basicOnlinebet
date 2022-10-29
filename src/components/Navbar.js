// react
import { useContext } from "react";
// router
import { Link } from "react-router-dom";
// context
import MainContext from "../contexts/MainContext";
// components
import Button from "./Button";
import NavbarActiveUser from "./NavbarActiveUser";
// icons
import { FaBars, FaWindowClose } from "react-icons/fa";

const Navbar = () => {
  // context
  const { activeUser, showNavbar, handleShowNavbar } = useContext(MainContext);

  // handleClickOnSoccer - on small screens when user click to redirect to soccer nav remains open and we want it to be closed
  const handleClickOnSoccer = () => {
    window.innerWidth > 640 ? handleShowNavbar(true) : handleShowNavbar(false);
  };

  // handleBarsClick - to show navbar
  const handleBarsClick = () => {
    handleShowNavbar(true);
  };

  // handleCloseClick - to close navbar
  const handleCloseClick = () => {
    handleShowNavbar(false);
  };

  return (
    <div className="w-full h-[60px] px-5 py-2 bg-zinc-800 flex flex items-center justify-between relative z-20 ">
      {/* Logo */}
      <div className="text-white text-2xl  flex items-center justify-center cursor-pointer">
        <h1 className="font-bold text-blue-700 uppercase">Bet</h1>
        <h1 className="capitalize">Online</h1>
      </div>

      {/* Links & Login */}
      {showNavbar && (
        <div className="w-full py-3 flex flex-col bg-zinc-700 items-center justify-start absolute top-[60px] left-0 sm:w-[70%] sm:relative sm:top-0  sm:flex-row sm:py-0 sm:justify-between sm:bg-transparent sm:h-full lg:w-2/4">
          <Link
            to="/soccer"
            children={
              <h1
                onClick={handleClickOnSoccer}
                className="mb-3 text-xl text-white capitalize cursor-pointer hover:text-blue-700 hover:transition-colors hover:duration-[400ms] sm:mb-0"
              >
                Soccer
              </h1>
            }
          />

          {activeUser ? (
            <NavbarActiveUser />
          ) : (
            <Link to="/login" children={<Button text="log in" />} />
          )}
        </div>
      )}

      {/* Menu icon */}
      {!showNavbar ? (
        <FaBars
          onClick={handleBarsClick}
          className="text-2xl text-white cursor-pointer hover:text-blue-700 transition-colors duration-[300ms] sm:hidden"
        />
      ) : (
        <FaWindowClose
          onClick={handleCloseClick}
          className="text-2xl text-white cursor-pointer hover:text-blue-700 transition-colors duration-[300ms] sm:hidden"
        />
      )}
    </div>
  );
};

export default Navbar;
