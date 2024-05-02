import React, { Dispatch, useEffect, useState } from "react";
import getBracketSnapshotById from "../database/getBracketSnapshotById";
import IBracket from "../interfaces/IBracket";
import BracketTree from "../components/BracketTree";
import { Link, useLocation } from "react-router-dom";

function Detailed({ route, navigate }: any) {
  const [bracket, setBracket] = useState<null | IBracket>(null);
  const location = useLocation();
  const bracketId = location.state.id;

  useEffect(() => {
    getData(setBracket, bracketId);
  }, [bracketId]);

  if (!bracketId || !bracket) {
    return <div>Bracket not found</div>;
  }

  return (
    <>
      <div className="flex flex-row justify-between">
        <h1 className="text-4xl">{bracket.title}</h1>
        <Link
          to={"/home"}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Return to homepage
        </Link>
      </div>

      <BracketTree bracket={bracket} />
    </>
  );
}

async function getData(
  bracketSetter: Dispatch<React.SetStateAction<IBracket | null>>,
  bracketId: string
) {
  const snapshot = await getBracketSnapshotById(bracketId);
  const bracketData: IBracket = {
    id: snapshot.id,
    ...snapshot.data(),
  } as IBracket;

  bracketSetter(bracketData);
}

export default Detailed;
