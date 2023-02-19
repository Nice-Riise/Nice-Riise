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
    shootConfetti();
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

function shootConfetti() {
  tsParticles.load("tsparticles", {
    "fullScreen": {
      "zIndex": 1
    },
    "emitters": [
      {
        "position": {
          "x": 0,
          "y": 30
        },
        "rate": {
          "quantity": 5,
          "delay": 0.15
        },
        "particles": {
          "move": {
            "direction": "top-right",
            "outModes": {
              "top": "none",
              "left": "none",
              "default": "destroy"
            }
          }
        }
      },
      {
        "position": {
          "x": 100,
          "y": 30
        },
        "rate": {
          "quantity": 5,
          "delay": 0.15
        },
        "particles": {
          "move": {
            "direction": "top-left",
            "outModes": {
              "top": "none",
              "right": "none",
              "default": "destroy"
            }
          }
        }
      }
    ],
    "particles": {
      "color": {
        "value": [
          "#ffffff",
          "#FF0000"
        ]
      },
      "move": {
        "decay": 0.05,
        "direction": "top",
        "enable": true,
        "gravity": {
          "enable": true
        },
        "outModes": {
          "top": "none",
          "default": "destroy"
        },
        "speed": {
          "min": 10,
          "max": 50
        }
      },
      "number": {
        "value": 0
      },
      "opacity": {
        "value": 1
      },
      "rotate": {
        "value": {
          "min": 0,
          "max": 360
        },
        "direction": "random",
        "animation": {
          "enable": true,
          "speed": 30
        }
      },
      "tilt": {
        "direction": "random",
        "enable": true,
        "value": {
          "min": 0,
          "max": 360
        },
        "animation": {
          "enable": true,
          "speed": 30
        }
      },
      "size": {
        "value": {
          "min": 0,
          "max": 2
        },
        "animation": {
          "enable": true,
          "startValue": "min",
          "count": 1,
          "speed": 16,
          "sync": true
        }
      },
      "roll": {
        "darken": {
          "enable": true,
          "value": 25
        },
        "enable": true,
        "speed": {
          "min": 5,
          "max": 15
        }
      },
      "wobble": {
        "distance": 30,
        "enable": true,
        "speed": {
          "min": -7,
          "max": 7
        }
      },
      "shape": {
        "type": [
          "circle",
          "square",
          "triangle",
          "polygon",
          "character",
          "image"
        ],
        "options": {
          "polygon": [
            {
              "sides": 5
            },
            {
              "sides": 6
            }
          ],
          "character": {
            "fill": true,
            "font": "Verdana",
            "style": "",
            "weight": 400,
            "particles": {
              "size": {
                "value": 8
              }
            },
            "value": [
              "💩",
              "🤡",
              "🍀",
              "🍙",
              "🦄",
              "⭐️"
            ]
          },
          "image": [
            {
              "src": "https://particles.js.org/images/fruits/apple.png",
              "width": 32,
              "height": 32,
              "particles": {
                "size": {
                  "value": 16
                }
              }
            },
            {
              "src": "https://particles.js.org/images/fruits/avocado.png",
              "width": 32,
              "height": 32,
              "particles": {
                "size": {
                  "value": 16
                }
              }
            },
            {
              "src": "https://particles.js.org/images/fruits/banana.png",
              "width": 32,
              "height": 32,
              "particles": {
                "size": {
                  "value": 16
                }
              }
            },
            {
              "src": "https://particles.js.org/images/fruits/berries.png",
              "width": 32,
              "height": 32,
              "particles": {
                "size": {
                  "value": 16
                }
              }
            },
            {
              "src": "https://particles.js.org/images/fruits/cherry.png",
              "width": 32,
              "height": 32,
              "particles": {
                "size": {
                  "value": 16
                }
              }
            },
            {
              "src": "https://particles.js.org/images/fruits/grapes.png",
              "width": 32,
              "height": 32,
              "particles": {
                "size": {
                  "value": 16
                }
              }
            },
            {
              "src": "https://particles.js.org/images/fruits/lemon.png",
              "width": 32,
              "height": 32,
              "particles": {
                "size": {
                  "value": 16
                }
              }
            },
            {
              "src": "https://particles.js.org/images/fruits/orange.png",
              "width": 32,
              "height": 32,
              "particles": {
                "size": {
                  "value": 16
                }
              }
            },
            {
              "src": "https://particles.js.org/images/fruits/peach.png",
              "width": 32,
              "height": 32,
              "particles": {
                "size": {
                  "value": 16
                }
              }
            },
            {
              "src": "https://particles.js.org/images/fruits/pear.png",
              "width": 32,
              "height": 32,
              "particles": {
                "size": {
                  "value": 16
                }
              }
            },
            {
              "src": "https://particles.js.org/images/fruits/pepper.png",
              "width": 32,
              "height": 32,
              "particles": {
                "size": {
                  "value": 16
                }
              }
            },
            {
              "src": "https://particles.js.org/images/fruits/plum.png",
              "width": 32,
              "height": 32,
              "particles": {
                "size": {
                  "value": 16
                }
              }
            },
            {
              "src": "https://particles.js.org/images/fruits/star.png",
              "width": 32,
              "height": 32,
              "particles": {
                "size": {
                  "value": 16
                }
              }
            },
            {
              "src": "https://particles.js.org/images/fruits/strawberry.png",
              "width": 32,
              "height": 32,
              "particles": {
                "size": {
                  "value": 16
                }
              }
            },
            {
              "src": "https://particles.js.org/images/fruits/watermelon.png",
              "width": 32,
              "height": 32,
              "particles": {
                "size": {
                  "value": 16
                }
              }
            },
            {
              "src": "https://particles.js.org/images/fruits/watermelon_slice.png",
              "width": 32,
              "height": 32,
              "particles": {
                "size": {
                  "value": 16
                }
              }
            }
          ]
        }
      }
    }
  })};