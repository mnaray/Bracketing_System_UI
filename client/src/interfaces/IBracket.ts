import IRound from "./IRound";

export default interface IBracket {
  id: string;
  title: string;
  createdAt: number;
  editedAt: number;
  ownerName: string; // username
  started: boolean;
  startedAt: number;
  rounds: IRound[];
}
