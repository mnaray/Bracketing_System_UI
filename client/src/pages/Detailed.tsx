import React, { Dispatch, useEffect, useState } from "react";
import getBracketSnapshotById from "../database/getBracketSnapshotById";
import IBracket from "../interfaces/IBracket";
import BracketTree from "../components/BracketTree";
import SaveButton from "../components/SaveButton";
import { useLocation } from "react-router-dom";

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
      <h1 className="text-4xl">{bracket.title}</h1>
      <SaveButton />
      <BracketTree bracket={bracket} />
    </>
  );
}

async function getData(
  bracketSetter: Dispatch<React.SetStateAction<IBracket | null>>,
  bracketId: string
) {
  const snapshot = await getBracketSnapshotById(bracketId);
  bracketSetter(snapshot.data() as IBracket);
}

export default Detailed;
