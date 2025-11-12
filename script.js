//Gameboard object that uses an array to store the board's state.
const gameBoard = (function GameBoard(){
    let board = ["", "", "", "", "", "", "", "", ""];
    return function getBoard(){
        return board;
    }
})();

//Player objects to hold player data (like their name and marker).
function Player(playerName, playerMarker){
    const name = playerName;
    const marker = playerMarker;
    return {name, marker};
}

//GameController object to manage the overall game flow.
const gameController = (function GameController(){

})();