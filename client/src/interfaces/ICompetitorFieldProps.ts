/* eslint-disable semi */

import IBracket from "./IBracket";
import IMatch from "./IMatch";

export default interface ICompetitorFieldProps {
  bracket: IBracket;
  match: IMatch;
  firstCompetitor: boolean;
  round: number;
}
