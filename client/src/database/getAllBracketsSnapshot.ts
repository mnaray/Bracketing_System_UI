import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { auth, db } from "../config/firebaseConfig";

export default async function getAllBracketsSnapshot() {
  const user = auth.currentUser;

  if (!user) {
    throw new Error(
      "Trying to fetch user specific data, without being logged in."
    );
  }

  const uname = user.uid;
  const q = query(
    collection(db, "brackets"),
    where("ownerName", "==", uname),
    orderBy("editedAt", "desc")
  );

  return await getDocs(q);
}
