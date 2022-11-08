// react
import { createContext, useState } from "react";
// router dom
import { useNavigate } from "react-router-dom";
// uuid
import { v4 as getID } from "uuid";

const UsersContext = createContext();

export const UsersContextProvider = ({ children }) => {
  // users
  const [users, setUsers] = useState([]);
  // active user
  const [activeUser, setActiveUser] = useState(null);

  // navigate
  const navigate = useNavigate();

  // createNewuser
  const createNewuser = (inputData) => {
    let newUser = inputData;
    newUser.id = getID();
    newUser.money = 0;
    newUser.tickets = [];
    // then add new user to existing users
    setUsers([...users, newUser]);
    setActiveUser(newUser);
    navigate("/");
  };

  // logUser
  const logUser = (email) => {
    let newActiveUser;
    users.forEach((user) => {
      if (user.email === email) {
        newActiveUser = user;
      }
    });
    setActiveUser(newActiveUser);
    navigate("/");
  };

  // logOut
  const logOut = () => {
    setActiveUser(null);
    navigate("/");
  };

  // changePassword
  const changePassword = (newPassword) => {
    setUsers(
      users.map((user) => {
        if (user.id === activeUser.id) {
          user.password = newPassword;
        }
        return user;
      })
    );
  };

  // updateUserPersonalDetails
  const updateUserPersonalDetails = (whatToUpd, valueToUpd) => {
    setUsers(
      users.map((user) => {
        if (user.id === activeUser.id) {
          user.userName = whatToUpd === "userName" ? valueToUpd : user.userName;
          user.phone = whatToUpd === "phone" ? valueToUpd : user.phone;
        }
        return user;
      })
    );
  };

  // updateUserMoney
  const updateUserMoney = (newMoney) => {
    setUsers(
      users.map((user) => {
        if (user.id === activeUser.id) {
          user.money = parseInt(newMoney) + parseInt(user.money);
        }
        return user;
      })
    );
  };

  // payTicket
  const payTicket = (myTicket) => {
    setUsers(
      users.map((user) => {
        if (user.id === activeUser.id) {
          let newTicket = {
            id: getID(),
            body: myTicket,
          };
          user.tickets.push(newTicket);
          user.money = user.money - myTicket.stake;
        }
        return user;
      })
    );
  };

  return (
    <UsersContext.Provider
      value={{
        users,
        activeUser,
        createNewuser,
        logUser,
        logOut,
        changePassword,
        updateUserPersonalDetails,
        updateUserMoney,
        payTicket,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export default UsersContext;
