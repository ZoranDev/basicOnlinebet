// icons
import { AiOutlineWarning } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";

const Error = ({ message, type }) => {
  return (
    <div
      className={`w-full my-2 px-3 py-1 flex items-center justify-center ${
        type === "success" ? "bg-green-500" : "bg-red-400"
      }  text-white rounded-md`}
    >
      {type === "success" ? (
        <FaCheck className="mr-2" />
      ) : (
        <AiOutlineWarning className="mr-2" />
      )}
      <p>{message}</p>
    </div>
  );
};

export default Error;
