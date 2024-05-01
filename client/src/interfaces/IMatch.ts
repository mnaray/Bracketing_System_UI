/* eslint-disable semi */

import { FieldValue } from "firebase/firestore";
import ICompetitor from "./ICompetitor";

export default interface IMatch {
  matchId: number;
  competitor1: ICompetitor | null;
  competitor2: ICompetitor | null;
  winner: ICompetitor | null;
  started: boolean;
  startedAt: FieldValue | null;
  nextMatch: string | null;
}
