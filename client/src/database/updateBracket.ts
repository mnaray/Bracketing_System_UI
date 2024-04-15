import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import IBracket from "../interfaces/IBracket";

export default async function updateBracket(bracket: IBracket) {
  const docRef = doc(db, "brackets", bracket.id);
  await updateDoc(docRef, {
    title: bracket.title,
    createdAt: bracket.createdAt,
    editedAt: serverTimestamp(),
    ownerName: bracket.ownerName,
    started: bracket.started,
    startedAt: bracket.startedAt,
    rounds: bracket.rounds,
  });
}
