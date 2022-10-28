// react
import { createContext, useState, useEffect } from "react";
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
  // State for show navbar - this is here because we need to hide navbar when app is in small screens - on click: soccer, login, payin btn, myProfile and logout
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    window.innerWidth < 640 ? setShowNavbar(false) : setShowNavbar(true);
  }, []);

  // show hide navbar based on screen width
  window.addEventListener("resize", () => {
    window.innerWidth > 640 ? setShowNavbar(true) : setShowNavbar(false);
  });

  // handle click on element to do something with show navbar
  const handleShowNavbar = (show) => {
    setShowNavbar(show);
  };

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
    // if there is no active user redirect to logIn page
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
    <MainContext.Provider
      value={{
        users,
        activeUser,
        showNavbar,
        handleShowNavbar,
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
    </MainContext.Provider>
  );
};

export default MainContext;
