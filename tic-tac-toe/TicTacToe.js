const $cellList = document.querySelectorAll(".js-cell");
const $nextPlayerArea = document.querySelector(".js-next-player");
const $gameFinalStatus = document.querySelector(".js-winner");

let gameBoard = new Array(9).fill(null);
let currentPlayerSymbol = "X";

const flashInterval = 500; // interval in milliseconds
let flashing = false;

function startFlashing() {
  flashing = true;
  setInterval(() => {
    $gameFinalStatus.style.visibility =
      $gameFinalStatus.style.visibility === "visible" ? "hidden" : "visible";
  }, flashInterval);
}

function stopFlashing() {
  flashing = false;
  $gameFinalStatus.style.visibility = "visible";
}

function clickHandler(event) {
  const boardIndex = event.target.dataset.index;
  if (gameBoard[boardIndex] === null) {
    gameBoard[boardIndex] = currentPlayerSymbol;
    event.target.innerText = currentPlayerSymbol;
    if (hasLastMoverWon()) {
      $gameFinalStatus.innerHTML = `Yippee ki-yay!, ${currentPlayerSymbol} Has Won The Game`;
      startFlashing();
    } else if (gameBoard.every((element) => element !== null)) {
      $gameFinalStatus.innerHTML = `Draw. Both Stupid!.`;
    } else {
      currentPlayerSymbol = currentPlayerSymbol === "X" ? "O" : "X";
      $nextPlayerArea.innerHTML = `Next player: ${currentPlayerSymbol}`;
    }
  }
}

for (let $cell of $cellList) {
  $cell.addEventListener("click", clickHandler);
}

function hasLastMoverWon() {
  let winnerCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let [i1, i2, i3] of winnerCombos) {
    if (
      gameBoard[i1] === currentPlayerSymbol &&
      gameBoard[i1] === gameBoard[i2] &&
      gameBoard[i1] === gameBoard[i3]
    ) {
      return true;
    }
  }
  return false;
}

