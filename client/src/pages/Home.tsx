import React, { useEffect, useState } from "react";
import { auth } from "../config/firebaseConfig";
import getAllBracketsSnapshot from "../database/getAllBracketsSnapshot";
import { DocumentData } from "firebase/firestore";
import CreateBracketModal from "../components/CreateBracketModal";

function Home() {
  const [brackets, setBrackets] = useState<DocumentData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleCreateBracket = (numParticipants: number) => {
    console.log("Neues Bracket erstellen mit", numParticipants, "Teilnehmern");
  };

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
        <button
          className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setIsModalOpen(true)} // Öffne das Modalfenster, wenn der "Create Bracket" Button geklickt wird
        >
          Create Bracket
        </button>
        <div className="mt-16">
          {brackets.map((bracket, index) => (
            <div key={index}>
              <div className="rounded-lg overflow-hidden shadow-lg flex flex-col justify-center bg-white my-4 mx-2 p-8 w-64">
                <p className="text-lg font-semibold mb-2">{bracket.title}</p>
                <button
                  className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => console.log("Placeholder")}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Modalfenster für das Erstellen eines neuen Brackets */}
      <CreateBracketModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreateBracket={handleCreateBracket}
      />
    </div>
  );
}

export default Home;
