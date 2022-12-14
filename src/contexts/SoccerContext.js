import { createContext, useState, useEffect } from "react";

const SoccerContext = createContext();

export const SoccerContextProvider = ({ children }) => {
  // state for matches of the league that we want to show
  const [matchesToShow, setMatchesToShow] = useState(null);
  // state for displayed league
  const [displayedLeague, setDisplayedLeague] = useState("soccer_epl");

  // state for my ticket
  const [myTicket, setMyTicket] = useState({
    matches: [],
    coeff: 1,
    makings: 1,
    stake: 1,
  });

  // on start always fetch england premier leaguse
  useEffect(() => {
    getLeagueInfo(displayedLeague);
  }, []);

  // every change of played matches either add or remove trigger this function
  useEffect(() => {
    calculateCoeffAndMakings();
  }, [myTicket.matches, myTicket.stake]);

  // calculateCoeffAndMakings
  const calculateCoeffAndMakings = () => {
    let newCoeff = 1;
    let newMakings = 1;
    let newStake = myTicket.stake;
    // calculating coeff
    myTicket.matches.length !== 0 &&
      myTicket.matches.forEach((match) => {
        newCoeff = newCoeff * parseFloat(match.oddValue).toFixed(2);
      });
    newMakings = newStake * newCoeff;
    // setting the state
    setMyTicket({ ...myTicket, coeff: newCoeff, makings: newMakings });
  };

  // getLeagueInfo
  const getLeagueInfo = async (league) => {
    const response = await fetch(
      `https://api.the-odds-api.com/v4/sports/${league}/odds/?apiKey=66e64e32ec6533f49c05a5a88a08fccd&regions=eu`
    );
    const data = await response.json();

    setMatchesToShow(data);
    setDisplayedLeague(league);
  };

  // addToTicket
  const addToTicket = (info) => {
    // check to see if game is alredy in matches and action depends on weather game is on ticket or not
    myTicket.matches.map((match) => match.id).indexOf(info.id) !== -1
      ? setMyTicket({
          ...myTicket,
          matches: myTicket.matches.map((match) => {
            return match.id === info.id ? info : match;
          }),
        })
      : setMyTicket({
          ...myTicket,
          matches: [...myTicket.matches, info],
        });
  };

  // deleteFromTicket
  const deleteFromTicket = (id) => {
    setMyTicket({
      ...myTicket,
      matches: myTicket.matches.filter((match) => match.id !== id),
    });
  };

  // setStake
  const setStake = (e) => {
    let value = e.target.value;
    value.length <= 4 && setMyTicket({ ...myTicket, stake: value });
  };

  // resetMyTicket
  const resetMyTicket = () => {
    setMyTicket({
      matches: [],
      coeff: 1,
      makings: 1,
      stake: 1,
    });
  };

  return (
    <SoccerContext.Provider
      value={{
        matchesToShow,
        myTicket,
        displayedLeague,
        getLeagueInfo,
        addToTicket,
        deleteFromTicket,
        setStake,
        resetMyTicket,
      }}
    >
      {children}
    </SoccerContext.Provider>
  );
};

export default SoccerContext;
