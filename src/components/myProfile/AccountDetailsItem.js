// react
import { useState, useContext, useEffect } from "react";
// context
import UsersContext from "../../contexts/UsersContext";
// components
import ErrorSuccess from "../ErrorSuccess";
// icons
import { AiFillEdit } from "react-icons/ai";
import { FaCheck, FaExclamationTriangle } from "react-icons/fa";

// Check if value has some character
let hasChar = /[a-zA-Z]/g;
let hasNumber = /\d/;

const AccountDetailsItem = ({ id, title, text }) => {
  // context
  const { updateUserProp } = useContext(UsersContext);

  // state for component info
  const [info, setInfo] = useState(text);
  // state for disabled
  const [disabled, setDisabled] = useState(true);
  // state for error in info
  const [errorInInfo, setErrorInInfo] = useState(false);
  // state for show success message - show message after one item is updated
  const [showSuccessMessage, setShowSuccessMessage] = useState({
    active: false,
    message: "",
  });

  // enableEdit
  const enableEdit = () => {
    setDisabled(false);
  };

  useEffect(() => {
    if (!disabled) {
      document.querySelector(`#${id}`).disabled = false;
      document.querySelector(`#${id}`).focus();
    } else {
      document.querySelector(`#${id}`).disabled = true;
    }
  }, [disabled]);

  // handleOnChange
  const handleOnChange = (e) => {
    let value = e.target.value;
    setInfo(e.target.value);
    // check to see if info contains error (if user name contains number or phone contains character)
    setErrorInInfo(
      (id === "userName" && hasNumber.test(value)) ||
        (id === "phone" && hasChar.test(value))
        ? true
        : false
    );
  };

  // submitChanges
  const submitChanges = () => {
    if (!errorInInfo) {
      // upd info
      updateUserProp(id, info);
      // make it disabled again
      setDisabled(true);
      // show success message
      setShowSuccessMessage({
        active: true,
        message: `Account ${title} updated!`,
      });
      // after 3 sec remove success message
      removeSuccessMessage();
    }
  };

  // remove success message
  const removeSuccessMessage = () => {
    setTimeout(() => {
      setShowSuccessMessage({ active: false, message: "" });
    }, 3000);
  };

  return (
    <div className="w-[full] mb-4 sm:w-[280px]">
      <h1 className="w-full mb-2 text-lg text-neutral-700">{title}</h1>
      <div className="w-[90%] relative">
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
              onClick={enableEdit}
              className="absolute -right-7 top-2/4 -translate-y-2/4 text-2xl cursor-pointer text-zinc-600 hover:text-blue-600 transition duration-[300ms] hover:scale-[1.2]"
            />
          ) : (
            <FaCheck
              onClick={submitChanges}
              className="absolute -right-7 top-2/4 -translate-y-2/4 text-2xl cursor-pointer text-zinc-600 hover:text-blue-600 transition duration-[300ms] hover:scale-[1.2]"
            />
          ))}
      </div>
      {errorInInfo && (
        <div className="flex items-center justify-left text-red-500">
          <FaExclamationTriangle className="mr-2" /> Error in {title}
        </div>
      )}
      {/* Show success after updated */}
      {showSuccessMessage.active && (
        <ErrorSuccess message={showSuccessMessage.message} type={"success"} />
      )}
    </div>
  );
};

export default AccountDetailsItem;
