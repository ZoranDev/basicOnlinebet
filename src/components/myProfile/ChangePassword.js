// react
import { useState, useEffect, useContext } from "react";
// context
import UsersContext from "../../contexts/UsersContext";
// components
import ChangePasswordInput from "./ChangePasswordInput";
import ErrorSuccess from "../ErrorSuccess";
// icons
import { FaLock } from "react-icons/fa";

const ChangePassword = () => {
  // context
  const {
    activeUser: { password },
    updateUserProp,
  } = useContext(UsersContext);

  // state for input fields
  const [inputData, setInputData] = useState({
    oldPassword: "",
    newPassword: "",
    repeatNewPassword: "",
  });
  // state for okData - null if value is '', true if oldPassword === current password or new password === repeated password
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
    let oldPassword = inputData.oldPassword;
    let newPassword = inputData.newPassword;
    let repeatNewPassword = inputData.repeatNewPassword;
    setOkData({
      old: oldPassword === "" ? null : oldPassword === password ? true : false,
      new: newPassword === "" ? null : true,
      newRepeat:
        repeatNewPassword === ""
          ? null
          : repeatNewPassword === inputData.newPassword
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

  // updatePassword
  const updatePassword = (e) => {
    e.preventDefault();
    // if all data are ok then check if new password is same as old password
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
      // update password
      updateUserProp("password", inputData.newPassword);
      // reset state
      resetState();
    }
  };

  return (
    <form onSubmit={updatePassword} className="w-full sm:w-[280px]">
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
        type="submit"
        className={`w-full py-2 px-2 my-4 ${
          okData.old && okData.new && okData.newRepeat
            ? "bg-blue-400 text-white cursor-pointer hover:bg-blue-500"
            : "bg-zinc-300 text-zinc-400 cursor-not-allowed"
        } transform-colors duration-[300ms] flex items-center justify-center rounded sm:w-[280px]`}
      >
        <FaLock className="text-lg mr-2" />
        Change password
      </button>

      {/* Error */}
      {error.active && (
        <ErrorSuccess message={error.message} type={error.type} />
      )}
    </form>
  );
};

export default ChangePassword;
