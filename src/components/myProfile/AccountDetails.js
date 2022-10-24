// react
import { useContext } from "react";
// context
import MainContext from "../../contexts/MainContext";
// components
import AccountDetailsItem from "./AccountDetailsItem";

const AccountDetails = () => {
  // context
  const {
    activeUser: { email, userName, phone },
  } = useContext(MainContext);

  return (
    <div className="w-full flex flex-col">
      {["userName", "email", "phone"].map((item, index) => (
        <AccountDetailsItem
          key={index}
          id={item}
          title={
            item === "userName"
              ? "User name"
              : item === "email"
              ? "E-mail"
              : "Phone number"
          }
          text={
            item === "userName" ? userName : item === "email" ? email : phone
          }
        />
      ))}
    </div>
  );
};

export default AccountDetails;
