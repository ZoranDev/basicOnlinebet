// react
import { useState, useEffect } from "react";
// components
import Error from "../Error";
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
    if (logInRegister === "login") {
      return !validEmail.test(email) && email !== "";
    } else {
      return (
        (!validEmail.test(email) && email !== "") ||
        (hasNumber.test(userName) && userName !== "") ||
        (hasChar.test(phone) && phone !== "")
      );
    }
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
    if (logInRegister === "login") {
      return inputData.email !== "" && inputData.password !== "";
    } else {
      return (
        inputData.email !== "" &&
        inputData.password !== "" &&
        inputData.userName !== "" &&
        inputData.phone !== ""
      );
    }
  };

  // resetState
  const resetState = () => {
    setInputData({
      email: "",
      password: "",
      userName: "",
      phone: "",
    });
  };

  // handleLogInRegister
  const handleLogInRegister = (e) => {
    e.preventDefault();
    // check to see if input data are in correct form and if there is input info at all, different condition for log in and register
    if (!error.active && haveInfo()) {
      console.log("MOVE ON");
      resetState();
    }
  };

  return (
    <div className="w-[500px] mx-auto my-[100px] p-5 bg-zinc-400 rounded-md relative flex flex-col items-center">
      {/* User icon */}
      <div className="w-[120px] h-[120px] bg-zinc-500 rounded-full flex items-center justify-center absolute -top-[60px] left-2/4 -translate-x-2/4 shadow-[inset_0_0_50px_rgba(255,255,255,0.7)]">
        <AiOutlineUser className="text-white text-6xl" />
      </div>
      {/* LogIn || Register */}
      <div className="w-full mt-[60px] mb-6 flex items-center border-2 border-white bg-white">
        {[
          { title: "Log In", id: "login" },
          { title: "Register", id: "register" },
        ].map((item, index) => (
          <h1
            key={index}
            onClick={() => handleClick(item.id)}
            className={`w-2/4 py-2 ${
              logInRegister === item.id
                ? "bg-zinc-600 text-white"
                : "bg-white text-zinc-600"
            } text-center text-md cursor-pointer`}
          >
            {item.title}
          </h1>
        ))}
      </div>
      {["email", "password", "userName", "phone"].map((item, index) => (
        <div
          key={index}
          className={`w-[315px] h-[40px] mb-3 flex items-center ${
            logInRegister === "login" &&
            (item === "userName" || item === "phone")
              ? "hidden"
              : "block"
          }`}
        >
          {/* Icon */}
          {item === "email" ? (
            <AiOutlineMail
              className={"w-[50px] h-full px-3 bg-zinc-600 text-white"}
            />
          ) : item === "password" && showPassword ? (
            <AiFillEye
              onClick={handleShowPassword}
              className={
                "w-[50px] h-full px-3 bg-zinc-600 text-white cursor-pointer"
              }
            />
          ) : item === "password" && !showPassword ? (
            <AiFillEyeInvisible
              onClick={handleShowPassword}
              className={
                "w-[50px] h-full px-3 bg-zinc-600 text-white cursor-pointer"
              }
            />
          ) : item === "userName" ? (
            <AiOutlineUser
              className={"w-[50px] h-full px-3 bg-zinc-600 text-white"}
            />
          ) : (
            <AiOutlinePhone
              className={"w-[50px] h-full px-3 bg-zinc-600 text-white"}
            />
          )}

          {/* Input */}
          <input
            type={item === "password" && !showPassword ? "password" : "text"}
            name={item}
            value={inputData.item}
            onChange={handleOnChange}
            placeholder={item}
            className={`w-[265px] h-full px-3 py-1 text-xl focus:outline-0 placeholder:capitalize `}
            required={true}
          />
        </div>
      ))}

      {/* Error section */}
      {error.active && <Error message={error.message} />}

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
