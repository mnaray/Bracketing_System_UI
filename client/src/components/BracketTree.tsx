import React from "react";
import IBracketTreeProps from "../interfaces/IBracketTreeProps";

function BracketTree(props: IBracketTreeProps) {
  const bracket = props.bracket;

  bracket.rounds.sort((a, b) => a.roundNumber - b.roundNumber);
  const rounds = bracket.rounds.map((round) => {
    const matches = round.matches.map((match) => {
      return (
        <li key={match.id} className="border border-black">
          <p>{match.competitor1.name}</p>
          <p>{match.competitor2.name}</p>
        </li>
      );
    });

    return (
      <li key={round.roundNumber} className="flex flex-col justify-center">
        <ul className="flex flex-col">{matches}</ul>
      </li>
    );
  });

  // add victor round
  rounds.push(<li>Winner NAME</li>);

  return <ul className="flex flex-row justify-center">{rounds}</ul>;
}

export default BracketTree;
