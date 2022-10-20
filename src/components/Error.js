// icons
import { AiOutlineWarning } from "react-icons/ai";

const Error = ({ message }) => {
  return (
    <div className="w-full my-2 text-red-500 text-lg flex items-center justify-center">
      <p>{message}</p>
      <AiOutlineWarning className="ml-2" />
    </div>
  );
};

export default Error;
