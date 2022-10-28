// react
import { useState } from "react";
// icons
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const ChangePasswordInput = ({ id, text, fillInputData, value, okData }) => {
  // state for show password
  const [showPassword, setShowPassword] = useState(false);

  // changePasswordDisplay
  const changePasswordDisplay = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`flex flex-col mb-4 `}>
      <label htmlFor={id} className="mb-2 text-lg text-neutral-700">
        {text}
      </label>
      <div className="w-full relative bg-red-200 sm:w-[280px]">
        <input
          type={showPassword ? "text" : "password"}
          name={id}
          value={value}
          onChange={fillInputData}
          placeholder={text}
          className={`w-full bg-zinc-200 py-2 px-4 focus:outline-0 border-[3px] ${
            okData === null
              ? "border-zinc-400"
              : !okData
              ? "border-red-400"
              : "border-green-400"
          } `}
        />
        {showPassword ? (
          <AiFillEye
            onClick={changePasswordDisplay}
            className="absolute right-2 top-2/4 -translate-y-2/4 text-xl text-blue-400 hover:text-blue-500 hover:transition-colors hover:duration-[200ms] hover:cursor-pointer"
          />
        ) : (
          <AiFillEyeInvisible
            onClick={changePasswordDisplay}
            className="absolute right-2 top-2/4 -translate-y-2/4 text-xl text-blue-400 hover:text-blue-500 hover:transition-colors hover:duration-[200ms] hover:cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default ChangePasswordInput;
