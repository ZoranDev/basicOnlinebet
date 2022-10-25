// react
import { useState, useEffect, useContext } from "react";
// components
import ChangePasswordInput from "./ChangePasswordInput";
import ErrorSuccess from "../ErrorSuccess";
// context
import MainContext from "../../contexts/MainContext";
// icons
import { FaLock } from "react-icons/fa";

const ChangePassword = () => {
  // context
  const {
    activeUser: { password },
    changePassword,
  } = useContext(MainContext);

  // state for input fields
  const [inputData, setInputData] = useState({
    oldPassword: "",
    newPassword: "",
    repeatNewPassword: "",
  });
  // state for okData
  const [okData, setOkData] = useState({
    old: null,
    new: null,
    newRepeat: null,
  });
  // state for error - new password same as old password
  const [error, setError] = useState({
    active: false,
    message: "",
    type: "",
  });

  // if data  === '' its value is null and border has default color, if value is false border is red otherwise is green
  useEffect(() => {
    setOkData({
      old:
        inputData.oldPassword === ""
          ? null
          : inputData.oldPassword === password
          ? true
          : false,
      new: inputData.newPassword === "" ? null : true,
      newRepeat:
        inputData.repeatNewPassword === ""
          ? null
          : inputData.repeatNewPassword === inputData.newPassword
          ? true
          : false,
    });
  }, [inputData]);

  // fillInputData
  const fillInputData = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  // resetState
  const resetState = () => {
    setInputData({
      oldPassword: "",
      newPassword: "",
      repeatNewPassword: "",
    });
    // remove success message
    setTimeout(() => {
      setError({ active: false, message: "", type: "error" });
    }, 3000);
  };

  // handleChangePasswordClick
  const handleChangePasswordClick = () => {
    if (okData.old && okData.new && okData.newRepeat) {
      setError({
        active: true,
        message:
          password === inputData.newPassword
            ? "New password same as old!"
            : "Password changed!",
        type: password === inputData.newPassword ? "error" : "success",
      });
      if (password === inputData.newPassword) {
        return;
      }
      resetState();
      changePassword(inputData.newPassword);
    }
  };

  return (
    <div className="w-[280px]">
      {[
        { id: "oldPassword", text: "Old password" },
        { id: "newPassword", text: "New password" },
        { id: "repeatNewPassword", text: "Repeat new password" },
      ].map((item, index) => (
        <ChangePasswordInput
          key={index}
          id={item.id}
          text={item.text}
          fillInputData={fillInputData}
          value={
            item.id === "oldPassword"
              ? inputData.oldPassword
              : item.id === "newPassword"
              ? inputData.newPassword
              : inputData.repeatNewPassword
          }
          okData={
            item.id === "oldPassword"
              ? okData.old
              : item.id === "newPassword"
              ? okData.new
              : okData.newRepeat
          }
        />
      ))}

      {/* Change btn */}
      <button
        onClick={handleChangePasswordClick}
        className={`w-[280px] py-2 px-2 my-4 ${
          okData.old && okData.new && okData.newRepeat
            ? "bg-blue-400 text-white cursor-pointer hover:bg-blue-500"
            : "bg-zinc-300 text-zinc-400 cursor-not-allowed"
        } transform-colors duration-[300ms] flex items-center justify-center rounded`}
      >
        <FaLock className="text-lg mr-2" />
        Change password
      </button>

      {/* Error */}
      {error.active && (
        <ErrorSuccess message={error.message} type={error.type} />
      )}
    </div>
  );
};

export default ChangePassword;
