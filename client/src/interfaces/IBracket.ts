/* eslint-disable semi */

import { FieldValue } from "firebase/firestore";
import IRound from "./IRound";

export default interface IBracket {
  id: string | undefined; // must be undefined so it automatically receives an ID
  title: string;
  createdAt: FieldValue;
  editedAt: FieldValue;
  uid: string; // username can't be used as it might not be unique or change
  started: boolean;
  startedAt: FieldValue | null;
  rounds: IRound[];
}
