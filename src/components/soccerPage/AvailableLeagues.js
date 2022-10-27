// react
import { useState } from "react";
// components
import LeagueBtn from "./LeagueBtn";
// icons
import { FaSearch } from "react-icons/fa";

// leagues
const leagues = [
  { name: "England", key: "soccer_epl" },
  { name: "Spain", key: "soccer_spain_la_liga" },
  { name: "France", key: "soccer_france_ligue_one" },
  { name: "Germany", key: "soccer_germany_bundesliga" },
  { name: "Italy", key: "soccer_italy_serie_a" },
  { name: "Netherland", key: "soccer_netherlands_eredivisie" },
  { name: "Portugal", key: "soccer_portugal_primeira_liga" },
];

const AvailableLeagues = () => {
  // state for non filtered array of leagues
  const [displayedLeagues, setdisplayedLeagues] = useState(leagues);
  // state for current displayed league
  const [currentLeague, setCurrentLeague] = useState(null);

  // filter leagues
  const filterLeagues = (e) => {
    let value = e.target.value;
    value === ""
      ? setdisplayedLeagues(leagues)
      : setdisplayedLeagues(
          displayedLeagues.filter((item) =>
            item.name.toLowerCase().includes(e.target.value.toLowerCase())
          )
        );
  };

  // setLeague
  const setLeague = (fetchKey) => {
    setCurrentLeague(fetchKey);
  };

  return (
    <div className="w-[20%]">
      {/* Search component */}
      <div className="w-full h-[40px] mb-5 bg-neutral-400 relative rounded overflow-hidden">
        <FaSearch className="absolute left-2 top-2/4 -translate-y-2/4 text-blue-500 text-lg" />
        <input
          type="text"
          onKeyUp={filterLeagues}
          placeholder="Search league"
          className="bg-transparent w-full h-full px-9 text-white text-lg placeholder:text-white focus:outline-0 "
        />
      </div>

      <h1 className="mb-2 text-md text-white">Available leagues</h1>
      {displayedLeagues.map((item, index) => (
        <LeagueBtn
          key={index}
          text={item.name}
          fetchKey={item.key}
          currentLeague={currentLeague}
          setLeague={setLeague}
        />
      ))}
    </div>
  );
};

export default AvailableLeagues;
