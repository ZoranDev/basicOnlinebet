// react
import { useContext } from "react";
// context
import MainContext from "../contexts/MainContext";

const Button = ({ text }) => {
  // context
  const { handleShowNavbar } = useContext(MainContext);

  // handleClick
  const handleClick = () => {
    handleShowNavbar(false);
  };

  return (
    <button
      onClick={handleClick}
      className="w-[150px] py-1 bg-white text-lg text-black capitalize hover:shadow-[inset_152px_0_0_0_rgba(12,34,244,0.7)] hover:transition-shadow hover:duration-[700ms] hover:text-white transition-shadow duration-[700ms]"
    >
      {text}
    </button>
  );
};

export default Button;
