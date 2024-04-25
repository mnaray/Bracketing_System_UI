import React, { useEffect, useState } from "react";
import { auth } from "../config/firebaseConfig";
import getAllBracketsSnapshot from "../database/getAllBracketsSnapshot";
import { DocumentData } from "firebase/firestore";

function Home() {
  const [brackets, setBrackets] = useState<DocumentData[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const bracketsSnapshot = await getAllBracketsSnapshot();
        if (!bracketsSnapshot.empty) {
          const bracketsData = bracketsSnapshot.docs.map((doc) => doc.data());
          setBrackets(bracketsData);
        }
      } catch (error) {
        console.error("Fehler beim Abrufen der Daten:", error);
      }
    }
    fetchData();
  }, []);
  return (
    <div className="flex flex-col items-center justify-start bg-slate-500 w-screen h-screen">
      <div className="flex items-center flex-col mt-20">
        <h1 className="text-xl m-2">
          Welcome, {auth.currentUser?.displayName}
        </h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => auth.signOut()}
        >
          Sign out
        </button>
      </div>
    </div>
  );
}

export default Home;
