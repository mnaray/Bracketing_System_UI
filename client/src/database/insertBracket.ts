import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import IBracket from "../interfaces/IBracket";

export default async function insertBracket(bracket: IBracket) {
  return await addDoc(collection(db, "brackets"), {
    title: bracket.title,
    createdAt: bracket.createdAt,
    editedAt: bracket.editedAt,
    uid: bracket.uid,
    started: bracket.started,
    startedAt: bracket.startedAt,
    rounds: bracket.rounds,
  });
}
