import ICompetitor from "./ICompetitor";

export default interface IMatch {
  id: string;
  competitor1: ICompetitor;
  competitor2: ICompetitor;
  winner: ICompetitor | undefined;
  started: boolean;
  nextMatch: string | undefined;
}
