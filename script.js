//Gameboard object that uses an array to store the board's state.
const gameBoard = (function GameBoard(){
    let board = ["", "", "", "", "", "", "", "", ""];

    // This is the "tool"
    const getBoard = () => board; 

    function markSpot(index, marker){
        if(board[index] === ""){
            board[index] = marker;
            return true;
        }
        else{
            return false;
        }
    }

    // This is the "toolbox" we return
    return { getBoard, markSpot };
})();

//Player objects to hold player data (like their name and marker).
function createPlayer(playerName, playerMarker){
    const name = playerName;
    const marker = playerMarker;
    return {name, marker};
}

//GameController object to manage the overall game flow.
const gameController = (function GameController(){
    const player1 = createPlayer("Player1","X");
    const player2 = createPlayer("Player2","O");
    let currentPlayer = player1;

    // A "tool" to get the current player
    const getCurrentPlayer = () => currentPlayer;

    function playTurn(index){
        const player = getCurrentPlayer();
        const moveSuccess = gameBoard.markSpot(index, player.marker);

        if(!moveSuccess){
            console.log("Spot already taken")
        }
        else{
            if(checkForWin(player.marker)){
                console.log(`${player.name} wins!`);
                //game is over - player.name wins
            }
            else{
                if(checkForTie()){
                    console.log("It's a tie!");
                    //game is over - tie
                }
                else{
                    switchTurn();
                    console.log(`It's ${getCurrentPlayer().name}'s turn.`);
                }
            }

        }
    }

    function switchTurn(){
        currentPlayer = (currentPlayer === player1) ? player2 : player1;
    }
    function checkForWin(marker){
        //We need to check all 8 winning combinations.
        const board = gameBoard.getBoard();
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]  // Diagonals
        ];
        for(let i=0; i<winConditions.length; i++){
            if(winConditions[i].every(index => board[index] === marker)){
                return true;
            }
        }
        return false;
    }
    function checkForTie(){
        //tie happens if the board is full.
        const board = gameBoard.getBoard();
        if(board.includes("")){
            return false;
        }
        return true;
    }
    // We return our "toolbox"
    return { getCurrentPlayer, playTurn };
    
})();

gameController.playTurn(0); // Player1's turn
// > It's Player2's turn.
gameController.playTurn(3); // Player2's turn
// > It's Player1's turn.
gameController.playTurn(1);
// > It's Player2's turn.
gameController.playTurn(4);
// > It's Player1's turn.
gameController.playTurn(2);
// > Player1 wins!