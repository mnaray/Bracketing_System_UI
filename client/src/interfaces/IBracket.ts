/* eslint-disable semi */

import { FieldValue } from "firebase/firestore";
import IRound from "./IRound";

export default interface IBracket {
  id: string;
  title: string;
  createdAt: FieldValue;
  editedAt: FieldValue;
  ownerName: string; // username
  started: boolean;
  startedAt: FieldValue | undefined;
  rounds: IRound[];
}
