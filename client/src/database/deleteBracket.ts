import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

export default async function deleteBracket(bracketId: string) {
  const docRef = doc(db, "brackets", bracketId);
  return await deleteDoc(docRef);
}
