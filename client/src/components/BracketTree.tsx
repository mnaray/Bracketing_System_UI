import React from "react";
import IBracketTreeProps from "../interfaces/IBracketTreeProps";

function BracketTree(props: IBracketTreeProps) {
  const bracket = props.bracket;

  bracket.rounds = bracket.rounds.sort((a, b) => a.roundNumber - b.roundNumber);
  const rounds = bracket.rounds.map((round) => {
    round.matches = round.matches.sort((a, b) => a.matchId - b.matchId);
    const matches = round.matches.map((match) => {
      return (
        <li
          key={match.matchId}
          className="border-2 border-black my-4 mx-12 p-2 divide-y divide-blue-400 w-40 text-center text-lg"
        >
          <p>{match.competitor1?.name || "?"}</p>
          <p>{match.competitor2?.name || "?"}</p>
        </li>
      );
    });

    return (
      <li key={round.roundNumber} className="flex flex-col justify-evenly">
        <ul className="flex flex-col justify-evenly flex-grow">{matches}</ul>
      </li>
    );
  });

  // add victor round
  rounds.push(
    <ul className="flex flex-col justify-center ml-12">
      <li className="flex flex-col justify-center border-2 border-blue-600 w-40 h-20 text-center">
        <p className="text-lg">Winner 👑</p>
        <p className="flex-grow-0 text-xl">
          {bracket.rounds[bracket.rounds.length - 1].matches[0].winner?.name ||
            "?"}
        </p>
      </li>
    </ul>
  );

  return <ul className="flex flex-row justify-center h-max">{rounds}</ul>;
}

export default BracketTree;
