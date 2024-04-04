import { doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import IBracket from "../interfaces/IBracket";

export default async function insertBracket(bracket: IBracket) {
  return await setDoc(doc(db, "brackets", bracket.id), {
    title: bracket.title,
    createdAt: bracket.createdAt,
    editedAt: bracket.editedAt,
    ownerName: bracket.ownerName,
    started: bracket.started,
    startedAt: bracket.startedAt,
    rounds: bracket.rounds,
  });
}
