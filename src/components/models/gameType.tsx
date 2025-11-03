export type Cells = "0" | "X" | null;
export type Player = "0" | "X";
export type Position = {
  row: number;
  column: number;
};
export type TurnHistory = {
  player: Player;
  place: Position;
};
export type Cell = {
  player: Player | null;
  place: Position;
};
export type CellWidth = {
  divWith: number;
  fontSize: number;
};
export type IsCorrect={
  boardSize:string|null;
  winCombinationLength:string|null
  amountOfUnDisappearingCells:string|null

}
