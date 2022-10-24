// react
import { createContext, useState } from "react";
// router dom
import { useNavigate } from "react-router-dom";
// uuid
import { v4 as getID } from "uuid";

const MainContext = createContext();

export const MainContextProvider = ({ children }) => {
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
    // then add new user to existing users
    setUsers([...users, newUser]);
    setActiveUser(newUser);
    navigate("/soccer");
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
    navigate("/soccer");
  };

  // logOut
  const logOut = () => {
    setActiveUser(null);
    navigate("/soccer");
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

  return (
    <MainContext.Provider
      value={{
        users,
        activeUser,
        createNewuser,
        logUser,
        logOut,
        changePassword,
        updateUserPersonalDetails,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainContext;
