// react
import { useState, useContext } from "react";
// context
import MainContext from "../../contexts/MainContext";
// components
import Error from "../Error";
// icons
import { AiFillEdit } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";

const AccountDetailsItem = ({ id, title, text }) => {
  // context
  const { updateUserPersonalDetails } = useContext(MainContext);

  // state for component info
  const [info, setInfo] = useState(text);
  // state for disabled
  const [disabled, setDisabled] = useState(true);
  // state for error
  const [error, setError] = useState({
    active: false,
    message: "",
    type: "error",
  });

  // handleEditInfo
  const handleEditInfo = (e) => {
    if (disabled) {
      document.querySelector(`#${id}`).disabled = false;
      document.querySelector(`#${id}`).focus();
    } else {
      document.querySelector(`#${id}`).disabled = true;
    }
    setDisabled(!disabled);
  };

  // handleOnChange
  const handleOnChange = (e) => {
    setInfo(e.target.value);
  };

  // handleSubmitChanges
  const handleSubmitChanges = () => {
    updateUserPersonalDetails(id, info);
    handleEditInfo();
    setError({
      active: true,
      message: `Account ${title} updated!`,
      type: "success",
    });
    removeError();
  };

  // remove error
  const removeError = () => {
    setTimeout(() => {
      setError({ active: false, message: "", type: "error" });
    }, 3000);
  };

  return (
    <div className="w-[280px] mb-4">
      <h1 className="w-full mb-2 text-lg">{title}</h1>
      <div className="w-full relative">
        <input
          type="text"
          id={id}
          value={info}
          onChange={handleOnChange}
          className={`w-full bg-zinc-200 text-zinc-500 py-2 px-4 focus:outline-0 border-[3px] ${
            disabled ? "border-zinc-400" : "border-orange-400"
          }`}
          disabled={true}
        />

        {id !== "email" &&
          (disabled ? (
            <AiFillEdit
              onClick={handleEditInfo}
              className="absolute -right-7 top-2/4 -translate-y-2/4 text-2xl cursor-pointer text-zinc-600 hover:text-blue-600 transition duration-[300ms] hover:scale-[1.2]"
            />
          ) : (
            <FaCheck
              onClick={handleSubmitChanges}
              className="absolute -right-7 top-2/4 -translate-y-2/4 text-2xl cursor-pointer text-zinc-600 hover:text-blue-600 transition duration-[300ms] hover:scale-[1.2]"
            />
          ))}
      </div>
      {/* Show success after updated */}
      {error.active && <Error message={error.message} type={error.type} />}
    </div>
  );
};

export default AccountDetailsItem;
