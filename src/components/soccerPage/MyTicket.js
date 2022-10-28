// react
import { useContext, useState, useEffect } from "react";
// router dom
import { useNavigate } from "react-router-dom";
// context
import SoccerContext from "../../contexts/SoccerContext";
import MainContext from "../../contexts/MainContext";
// components
import MatchOnTicket from "./MatchOnTicket";
import ErrorSuccess from "../ErrorSuccess";

const MyTicket = ({ showMyTicket, handleShowMyTicket }) => {
  // context
  const {
    myTicket: { matches, coeff, makings, stake },
    myTicket,
    setStake,
    resetMyTicket,
  } = useContext(SoccerContext);
  const { payTicket, activeUser } = useContext(MainContext);

  // state for ok stake
  const [okStake, setOkStake] = useState(true);
  // state for delete matches on ticket after pay
  const [deleteAfterPay, setDeleteAfterPay] = useState(false);
  // state for error in ticket - when user do not have money to pay
  const [error, setError] = useState({
    active: false,
    message: "",
    type: "error",
  });

  useEffect(() => {
    isStakeOk();
  }, [stake]);

  const isStakeOk = () => {
    setOkStake(stake < 1 || stake > 500 || stake === "" ? false : true);
  };

  // navigate
  const navigate = useNavigate();

  // handleCheckBox
  const handleCheckBox = (e) => {
    setDeleteAfterPay(e.target.checked);
  };

  // handleClick
  const handleClick = () => {
    // if user isn't logged in redirect to login otherwise proceed
    if (!activeUser) {
      navigate("/login");
      return;
    }
    // if we have active user
    let money = activeUser.money;
    if (matches.length !== 0 && okStake) {
      setError({
        active: true,
        message: money < stake ? "Don't have money." : "Success.",
        type: money < stake ? "error" : "success",
      });
      // remove nottification
      setTimeout(() => {
        setError({ active: false, message: "", type: "error" });
      }, 3000);

      if (money > stake) {
        payTicket(myTicket);
        deleteAfterPay && resetMyTicket();
      }
    }
  };

  return (
    <div
      id="myTickett"
      className={`${
        showMyTicket ? "translate-x-0" : "translate-x-[320px]"
      } absolute w-[280px]  overflow-hidden absolute right-2  bg-neutral-400 rounded-tl-md rounded-tr-md overflow-hidden flex flex-col justify-start transition-[transform] duration-[700ms] lg:w-[20%] lg:relative  `}
    >
      {/* Title */}
      <div className="w-full px-4 py-2 bg-blue-500 text-white border-b-[1px] border-b-white flex items-center justify-between">
        <h1>My Ticket</h1>
        {showMyTicket && (
          <div
            onClick={handleShowMyTicket}
            className="w-[20px] h-[20px] text-[10px] flex items-center justify-center cursor-pointer hover:scale-[1.2] hover:text-blue-500 hover:bg-white hover:rounded-full transition-all duration-[300ms] lg:hidden"
          >
            x
          </div>
        )}
      </div>

      {/* Played matches */}
      <div className="p-2">
        {matches.length === 0 ? (
          <div className="w-full text-center text-white">
            Nothing on ticket yet
          </div>
        ) : (
          matches.map((match, index) => (
            <MatchOnTicket key={index} info={match} />
          ))
        )}
      </div>

      {/* Stake, coeff, makings, payBtn and more */}
      <div className="w-full px-2 flex flex-col justify-center items-center">
        {/* Stake */}
        <div
          className={`w-full h-[40px] bg-white mb-2 flex items-center justify-center border-[3px] ${
            okStake ? "border-white" : "border-red-500"
          }`}
        >
          <input
            type="number"
            value={stake}
            onChange={setStake}
            min={1}
            max={500}
            placeholder="Stake"
            className="w-[80%] h-full p-2 focus:outline-0"
          />
          <h1 className="w-[20%] h-full p-2 flex items-center justify-center bg-blue-400 text-white">
            €
          </h1>
        </div>
        {/* Coeff */}
        <div className="w-full mb-2 flex items-center justify-between text-white">
          <h1>Coefficient:</h1>
          <h1>{parseFloat(coeff).toFixed(2)}</h1>
        </div>
        {/* Makings */}
        <div className="w-full mb-2 flex items-center justify-between text-white">
          <h1>Makings:</h1>
          <h1>{parseFloat(makings).toFixed(2)}</h1>
        </div>
        {/* Pay btn */}
        <button
          onClick={handleClick}
          className={`w-[100px] my-2 ${
            okStake && matches.length !== 0
              ? "bg-blue-400"
              : "bg-neutral-300 cursor-not-allowed"
          }  py-2 text-white rounded-lg`}
        >
          PAY
        </button>

        {/* Additional */}
        <div className="w-full mb-2 text-white text-md">
          <p>* Min stake 1€ max 500€</p>
          <div className="w-full flex items-center justify-between">
            <label htmlFor="deleteAfterPay">Delete after pay</label>
            <input
              type="checkbox"
              onChange={handleCheckBox}
              name="deleteAfterPay"
              checked={deleteAfterPay}
              id="deleteAfterPay"
              className="w-[20px] h-[20px] cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Error */}
      {error.active && (
        <div className="w-full px-2 my-2 ">
          <ErrorSuccess message={error.message} type={error.type} />
        </div>
      )}
    </div>
  );
};

export default MyTicket;
