//Gameboard object that uses an array to store the board's state.
const gameBoard = (function GameBoard(){
    let board = ["", "", "", "", "", "", "", "", ""];

    // This is the "tool"
    const getBoard = () => board; 

    // This is the "toolbox" we return
    return { getBoard };
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

    // We return our "toolbox"
    return { getCurrentPlayer };
    
})();