import { createContext, useState, useEffect } from "react";

const SoccerContext = createContext();

export const SoccerContextProvider = ({ children }) => {
  // numb state
  const [state, setState] = useState("dasda");

  useEffect(() => {
    getAvailableLeagues();
  }, []);

  // getAvailableLeagues
  const getAvailableLeagues = async () => {
    /* const response = await fetch(
      `https://api.the-odds-api.com/v4/sports/soccer_epl/odds/?apiKey=66e64e32ec6533f49c05a5a88a08fccd&regions=eu`
    ); */
    /* const data = await response.json();

    console.log(data); */
  };

  return (
    <SoccerContext.Provider
      value={{
        state,
      }}
    >
      {children}
    </SoccerContext.Provider>
  );
};

export default SoccerContext;
