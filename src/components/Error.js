// icons
import { AiOutlineWarning } from "react-icons/ai";

const Error = ({ message }) => {
  return (
    <div className="w-full px-3 py-1 flex items-center justify-center bg-red-400 text-white rounded-md">
      <AiOutlineWarning className="mr-2" />
      <p>{message}</p>
    </div>
  );
};

export default Error;
