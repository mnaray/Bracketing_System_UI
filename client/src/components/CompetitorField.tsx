import React from "react";
import ICompetitorFieldProps from "../interfaces/ICompetitorFieldProps";
import IMatch from "../interfaces/IMatch";

function CompetitorField(props: ICompetitorFieldProps) {
  const competitor = props.firstCompetitor
    ? props.match.competitor1
    : props.match.competitor2;

  function advanceCompetitor() {
    if (!props.match.competitor1 || !props.match.competitor2) {
      return;
    }

    let bracket = props.bracket;

    // set winner of current match
    bracket.rounds[props.round].matches[
      bracket.rounds[props.round].matches.indexOf(props.match)
    ].winner = competitor;

    // move winner of current match to next match
    const nextMatch = bracket.rounds[props.round + 1].matches.find(
      (m) => m.matchId === props.match.nextMatch
    );

    bracket.rounds[props.round + 1].matches[
      bracket.rounds[props.round + 1].matches.indexOf(nextMatch as IMatch)
    ].competitor1 = {
      name: competitor!.name,
      previousMatchId: props.match.matchId,
    };
  }

  return (
    <p
      onClick={advanceCompetitor}
      className="cursor-pointer hover:bg-slate-400 hover:text-white"
    >
      {competitor?.name || "???"}
    </p>
  );
}

export default CompetitorField;
