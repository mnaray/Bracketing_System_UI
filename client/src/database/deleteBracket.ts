import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import IBracket from "../interfaces/IBracket";

export default async function deleteBracket(bracket: IBracket) {
  const docRef = doc(db, "brackets", bracket.id);
  return await deleteDoc(docRef);
}
