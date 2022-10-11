// react
import { useState, useEffect } from "react";
// components
import Button from "./Button";
// icons
import { FaBars, FaWindowClose } from "react-icons/fa";

const Navbar = () => {
  // State for show navbar
  const [showNavbar, setShowNavbar] = useState(false);

  //showHideNavbar
  const showHideNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  // show hide navbar based on screen width
  useEffect(() => {
    window.addEventListener("resize", () => {
      window.innerWidth > 640 ? setShowNavbar(true) : setShowNavbar(false);
    });
  });

  return (
    <div className="w-full h-[60px] px-5 py-2 bg-zinc-800 flex flex items-center justify-between relative">
      {/* Logo */}
      <div className="text-white text-2xl  flex items-center justify-center cursor-pointer">
        <h1 className="font-bold text-blue-700 uppercase">Bet</h1>
        <h1 className="capitalize">Online</h1>
      </div>

      {/* Links & Login */}
      {showNavbar && (
        <div className="w-full py-3 flex flex-col bg-zinc-500 items-center justify-start absolute top-[60px] left-0 sm:w-2/4 sm:relative sm:top-0  sm:flex-row sm:py-0 sm:justify-between sm:bg-transparent">
          <h1 className="mb-3 text-xl text-white capitalize cursor-pointer hover:text-blue-700 hover:transition-colors hover:duration-[400ms] sm:mb-0">
            Soccer
          </h1>
          <Button text="log in" />
        </div>
      )}

      {/* Menu icon */}
      {!showNavbar ? (
        <FaBars
          onClick={showHideNavbar}
          className="text-2xl text-white cursor-pointer hover:text-blue-700 transition-colors duration-[300ms] sm:hidden"
        />
      ) : (
        <FaWindowClose
          onClick={showHideNavbar}
          className="text-2xl text-white cursor-pointer hover:text-blue-700 transition-colors duration-[300ms] sm:hidden"
        />
      )}
    </div>
  );
};

export default Navbar;
