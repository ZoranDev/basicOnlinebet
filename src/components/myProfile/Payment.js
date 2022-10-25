// react
import { useState, useEffect, useContext } from "react";
// context
import MainContext from "../../contexts/MainContext";
// components
import ErrorSuccess from "../ErrorSuccess";
// Icons
import { FaQuestion, FaExclamationTriangle } from "react-icons/fa";

//get current year
const currentYear = new Date().getFullYear();

const Payment = () => {
  // context
  const { updateUserMoney } = useContext(MainContext);

  // state for credit card info
  const [creditCardInfo, setCreditCardInfo] = useState({
    num1: "",
    num2: "",
    num3: "",
    num4: "",
    expireMonth: "",
    expireYear: "",
    cvc: "",
  });
  // state for how much to pay in
  const [payInValue, setPayInValue] = useState(5);
  // State for error in card number
  const [cardNumberErr, setCardNumberErr] = useState(false);
  // State for error in expire date
  const [expireDateErr, setExpireDateErr] = useState(false);
  // State for cvc error
  const [cvcErr, setCvcErr] = useState(false);
  // payInValueErr
  const [payInValueErr, setPayInValueErr] = useState(false);
  // showImage state
  const [showImage, setShowImage] = useState(false);
  // state for success/error after payment
  const [error, setError] = useState({
    active: false,
    message: "",
    type: "error",
  });

  // Check if value has some character
  var hasChar = /[a-zA-Z]/g;

  useEffect(() => {
    isCardNumberOk();
    isExpireDateOk();
    isCvcOk();
  }, [creditCardInfo]);

  // is char in credit card number
  const isCardNumberOk = () => {
    hasChar.test(creditCardInfo.num1) ||
    hasChar.test(creditCardInfo.num2) ||
    hasChar.test(creditCardInfo.num3) ||
    hasChar.test(creditCardInfo.num4)
      ? setCardNumberErr(true)
      : setCardNumberErr(false);
  };

  // isExpireDateOk
  const isExpireDateOk = () => {
    creditCardInfo.expireMonth === "default" ||
    creditCardInfo.expireYear === "default" ||
    (creditCardInfo.expireMonth !== "" &&
      creditCardInfo.expireYear !== "" &&
      new Date(creditCardInfo.expireYear, creditCardInfo.expireMonth) <
        new Date())
      ? setExpireDateErr(true)
      : setExpireDateErr(false);
  };

  // isCvcOk
  const isCvcOk = () => {
    hasChar.test(creditCardInfo.cvc) ? setCvcErr(true) : setCvcErr(false);
  };

  // handleOnChange function
  const handleOnChange = (e) => {
    // for easy moving through credit car number
    let value = e.target.value;
    let id = e.target.id;
    let parent = e.target.parentElement;
    if (
      (id === "num1" || id === "num2" || id === "num3") &&
      value.length === 4
    ) {
      parent.children[parseInt(id.slice(3, 4))].focus();
      parent.children[parseInt(id.slice(3, 4))].select();
    }
    // fill credit card info state
    setCreditCardInfo({ ...creditCardInfo, [e.target.name]: e.target.value });
  };

  //mouseEnter
  const mouseEnter = () => setShowImage(true);

  //mouseLeave
  const mouseLeave = () => setShowImage(false);

  // handleInputMoney
  const handleInputMoney = (e) => {
    let value = e.target.value;
    value < 5 || value > 500 ? setPayInValueErr(true) : setPayInValueErr(false);
    setPayInValue(e.target.value);
  };

  // canMoveOn
  const canMoveOn = () => {
    return (
      !cardNumberErr &&
      !cvcErr &&
      !expireDateErr &&
      !payInValueErr &&
      creditCardInfo.num1 !== "" &&
      creditCardInfo.num2 !== "" &&
      creditCardInfo.num3 !== "" &&
      creditCardInfo.num4 !== "" &&
      creditCardInfo.expireMonth !== "" &&
      creditCardInfo.expireYear !== "" &&
      creditCardInfo.cvc !== ""
    );
  };

  // reset state
  const resetState = () => {
    setCreditCardInfo({
      num1: "",
      num2: "",
      num3: "",
      num4: "",
      expireMonth: "",
      expireYear: "",
      cvc: "",
    });
    setPayInValue(5);
    setTimeout(() => {
      setError({ active: false, message: "", type: "error" });
    }, 3000);
  };

  // handlePayMoney
  const handlePayMoney = () => {
    if (canMoveOn()) {
      updateUserMoney(payInValue);
      setError({
        active: true,
        message: `Successfully paid ${payInValue} € to your account!`,
      });
      resetState();
    }
  };

  return (
    <div className="max-w-[400px]">
      {/* Card number */}
      <div className="w-full mb-2">
        <h2 className="w-full mb-2 text-lg bg-transparent">Card number:</h2>
        <div
          className={`bg-white  h-[50px] py-2 px-4 flex items-center justify-between`}
        >
          {["num1", "num2", "num3", "num4"].map((item, index) => (
            <input
              key={index}
              name={item}
              value={
                item === "num1"
                  ? creditCardInfo.num1
                  : item === "num2"
                  ? creditCardInfo.num2
                  : item === "num3"
                  ? creditCardInfo.num3
                  : creditCardInfo.num4
              }
              onChange={handleOnChange}
              type="text"
              id={item}
              maxLength={4}
              placeholder="0000"
              className="w-[50px] py-1 text-center text-lg bg-transparent border-0 placeholder:text-black focus:outline-0 sm:px-2 sm:w-[80px]"
            />
          ))}
        </div>
        {cardNumberErr && (
          <ErrorSuccess message="Check card number" type="warning" />
        )}
      </div>

      {/* Expire date */}
      <div className="w-full mb-2">
        <h2 className="w-full mb-2 text-lg bg-transparent">Expire date</h2>
        <div className="w-full h-[50px] flex items-center">
          {/* Month */}
          <select
            name="expireMonth"
            id="month"
            value={creditCardInfo.expireMonth}
            className="h-full max-w-[100px] mr-1 py-2 px-4 cursor-pointer text-lg focus:outline-0"
            onChange={handleOnChange}
          >
            <option value="default">MM</option>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
          {/* Year */}
          <select
            name="expireYear"
            id="year"
            value={creditCardInfo.expireYear}
            onChange={handleOnChange}
            className="h-full max-w-[100px] py-2 px-4 cursor-pointer text-lg focus:outline-0"
          >
            <option value="default">YY</option>
            {[0, 1, 2, 3, 4, 5, 6, 7, 9].map((item, index) => (
              <option key={index} value={currentYear + item}>
                {currentYear + item}
              </option>
            ))}
          </select>
        </div>
        {expireDateErr && (
          <ErrorSuccess message="Check expire date!" type="warning" />
        )}
      </div>

      {/* CVC */}
      <div className="w-full mb-2">
        <h2 className="w-full mb-2 text-lg bg-transparent">CVC</h2>
        <div className="h-[50px] relative ">
          <div className="max-w-[100px] h-full flex items-center justify-between relative">
            <input
              type="text"
              name="cvc"
              placeholder="CVC"
              className="w-full h-full py-2 px-4 text-lg border-0 focus:outline-0 text-left  placeholder:text-black"
              id="cvc"
              maxLength={3}
              value={creditCardInfo.cvc}
              onChange={handleOnChange}
            />
            <FaQuestion
              onMouseEnter={mouseEnter}
              onMouseLeave={mouseLeave}
              className="absolute right-0 t-2/4 text-neutral-500 hover:text-red-500 cursor-pointer"
            />
          </div>

          <img
            src="https://ccbill.com/kb/wp-content/uploads/2022/04/cvv-cvc-location-payment-card.jpg"
            alt=""
            className={`w-[200px] ${
              !showImage ? "h-0 " : "h-[100px]"
            } transition-[height] duration-[400ms] rounded-lg absolute -top-[100px]`}
          />
        </div>
        {cvcErr && <ErrorSuccess message="Check CVC!" type="warning" />}
      </div>

      {/* How much to pay in */}
      <div className="w-full">
        <h2 className="w-full mb-2 text-lg bg-transparent">Amount</h2>
        <div className="h-[50px] relative ">
          <div className="max-w-[100px] h-full border-0 flex items-center justify-between relative focus:outline-0">
            <input
              type="number"
              name="payMoney"
              className="w-full h-full py-2 px-4 text-lg border-0 focus:outline-0 text-left  placeholder:text-black"
              id="payMoney"
              min={5}
              max={500}
              value={payInValue}
              onChange={handleInputMoney}
            />
          </div>
        </div>
        <p className="my-1 text-sm text-blue-500">* Min 5€ max 500€</p>
        {payInValueErr && (
          <ErrorSuccess message="Check amonut!" type="warning" />
        )}
      </div>

      {/* Pay money button */}
      <button
        onClick={handlePayMoney}
        className={`w-[280px] py-2 px-2 my-4 ${
          canMoveOn()
            ? "bg-blue-400 text-white cursor-pointer hover:bg-blue-500"
            : "bg-zinc-300 text-zinc-400 cursor-not-allowed"
        } transform-colors duration-[300ms] flex items-center justify-center rounded`}
      >
        Pay
      </button>

      {/* When success */}
      {error.active && <ErrorSuccess message={error.message} type="success" />}
    </div>
  );
};

export default Payment;
