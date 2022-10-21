// react
import { createContext, useState } from "react";

const MainContext = createContext();

export const MainContextProvider = ({ children }) => {
  // users
  const [users, setUsers] = useState("users");

  return (
    <MainContext.Provider
      value={{
        users,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainContext;
