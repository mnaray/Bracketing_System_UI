import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

export default async function getBracketSnapshotById(bracketId: string) {
  const docRef = doc(db, "brackets", bracketId);
  const docSnapshot = await getDoc(docRef);

  if (!docSnapshot.exists()) {
    throw new Error("No bracket with id:" + bracketId + " was found.");
  }

  return docSnapshot;
}
