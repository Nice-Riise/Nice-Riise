function getBoardString(gameBoard) {
    let boardString = '';

    for (let i = 0; i < gameBoard.length; i += 1) {
        boardString += `${gameBoard[i] ?? i+1}`;
        if (i % 3 === 2) {
            boardString += '\n';
        }
    }

    return boardString;
}

function getUserInput(nextPlayerSymbol, gameBoard) {
    return +prompt(`Board:\n${getBoardString(gameBoard)} enter ${nextPlayerSymbol}'s next move (1-9):`);
    }  
    




function isMoveValid(move, gameBoard){
    const boardIndex = move -1;
    //move is a number
    // move is between 1 and 9 (inklusive)
    // gameBoard does not contain a symbol at the place of the move

    return (
        typeof move === 'number' &&
        move >= 1 && move <= 9 &&
        gameBoard[boardIndex] === null
    );
    
}

function makeAMove(gameBoard, nextPlayerSymbol){
            // clone the game bord before placing moves in it
            const newGameBoard = [...gameBoard];
            let move = null;
        do {
            move = getUserInput(nextPlayerSymbol, gameBoard);
        }
            while ( !isMoveValid(move, gameBoard) );
            const boardIndex = move -1;
            newGameBoard[boardIndex] = nextPlayerSymbol;
            // make the move
        return newGameBoard;

}

function hasLastMoverWon(lastMove, gameBoard) {
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
        if (gameBoard[i1] === lastMove &&
            gameBoard[i1] === gameBoard[i2] &&
            gameBoard[i1] === gameBoard[i3]
     ) {
     return true;
        } 
      }
    return false;      
      }


function isGameOver(gameBoard, currentPlayerSymbol) {
        // 1. check if there is a winner
        if (hasLastMoverWon(currentPlayerSymbol, gameBoard)) {
            // Write a message : last mover has won the game
            alert(`Gratulerer!, ${currentPlayerSymbol} Jøss Du Vant!`);
            return true;
        }
        // 2. check if the bord is full
        //function isBoardFull(board){
           // for (let element of board){
               // if (element === null){
                    //return false; bord
                      
     //return true;
       // også løsning: 
       if (gameBoard.every(element => element !== null))
        { alert(`uavgjort! Spill over!`); 
       
       return true;
    
    }
        
    return false; 
        
        //if (draw) { alert('Uavgjort!') return true;

        // 3. Return winner/draw OR not game over/ game in progress 
    
}

function ticTacToe() {
    //state space
     
    let gameBoard =  new Array(9).fill(null);
    let currentPlayerSymbol = null;
    
    // computations 
    do { 
        currentPlayerSymbol = currentPlayerSymbol === 'x' ? 'o' : 'x';
      gameBoard = makeAMove(gameBoard, currentPlayerSymbol);
    }  while ( !isGameOver(gameBoard, currentPlayerSymbol) );

        
    
    

    // return value
    // return udefined    




        } 