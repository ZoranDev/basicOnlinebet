// react
import { useContext, useEffect } from "react";
// context
import SoccerContext from "../../contexts/SoccerContext";
// components
import Match from "./Match";

const Matches = () => {
  // context
  const { matchesToShow } = useContext(SoccerContext);

  // in this array we add data of the match based on commence time
  let sortArr = [];

  if (matchesToShow) {
    let date = matchesToShow[0].commence_time.slice(0, 10);

    matchesToShow.forEach((match, index) => {
      // Indicator that we alredy filter matches to show by this date
      let ind = false;
      // date of the match
      date = matchesToShow[index].commence_time.slice(0, 10);
      // if we have something in sorted arr
      sortArr.length !== 0 &&
        sortArr.forEach((arr) => {
          arr.forEach((match) => {
            if (match.commence_time.slice(0, 10) === date) {
              ind = true;
            }
          });
        });

      ind === false &&
        sortArr.push(
          matchesToShow.filter(
            (item) => item.commence_time.slice(0, 10) === date
          )
        );
    });
  }

  console.log(sortArr);

  return (
    <div className="w-[60%] ">
      {sortArr.length !== 0 ? (
        sortArr.map((matches, index) => (
          <div key={index} className="mb-5">
            {/* Date of matches and h2h */}
            <div className="w-full bg-blue-500 px-5 py-2 border-b-[1px] border-b-white text-white flex items-center justify-between">
              {/* Date */}
              <h1 className="w-[60%]">
                Date: {matches[0].commence_time.slice(0, 10)}
              </h1>
              {/* h2h */}
              <div className="w-[30%] flex items-center justify-between">
                {["1", "X", "2"].map((item, index) => (
                  <h1
                    key={index}
                    className="w-[32%] flex items-center justify-center"
                  >
                    {item}
                  </h1>
                ))}
              </div>
            </div>

            {/* Matches for this day */}
            <div className="w-full bg-neutral-400 text-white py-[2px]">
              {matches.map((match, index) => (
                <Match info={match} key={index} />
              ))}
            </div>
          </div>
        ))
      ) : (
        <div>Select LEAGUE</div>
      )}
    </div>
  );
};

export default Matches;
