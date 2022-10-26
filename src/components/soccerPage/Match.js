// components
import Odd from "./Odd";

const Match = ({
  info: { away_team, home_team, bookmakers, id, commence_time },
}) => {
  return (
    <div className="w-full h-[55px] bg-neutral-500 mb-[2px] px-5 py-2 flex items-center justify-between">
      {/* Teams */}
      <div className="w-[60%] flex flex-col items-center justify-between">
        <h1 className="w-full">{home_team}</h1>
        <h1 className="w-full">{away_team} </h1>
      </div>
      {/* Odds */}
      <div className="w-[30%] h-full flex items-center justify-between">
        {[
          { game: "1", bookmarkIndex: 0 },
          { game: "X", bookmarkIndex: 2 },
          { game: "2", bookmarkIndex: 1 },
        ].map((item, index) => (
          <Odd
            key={index}
            info={{
              game: item.game,
              oddValue:
                bookmakers[0].markets[0].outcomes[item.bookmarkIndex].price,
              away_team: away_team,
              home_team: home_team,
              commence_time: commence_time,
              id: id,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Match;
