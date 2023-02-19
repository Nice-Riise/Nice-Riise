const cells = document.querySelectorAll(".js-cell");
const nextPlayer = document.querySelector(".js-next-player");
const resultMessage = document.querySelector("#result-message");
const newGameButton = document.querySelector("#new-game-button");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameOver = false;

function showResult(result) {
  gameOver = true;
  resultMessage.textContent = result;
  if (result.includes("wins")) {
    resultMessage.classList.add("blink");
    
  }
  newGameButton.style.display = "block";
}


function checkWinCondition(symbol) {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < winConditions.length; i++) {
    let win = true;
    for (let j = 0; j < winConditions[i].length; j++) {
      if (board[winConditions[i][j]] !== symbol) {
        win = false;
        break;
      }
    }
    if (win) {
      return true;
    }
  }
  return false;
}

function checkTieCondition() {
  return board.every(cell => cell !== "");
}

function handleClick(event) {
  const cellIndex = event.target.dataset.index;

  if (board[cellIndex] !== "" || gameOver) {
    return;
  }

  board[cellIndex] = currentPlayer;
  event.target.textContent = currentPlayer;

  if (checkWinCondition(currentPlayer)) {
    showResult(currentPlayer + " wins!");
  } else if (checkTieCondition()) {
    showResult("It's a tie!");
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    nextPlayer.textContent = "Next player: " + currentPlayer;
  }
}

function newGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameOver = false;

  cells.forEach(cell => {
    cell.textContent = "";
  });

  nextPlayer.textContent = "Next player: " + currentPlayer;
  resultMessage.textContent = "";
  resultMessage.classList.remove("blink"); // remove the "blink" class
  newGameButton.style.display = "none";
}


cells.forEach(cell => {
  cell.addEventListener("click", handleClick);
});

newGameButton.addEventListener("click", function() {
  location.reload();
});

