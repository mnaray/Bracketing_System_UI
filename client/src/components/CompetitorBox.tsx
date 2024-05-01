import React from "react";

function CompetitorBox(competitorName: string) {
  function advanceCompetitor() {
    console.log("winner: ", competitorName);
  }

  return <div onClick={advanceCompetitor}>{competitorName}</div>;
}

export default CompetitorBox;
