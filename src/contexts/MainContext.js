// react
import { createContext, useState } from "react";

const MainContext = createContext();

export const MainContextProvider = ({ children }) => {
  // users
  const [users, setUsers] = useState("users");
  // active user
  const [activeUser, setActiveUser] = useState("fsfs");

  return (
    <MainContext.Provider
      value={{
        users,
        activeUser,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainContext;
