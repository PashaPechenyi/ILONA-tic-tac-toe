import React from "react";
import { Cell, Player, Position } from "./models/gameType";
import HistoryDisplayElement from "./HistoryDisplayElement";
type HistoryDisplayProps = {
  turnsHistory: Cell[];
  returnToMove: (pos: Position, player: Player) => void;
//  setWinnerCombination: React.Dispatch<React.SetStateAction<Position[] | null>>;
};

function HistoryDisplay({
  turnsHistory,
  returnToMove,
  //setWinnerCombination,
}: HistoryDisplayProps) {
  return (
    <div className="historyDisplay">
      <h3>History of moves:</h3>
      {turnsHistory.map((turn: Cell, ind: number) => (
        <HistoryDisplayElement
          turn={turn}
          ind={ind}
          //setWinnerCombination={setWinnerCombination}
          returnToMove={returnToMove}
        />
      ))}
    </div>
  );
}

export default HistoryDisplay;
