import React from "react";
import ICompetitorFieldProps from "../interfaces/ICompetitorFieldProps";
import IMatch from "../interfaces/IMatch";
import updateBracket from "../database/updateBracket";

function CompetitorField(props: ICompetitorFieldProps) {
  const competitor = props.firstCompetitor
    ? props.match.competitor1
    : props.match.competitor2;

  async function advanceCompetitor() {
    if (!props.match.competitor1 || !props.match.competitor2) {
      return;
    }

    let bracket = props.bracket;

    // set winner of current match
    const currentMatchIndex = bracket.rounds[props.round - 1].matches.indexOf(
      props.match
    );

    bracket.rounds[props.round - 1].matches[currentMatchIndex].winner =
      competitor;

    // move winner of current match to next match
    const nextMatch = bracket.rounds[props.round].matches.find(
      (m) => m.matchId === props.match.nextMatch
    );

    const nextMatchIndex = bracket.rounds[props.round].matches.indexOf(
      nextMatch as IMatch
    );

    // decide which competitor to set in next match
    if (props.match.matchId % 2 === 0) {
      bracket.rounds[props.round].matches[nextMatchIndex].competitor2 = {
        name: competitor!.name,
        previousMatchId: props.match.matchId,
      };
    } else {
      bracket.rounds[props.round].matches[nextMatchIndex].competitor1 = {
        name: competitor!.name,
        previousMatchId: props.match.matchId,
      };
    }

    await updateBracket(bracket);
    window.location.reload();
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
