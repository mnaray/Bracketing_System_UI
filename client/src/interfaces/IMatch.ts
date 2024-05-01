/* eslint-disable semi */

import { FieldValue } from "firebase/firestore";
import ICompetitor from "./ICompetitor";

export default interface IMatch {
  matchId: number;
  competitor1: ICompetitor | undefined;
  competitor2: ICompetitor | undefined;
  winner: ICompetitor | undefined;
  started: boolean;
  startedAt: FieldValue | undefined;
  nextMatch: string | undefined;
}
