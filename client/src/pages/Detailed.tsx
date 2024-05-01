import React, { Dispatch, useEffect, useState } from "react";
import IDetailedViewProps from "../interfaces/IDetailedViewProps";
import getBracketSnapshotById from "../database/getBracketSnapshotById";
import IBracket from "../interfaces/IBracket";
import BracketTree from "../components/BracketTree";
import SaveButton from "../components/SaveButton";

function Detailed(props: IDetailedViewProps) {
  const [bracket, setBracket] = useState<null | IBracket>(null);

  useEffect(() => {
    getData(setBracket, props.bracketId);
  }, [props.bracketId]);

  if (!props.bracketId || !bracket) {
    return <div>Bracket not found</div>;
  }

  // TODO: implement view
  return (
    <>
      <h1 className="text-4xl">{bracket.title}</h1>
      <BracketTree bracket={bracket} />
      <SaveButton />
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
