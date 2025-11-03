import React from "react";
import { Cells } from "./models/gameType";
import { createLanguageService } from "typescript";

function Proba() {
  const checkRowWinner = (row: Cells[], winnerCount: number): boolean => {
    let counter: number = 0;
    let currentValue: Cells = null;
    row.forEach((row) => {
      if (counter === winnerCount) {
        return;
      }
      if (currentValue == row && currentValue != null) {
        counter++;
      } else {
        counter = 1;
        currentValue = row;
      }
    });

    return counter === winnerCount;
  };

  const checkColWinner = (board: Cells[][]): boolean => {
    for (let col = 0; col < board[0].length; col++) {
      let newArr: Cells[] = [];
      for (let row = 0; row < board.length; row++) {
        newArr = [...newArr, board[row][col]];
      }
      const isWinnerInCol = checkRowWinner(newArr, 3);
      if (isWinnerInCol) {
        return true;
      }
    }
    return false;
  };

  function getNullArray(amount: number) {
    const nullArr = Array(amount).fill(null);
    return nullArr;
  }

  console.log(getNullArray(4));
  function checkBoardWinner(board: Cells[][]) {
    let addElements: number = board[0].length;

    // ROWS
    const isWinnerInRow = board.some((el) => {
      return checkRowWinner(el, 3);
    });

    if (isWinnerInRow) {
      return isWinnerInRow;
    }


    checkColWinner(board);
    //diagonal1
    const diagonalBoard1 = board.map((el, ind) => {
      let length = board[0].length - 1;
      

      return [...getNullArray(length - ind), ...el, ...getNullArray(ind)];
    });
    const isDiagonalWinner = checkColWinner(diagonalBoard1);
    


    //diagonal2
     const diagonalBoard2 = board.map((el, ind) => {
      let length = board[0].length - 1;
      //const addNull: null[] = getNullArray(length);

      return [ ...getNullArray(ind), ...el,...getNullArray(length - ind)];
    });
    const isDiagonalWinner2 = checkColWinner(diagonalBoard2);
    if (isDiagonalWinner2|| isDiagonalWinner) {
      return true;
    }


    return false;
    
  }

  const boardWithWinningRow: Cells[][] = [
    [null, "X", "0"],
    [null, null, "0"],
    ["X", "X", "X"], //
  ];
  //checkWinner(boardWithWinningRow); // EXPECTED RESULT TRUE

  const boardWithWinningRow2: Cells[][] = [
    [null, "X", "0", null],
    [null, null, "0", null],
    ["X", "X", "X", null], //
    ["X", "X", null, null],
  ];
  //console.log( checkWinner(boardWithWinningRow2)); // EXPECTED RESULT TRUE

  const boardWithWinningRow3: Cells[][] = [
    [null, "X", "0", null],
    [null, null, "0", null],
    ["X", "X", null, "X"],
    ["X", "X", null, null],
  ];
  // const row = boardWithWinningRow2.map((el) => {
  //   console.log(checkWinner(el, 3));
  // });

  //  console.log(row.some((el)=>{el==true}))
  //console.log(checkRowWinner(["0", "0", "0", null, "X"], 3));
  console.log(checkBoardWinner(boardWithWinningRow2), "row");
  // console.log(checkWinner(["0", "X", "0", "0", "0"], 3));
  // console.log(checkWinner([null, null, null, null, null], 3));
  // console.log(checkWinner(["0", "X", "0", "X", "0"], 3));

  // EXPECTED RESULT FALSE

  const boardWithWinningColumn = [
    [null, "X", "O"],
    [null, null, "O"],
    ["X", null, "O"],
  ];
  //checkWinner(boardWithWinningColumn); // EXPECTED RESULT TRUE

  const boardWithWinningColumn2: Cells[][] = [
    ["0", null, null, "X"],
    ["0", null, null, null],
    ["0", null, "X", null],
    ["0", null, "X", null],
  ];

  const boardWithWinningColumn22: Cells[][] = [
    [null, "0", null, "X"],
    [null, "0", null, null],
    [null, "0", "X", null],
    [null, "0", "X", null],
  ];
  //console.log( checkBoardWinner(boardWithWinningColumn2),"col"); // EXPECTED RESULT TRUE

  const boardWithWinningColumn3: Cells[][] = [
    [null, null, "X", "0"],
    [null, null, null, "0"],
    [null, "X", null, null],
    [null, "X", null, "0"],
  ];
  const boardWithWinningDiag: Cells[][] = [
    ["X", null, "X", "0"],
    [null, "X", null, "0"],
    [null, "X", "X", null],
    [null, "X", null, "0"],
  ];

   const boardWithWinningDiag2: Cells[][] = [
    ["X", null, "X", "0"],
    [null, null, "0", "0"],
    [null, "0", "X", null],
    ["0", "X", null, "0"],
  ];

   const boardWithWinningDiag3: Cells[][] = [
    ["X", null, "X", "0"],
    [null, null, null, "0"],
    [null, "0", "X", null],
    ["0", "X", null, "0"],
  ];
  console.log(checkBoardWinner(boardWithWinningColumn3), "col"); // EXPECTED RESULT FALSE
  //console.log(checkBoardWinner(boardWithWinningColumn22), "col 2222"); // EXPECTED RESULT FALSE
  console.log(checkBoardWinner(boardWithWinningDiag), "diag");
    console.log(checkBoardWinner(boardWithWinningDiag2), "diag2");
      console.log(checkBoardWinner(boardWithWinningDiag3), "diag3");

  return <div></div>;
}

export default Proba;
