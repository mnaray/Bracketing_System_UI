import { serverTimestamp } from "firebase/firestore";
import IBracket from "../interfaces/IBracket";
import ICompetitor from "../interfaces/ICompetitor";
import IRound from "../interfaces/IRound";

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
    rounds: [],
    id: undefined,
  };

  return bracket;
}

function GenerateRounds(competitorAmount: number) {
  const competitors: ICompetitor[] = [];

  for (let i = 0; i < competitorAmount; i++) {
    competitors.push({
      name: `Competitor ${i + 1}`,
      previousMatchId: undefined,
    });
  }

  const rounds: IRound[] = [];
  let round;
  while (competitors.length % 2 === 0) {
    const round: IRound = {
      matches: [],
      roundNumber: 0,
    };

    for (let i = 0; i < competitors.length; i += 2) {
      const match = {
        competitor1: competitors[i],
        competitor2: competitors[i + 1],
        winner: undefined,
        matchId: undefined,
      };

      // round.matches.push(match);
    }

    rounds.push(round);
  }
}
