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
    // get this user some new props
    newUser.id = getID();
    newUser.money = 0;
    newUser.tickets = [];
    // add new user to existing users
    setUsers([...users, newUser]);
    // set that user as active user
    setActiveUser(newUser);
    // redirect to home page
    navigate("/");
  };

  // logUser
  const logUser = (email) => {
    users.forEach((user) => {
      user.email === email && setActiveUser(user);
    });
    navigate("/");
  };

  // logOut
  const logOut = () => {
    setActiveUser(null);
    navigate("/");
  };

  // updateUserProp - update userName, password, money or phone number
  const updateUserProp = (whatToUpd, valueToUpd) => {
    setUsers(
      users.map((user) => {
        if (user.id === activeUser.id) {
          user.password = whatToUpd === "password" ? valueToUpd : user.password;
          user.userName = whatToUpd === "userName" ? valueToUpd : user.userName;
          user.phone = whatToUpd === "phone" ? valueToUpd : user.phone;
          user.money =
            whatToUpd === "money"
              ? parseInt(valueToUpd) + parseInt(user.money)
              : user.money;
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
        updateUserProp,
        createNewuser,
        logUser,
        logOut,
        payTicket,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export default UsersContext;
