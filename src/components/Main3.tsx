import React, { use, useEffect, useMemo, useState } from "react";
import {
  Cells,
  TurnHistory,
  Cell,
  Position,
  CellWidth,
} from "./models/gameType";
import { Player } from "./models/gameType";
import { checkBoardWinner, checkRowWinner } from "./functions";
import "./main.css";
import CellComponent from "./Cell";
import { write } from "fs";
import RowCompoment from "./RowCompoment";
import HistoryDisplay from "./HistoryDisplay";
import Settins from "./Settings";
import WinnerModal from "./WinnerModal";

// const calculateIsDraw = (cells: Cell[], winner: Player | null) => {
//   const playerArray = cells.map((el) => {
//     return el.player;
//   });

//   console.log(playerArray, "playerArray");
//   const isBoardFilled = !playerArray.includes(null);
//   const isDraw = !winner && isBoardFilled;
//   return isDraw;
// };
const verifyIsBoardFilled = (turnsHistory: TurnHistory[], boardSize: number) => {
  return turnsHistory.length == boardSize * boardSize;
};
const rowIndex = 1;
const row = [0, 1, 2];
const newRow: Cell[] = row.map((el) => {
  return { player: null, place: { row: rowIndex, column: el } };
});

const createArrayByLength = (length: number) => {
  return Array.from({ length }, (el, index) => index);
};

const calculateCells = (turnsHistory: TurnHistory[], boardSize: number) => {
  const initialCells: Cell[][] = createArrayByLength(boardSize).map(
    (el, ind) => {
      const row = createArrayByLength(boardSize);
      return row.map((col) => {
        return { player: null, place: { row: el, column: col } };
      });
    }
  );

  turnsHistory.forEach((turn) => {
    console.log(turn, "turn");

    initialCells[turn.place.row][turn.place.column] = {
      player: turn.player,
      place: turn.place,
    };

    console.log(initialCells, "initialCells");
  });

  return initialCells;
};
const cellWidthCountig = (boardSize: number) => {
  const divWith = (490 - 15 * (boardSize - 1)) / boardSize;
  const fontSize = 110 - boardSize * boardSize;
  return {
    divWith,
    fontSize,
  };
};

const calculateActivePlayer = (turnsHistory: Cell[]): Player => {
  if (!turnsHistory.length) {
    return "X";
  }

  if (turnsHistory[turnsHistory.length - 1].player === "X") {
    return "0";
  } else {
    return "X";
  }
};

function Main() {
  const [turnsHistory, setTurnsHistory] = useState<TurnHistory[]>([]);

  console.log(turnsHistory, "TurnsHistory02");
  //  const [winner, setWinner] = useState<Player | null>(null);
  //const [winnerCombination, setWinnerCombination] = useState<Position[] | null>(null);
  const [settings, setSettings] = useState({
    boardSize: 3,
    winCombinationLength: 3,
    enableDisappearingMode: false,
    amountOfUnDisappearingCells: 5,
  });
  // const [winCombinationLength, setWinCombinationLength] = useState(3);
  // const [boardSize, setBoardSize] = useState(3);

  // const cells = calculateCells(turnsHistory, settings.boardSize);
  const cells = useMemo(() => {
    return calculateCells(turnsHistory, settings.boardSize);
  }, [turnsHistory, settings.boardSize]);
  const activePlayer = calculateActivePlayer(turnsHistory);
  let cellArray: Cell[] = [];
  cells.forEach((el) => {
    el.forEach((el1) => {
      cellArray = [...cellArray, el1];
    });
  });
  console.log(cellArray, "cell");

  // //  const [enableDisappearingMode, setEnableDisappearingMode] =
  //     useState<boolean>(false);
  let winnerComb: Position[] = [];
  const cellWidth: CellWidth = cellWidthCountig(settings.boardSize);

  function getGameWinner(cellsList: Cell[][]) {
    const isWinner = checkBoardWinner(cellsList, settings.winCombinationLength);
    // if (isWinner) {
    //   const lastMove = isWinner[0].player;

    //   setWinner(lastMove);
    // } else {
    //   setWinner(null);
    // }

    const newComb = isWinner?.map((el) => {
      return el.place;
    });
    // if (newComb != undefined) {
    //   setWinnerCombination(newComb);
    // }

    console.log(winnerComb, "winnerComb");

    return isWinner;
  }

  const winnerCombination:Position[]|null = useMemo(() => {
     
     const newCells = calculateCells(turnsHistory, settings.boardSize);
     const isWinner=checkBoardWinner(newCells, settings.winCombinationLength);
    const newComb = isWinner?.map((el) => {
      return el.place;
    });
   
    if (newComb != undefined) {
      return newComb;
    }
    return null;
  }, [turnsHistory]);

  function changePole(position: Position, cell: Cells) {
    const turnsHistoryEl = turnsHistory.find((el: any) => {
      return el.place.column == position.column && el.place.row == position.row;
    });
    if (turnsHistoryEl || winner) {
      return;
    }

    setTurnsHistory((prev: any) => {
      let newHistory = [...prev, { place: position, player: activePlayer }];

      if (
        settings.enableDisappearingMode &&
        newHistory.length > settings.amountOfUnDisappearingCells
      ) {
        newHistory = newHistory.slice(
          newHistory.length - settings.amountOfUnDisappearingCells
        );
      }

      return newHistory;
    });
  }

  useEffect(() => {
    const newCells = calculateCells(turnsHistory, settings.boardSize);

    getGameWinner(newCells);
  }, [turnsHistory]);

  const winner = useMemo(() => {
    const gameWinner = getGameWinner(cells);
    if (gameWinner) {
      return turnsHistory[turnsHistory.length - 1].player;
    }
    return null;
  }, [turnsHistory, cells]);
  const isBoardFilled = verifyIsBoardFilled(turnsHistory, settings.boardSize);

  function returnToMove(place: Position, player: Player) {
    const returnMoves = [];

    for (let i = 0; i < turnsHistory.length; i++) {
      returnMoves.push(turnsHistory[i]);
      if (
        turnsHistory[i].place.column === place.column &&
        turnsHistory[i].place.row === place.row
      )
        break;
    }

    return setTurnsHistory(returnMoves);
  }
  function check() {
    setSettings((prev) => ({
      ...prev,
      enableDisappearingMode: !prev.enableDisappearingMode,
    }));
    // setEnableDisappearingMode((prev) => !prev);
  }
  function startNewGame() {
    //setWinner(null);

    //setWinnerCombination(null);
    setTurnsHistory([]);
  }

  return (
    <div className="display">
      <div className="left-div">
        <Settins
          // enableDisappearingMode={enableDisappearingMode}
          //setWinCombinationLength={setWinCombinationLength}
          setSettings={setSettings}
          // setBoardSize={setBoardSize}
          settings={settings}
          check={() => check()}
          setTurnHistory={setTurnsHistory}
        />
        <HistoryDisplay
          turnsHistory={turnsHistory}
          //setWinnerCombination={setWinnerCombination}
          returnToMove={returnToMove}
        />
      </div>

      <div className="right-div">
        <div className="con">
          {cells.map((row, rowInd) => (
            <RowCompoment
              row={row}
              rowInd={rowInd}
              cellSize={cellWidth}
              changePole={changePole}
              winnerCombination={winnerCombination}
            />
          ))}
        </div>

        {/* {isDraw && <p>Draw!</p>} */}
        <WinnerModal
          isBoardFilled={isBoardFilled}
          winner={winner}
          startNewGame={startNewGame}
        />
      </div>
    </div>
  );
}

export default Main;
