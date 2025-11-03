import React from "react";
import { Cell, CellWidth, Position, Player } from "./models/gameType";
import CellComponent from "./Cell";
type RowComponentProps = {
  rowInd: number;
  cellSize: CellWidth;
  changePole: (pos: Position, player: Player | null) => void;

  winnerCombination: Position[] | null;
  row: Cell[];
};

function RowCompoment({
  rowInd,
  cellSize,
  changePole,
  winnerCombination,
  row,
}: RowComponentProps) {
  return (
    <div>
      {row.map((el, colInd) => {
        return (
          <CellComponent
            key={colInd}
            colInd={colInd}
            rowInd={rowInd}
            cellSize={cellSize}
            changePole={() => {
              changePole({ row: rowInd, column: colInd }, el.player);
            }}
            el={el}
            winnerCombination={winnerCombination}
          />
        );
      })}
    </div>
  );
}

export default RowCompoment;
