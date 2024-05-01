/* eslint-disable semi */

import { FieldValue } from "firebase/firestore";
import IRound from "./IRound";

export default interface IBracket {
  id: string | undefined;
  title: string;
  createdAt: FieldValue;
  editedAt: FieldValue;
  uid: string; // username
  started: boolean;
  startedAt: FieldValue | undefined;
  rounds: IRound[];
}
