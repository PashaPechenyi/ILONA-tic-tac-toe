import React, { useEffect, useState } from "react";
import { Cells } from "./models/gameType";
import { Player } from "./models/gameType";
import "./main.css";
import Cell from "./Cell";

const calculateIsDraw = (cells: Cells[], winner: Player | null) => {
  const isBoardFilled = !cells.includes(null);
  const isDraw = !winner && isBoardFilled;
  return isDraw;
};

// const calculateCells = (turnsHistory) => {
//   return cells;
// };

function Main() {
  // turnsHistory
  const [cells, setCells] = useState<Cells[]>(Array(9).fill(null));
  const [activePlayer, setActivePlayer] = useState<Player>("X");
  const [winner, setWinner] = useState<Player | null>(null);
  const [winnerCombination, setWinnerCombination] = useState<number[] | null>(
    null
  );

  //const cells = calculateCells(turnsHistory);
  const isDraw = calculateIsDraw(cells, winner); // const [isBoardFilled, setIsBoardFilled] = useState<boolean>(false);
  const combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function gameWinner(cellsList: Cells[]) {
    combinations.forEach((oneCombination, ind) => {
      if (
        cellsList[oneCombination[0]] == cellsList[oneCombination[1]] &&
        cellsList[oneCombination[0]] == cellsList[oneCombination[2]] &&
        cellsList[oneCombination[0]] != null
      ) {
        setWinner(cellsList[oneCombination[0]]);
        setWinnerCombination(oneCombination);
      }
    });
  }
  console.log(winnerCombination, "winnerCombination");

  function changePole(ind: number) {
    const updatedCells = cells.map<Cells>((el, index) => {
      if (ind === index && el == null && winner == null) {
        return activePlayer;
      }
      return el;
    });
    setCells(updatedCells);
    changePlayer();

    gameWinner(updatedCells);
  }
  function changePlayer() {
    const newActivePlayer = activePlayer == "X" ? "0" : "X";
    setActivePlayer(newActivePlayer);
  }

  // useEffect(() => {
  //   gameWinner();
  // }, [cells]);

  return (
    <center>
      {isDraw && <p>Draw!</p>}
      {winner && (
        <div className={winner !== null ? "endWindow" : "endWindowHidden"}>
          The End! Player:
          <span className={winner == "0" ? "span0" : "spanX"}>{winner}</span> is
          the winner
        </div>
      )}

      <div className="con">
        {cells.map((el, ind) => (
          <div
            style={winnerCombination?.includes(ind) ? { color: "green" } : {}}
            className={el == "X" ? "d" : "d2"}
            key={ind}
            onClick={() => {
              changePole(ind);
            }}
          >
            {el}
          </div>
        ))}
      </div>
      {winner && (
        <button
          className="newGame"
          onClick={() => {
            setActivePlayer("X");
            setCells(Array(9).fill(null));
            setWinner(null);
            setWinnerCombination(null);
          }}
        >
          New Game
        </button>
      )}
    </center>
  );
}

export default Main;
