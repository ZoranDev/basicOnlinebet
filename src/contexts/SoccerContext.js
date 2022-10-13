import { createContext, useState, useEffect } from "react";

const SoccerContext = createContext();

export const SoccerContextProvider = ({ children }) => {
  // state for matches of the league that we want to show
  const [matchesToShow, setMatchesToShow] = useState(null);

  // getLeagueInfo
  const getLeagueInfo = async (league) => {
    const response = await fetch(
      `https://api.the-odds-api.com/v4/sports/${league}/odds/?apiKey=66e64e32ec6533f49c05a5a88a08fccd&regions=eu`
    );
    const data = await response.json();

    setMatchesToShow(data);
  };

  return (
    <SoccerContext.Provider
      value={{
        matchesToShow,
        getLeagueInfo,
      }}
    >
      {children}
    </SoccerContext.Provider>
  );
};

export default SoccerContext;
