import React from "react";
import { Cell, Position, Player } from "./models/gameType";
type HistoryDisplayElementProps = {
  turn: any;
  ind: number;
  returnToMove: (pos: Position, player: Player) => void;
  //setWinnerCombination: React.Dispatch<React.SetStateAction<Position[] | null>>;
};

function HistoryDisplayElement({
  turn,
  ind,
  returnToMove,
  //setWinnerCombination,
}: HistoryDisplayElementProps) {
  return (
    <p>
      Player:{" "}
      <span className={turn.player == "X" ? "p" : "p2"}>{turn.player}</span>
      place {turn.place.row}.{turn.place.column}
      <button
        className="return-btn"
        onClick={() => {
          returnToMove(
            { row: turn.place.row, column: turn.place.column },
            turn.player
          );
          //setWinnerCombination(null);
          console.log(turn.player, "player");
        }}
      >
        Return
      </button>
    </p>
  );
}

export default HistoryDisplayElement;
