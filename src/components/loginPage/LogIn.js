// react
import { useState, useEffect, useContext } from "react";
// context
import MainContext from "../../contexts/MainContext";
// components
import ErrorSuccess from "../ErrorSuccess";
// icons
import {
  AiOutlineUser,
  AiOutlineMail,
  AiFillEye,
  AiFillEyeInvisible,
  AiOutlinePhone,
} from "react-icons/ai";

// Validate template strings if string has numbers, string has characters, and validate ok email address
let hasNumber = /\d/;
var hasChar = /[a-zA-Z]/g;
let validEmail =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const LogIn = () => {
  // context
  const { users, createNewuser, logUser } = useContext(MainContext);
  // state for log in or register
  const [logInRegister, setLogInRegister] = useState("login");
  // state for show password
  const [showPassword, setShowPassword] = useState(false);
  // state for input data
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
    userName: "",
    phone: "",
  });
  // state for error
  const [error, setError] = useState({ active: false, message: "" });

  useEffect(() => {
    isInputInfoOk()
      ? setError({ active: true, message: "Check form info" })
      : setError({ active: false, message: "" });
  }, [inputData, logInRegister]);

  // isInputInfoOk
  const isInputInfoOk = () => {
    let email = inputData.email;
    let userName = inputData.userName;
    let phone = inputData.phone;
    // if loginregister === login then only check mail otherwise check name and phone
    return logInRegister === "login"
      ? !validEmail.test(email) && email !== ""
      : (!validEmail.test(email) && email !== "") ||
          (hasNumber.test(userName) && userName !== "") ||
          (hasChar.test(phone) && phone !== "");
  };

  // handleClick
  const handleClick = (id) => {
    setLogInRegister(id);
  };

  // handleShowPassword
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // handleOnChange
  const handleOnChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  // haveInfo
  const haveInfo = () => {
    return logInRegister === "login"
      ? inputData.email !== "" && inputData.password !== ""
      : inputData.email !== "" &&
          inputData.password !== "" &&
          inputData.userName !== "" &&
          inputData.phone !== "";
  };

  // handleLogInRegister
  const handleLogInRegister = (e) => {
    e.preventDefault();
    // check to see if input data are in correct form and if there is input info at all, different condition for log in and register
    if (!error.active && haveInfo()) {
      /* Check to see if btn is log in or btn is register */
      logInRegister === "login"
        ? users.map((user) => user.email).indexOf(inputData.email) === -1 ||
          users.map((user) => user.password).indexOf(inputData.password) === -1
          ? setError({
              active: true,
              message: "User don't exist, check data or register.",
            })
          : logUser(inputData.email)
        : createNewuser(inputData);
    }
  };

  return (
    <div className="w-[315px] mx-auto my-[100px] p-5 bg-zinc-400 rounded-md relative flex flex-col items-center sm:w-[500px]">
      {/* User icon */}
      <div className="w-[120px] h-[120px] bg-zinc-500 rounded-full flex items-center justify-center absolute -top-[60px] left-2/4 -translate-x-2/4 shadow-[inset_0_0_50px_rgba(255,255,255,0.7)]">
        <AiOutlineUser className="text-white text-6xl" />
      </div>
      {/* LogIn || Register */}
      <div className="w-full mt-[60px] mb-6 flex flex-col items-center border-2 border-white bg-white sm:flex-row">
        {[
          { title: "Log In", id: "login" },
          { title: "Register", id: "register" },
        ].map((item, index) => (
          <h1
            key={index}
            onClick={() => handleClick(item.id)}
            className={`w-full py-2 ${
              logInRegister === item.id
                ? "bg-zinc-600 text-white"
                : "bg-white text-zinc-600"
            } text-center text-md cursor-pointer sm:w-2/4`}
          >
            {item.title}
          </h1>
        ))}
      </div>
      {/* Email */}
      <div className="w-full h-[40px] mb-3 flex items-center sm:w-[315px]">
        <AiOutlineMail
          className={"w-[50px] h-full px-3 bg-zinc-600 text-white"}
        />
        <input
          type="text"
          name="email"
          value={inputData.email}
          onChange={handleOnChange}
          placeholder="Email"
          className={`w-[90%] h-full px-3 py-1 text-xl focus:outline-0 sm:w-[265px] `}
        />
      </div>
      {/* Password */}
      <div className="w-full h-[40px] mb-3 flex items-center sm:w-[315px]">
        {showPassword ? (
          <AiFillEye
            onClick={handleShowPassword}
            className={
              "w-[50px] h-full px-3 bg-zinc-600 text-white cursor-pointer"
            }
          />
        ) : (
          <AiFillEyeInvisible
            onClick={handleShowPassword}
            className={
              "w-[50px] h-full px-3 bg-zinc-600 text-white cursor-pointer"
            }
          />
        )}
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={inputData.password}
          onChange={handleOnChange}
          placeholder="Password"
          className={`w-[90%] h-full px-3 py-1 text-xl focus:outline-0 sm:w-[265px] `}
        />
      </div>
      {logInRegister === "register" && (
        <>
          {/* User name */}
          <div className="w-full h-[40px] mb-3 flex items-center sm:w-[315px]">
            <AiOutlineUser
              className={"w-[50px] h-full px-3 bg-zinc-600 text-white"}
            />
            <input
              type="text"
              name="userName"
              value={inputData.userName}
              onChange={handleOnChange}
              placeholder="User name"
              className={`w-[90%] h-full px-3 py-1 text-xl focus:outline-0 sm:w-[265px] `}
            />
          </div>
          {/* Phone */}
          <div className="w-full h-[40px] mb-3 flex items-center sm:w-[315px]">
            <AiOutlinePhone
              className={"w-[50px] h-full px-3 bg-zinc-600 text-white"}
            />
            <input
              type="text"
              name="phone"
              value={inputData.phone}
              onChange={handleOnChange}
              placeholder="Phone number"
              className={`w-[90%] h-full px-3 py-1 text-xl focus:outline-0 sm:w-[265px] `}
            />
          </div>
        </>
      )}
      {/* Error section */}
      {error.active && <ErrorSuccess message={error.message} type="error" />}

      {/*  Submit button */}
      <button
        onClick={handleLogInRegister}
        className={`w-full h-[50px] my-3 ${
          error.active || !haveInfo()
            ? "bg-zinc-300 cursor-not-allowed text-zinc-400"
            : "bg-blue-500 text-white hover:shadow-[inset_0_-50px_0_0_rgba(12,34,244,0.5)] hover:transition-shadow hover:duration-[300ms]"
        } text-xl rounded`}
      >
        {logInRegister === "login" ? "Log In" : "Register"}
      </button>
    </div>
  );
};

export default LogIn;
