import React from "react";
import { Cell, CellWidth, Position } from "./models/gameType";
type CellComponentProps = {
  colInd: number;
  rowInd: number;
  cellSize: CellWidth;
  changePole: () => void;
  el: Cell;
  winnerCombination: Position[] | null;
};

function CellComponent({
  colInd,
  rowInd,
  cellSize,
  changePole,
  el,
  winnerCombination,
}: CellComponentProps) {
  return (
    <div
      style={{
        width: cellSize.divWith,
        height: cellSize.divWith,
        fontSize: cellSize.fontSize,
        ...(winnerCombination?.includes(el.place) ? { color: "green" } : {}),
      }}
      className={el.player == "X" ? "d" : "d2"}
      key={colInd}
      onClick={() => {
        changePole();
      }}
    >
      {el.player}
    </div>
  );
}

export default CellComponent;
