import { serverTimestamp } from "firebase/firestore";
import IBracket from "../interfaces/IBracket";
import ICompetitor from "../interfaces/ICompetitor";
import IRound from "../interfaces/IRound";
import IMatch from "../interfaces/IMatch";

export default function GenerateBracket(
  uid: string,
  title: string,
  competitorAmount: number
) {
  const bracket: IBracket = {
    title: title,
    createdAt: serverTimestamp(),
    editedAt: serverTimestamp(),
    uid: uid,
    started: false,
    startedAt: undefined,
    rounds: GenerateRounds(competitorAmount),
    id: undefined,
  };

  return bracket;
}

function GenerateRounds(competitorAmount: number): IRound[] {
  const competitors: ICompetitor[] = [];

  for (let i = 0; i < competitorAmount; i++) {
    competitors.push({
      name: `Competitor ${i + 1}`,
      previousMatchId: undefined,
    });
  }

  const rounds: IRound[] = [];
  let roundCount = 1;
  let matchCount = 1;

  while (competitors.length % 2 === 0) {
    const round: IRound = {
      matches: [],
      roundNumber: roundCount,
    };

    for (let i = 0; i < competitors.length; i += 2) {
      const match: IMatch = {
        competitor1: roundCount === 1 ? competitors[i] : undefined,
        competitor2: roundCount === 1 ? competitors[i + 1] : undefined,
        matchId: matchCount,
        started: false,
        startedAt: undefined,
        winner: undefined,
        nextMatch: undefined,
      };

      matchCount++;
      round.matches.push(match);
    }

    rounds.push(round);
    roundCount++;

    const halfCompetitors = competitors.length / 2;
    for (let i = 0; i < halfCompetitors; i++) {
      competitors.pop();
    }

    if (competitors.length !== 1 && competitors.length % 2 !== 0) {
      throw Error(); //If the amount of competitors is not dividable by the base of 2, then something is wrong.
    }
  }

  return rounds;
}
