import React, { useEffect, useState } from "react";
import { auth } from "../config/firebaseConfig";
import getAllBracketsSnapshot from "../database/getAllBracketsSnapshot";
import CreateBracketModal from "../components/CreateBracketModal";
import GenerateBracket from "../services/GenerateBracket";
import insertBracket from "../database/insertBracket";
import deleteBracket from "../database/deleteBracket";
import IBracket from "../interfaces/IBracket";
import { useNavigate } from "react-router-dom";

function Home() {
  const [brackets, setBrackets] = useState<IBracket[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      try {
        const bracketsSnapshot = await getAllBracketsSnapshot();
        if (!bracketsSnapshot.empty) {
          const bracketsData: IBracket[] = bracketsSnapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            } as IBracket;
          });
          setBrackets(bracketsData);
        }
      } catch (error) {
        console.error("Fehler beim Abrufen der Daten:", error);
      }
    }
    fetchData();
  }, []);

  const handleCreateBracket = async (
    title: string,
    numParticipants: number
  ) => {
    if (!auth.currentUser) {
      throw Error("Not logged in!");
    }

    const uid = auth.currentUser.uid;
    const newBracket = GenerateBracket(uid, title, numParticipants);

    await insertBracket(newBracket);

    window.location.reload();
  };

  function handleRedirect(bracketId: string) {
    navigate("/details", { state: { id: bracketId } });
  }

  return (
    <div className="flex flex-col items-center justify-start w-screen h-screen">
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
                <div className="flex flex-row justify-evenly mt-5">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleRedirect(bracket.id || "")}
                  >
                    Details
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={async () => {
                      await deleteBracket(bracket.id || "");
                      window.location.reload();
                    }}
                  >
                    Delete
                  </button>
                </div>
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
