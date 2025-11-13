// Gameboard object
const gameBoard = (function () {
    let board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => board;

    function markSpot(index, marker) {
        if (board[index] === "") {
            board[index] = marker;
            return true;
        }
        return false;
    }

    const resetBoard = () => {
        board = ["", "", "", "", "", "", "", "", ""];
    };

    return { getBoard, markSpot, resetBoard };
})();

// Player factory
function createPlayer(name, marker) {
    return { name, marker };
}

// Game controller
const gameController = (function () {
    let player1 = createPlayer("Player 1", "X");
    let player2 = createPlayer("Player 2", "O");
    let currentPlayer = player1;
    let gameIsOver = false;

    const getCurrentPlayer = () => currentPlayer;

    function startGame(name1, name2) {
        player1.name = name1 || "Player 1";
        player2.name = name2 || "Player 2";

        currentPlayer = player1;
        gameIsOver = false;
        gameBoard.resetBoard();
        displayController.render();
        displayController.setMessage(`${currentPlayer.name}'s turn (X)`);
    }

    function playTurn(index) {
        if (gameIsOver) return;

        const player = getCurrentPlayer();
        const success = gameBoard.markSpot(index, player.marker);

        if (!success) return;

        if (checkForWin(player.marker)) {
            displayController.setMessage(`${player.name} wins!`);
            gameIsOver = true;
        } else if (checkForTie()) {
            displayController.setMessage("It's a tie!");
            gameIsOver = true;
        } else {
            switchTurn();
            displayController.setMessage(`${currentPlayer.name}'s turn (${currentPlayer.marker})`);
        }

        displayController.render();
    }

    function switchTurn() {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }

    function checkForWin(marker) {
        const b = gameBoard.getBoard();
        const wins = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        return wins.some(w => w.every(i => b[i] === marker));
    }

    function checkForTie() {
        return !gameBoard.getBoard().includes("");
    }

    return { playTurn, startGame, getCurrentPlayer };
})();

// Display controller
const displayController = (function () {
    const container = document.getElementById("game-board");
    const messageArea = document.getElementById("message-area");
    const startBtn = document.getElementById("start-button");

    const p1Input = document.getElementById("player1");
    const p2Input = document.getElementById("player2");

    const render = () => {
        const board = gameBoard.getBoard();
        container.innerHTML = "";

        board.forEach((val, i) => {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            if (val === "X") cell.classList.add("x");
            if (val === "O") cell.classList.add("o");

            cell.dataset.index = i;
            cell.textContent = val;

            container.appendChild(cell);
        });
    };

    const setMessage = (msg) => {
        messageArea.textContent = msg;
    };

    container.addEventListener("click", (e) => {
        if (e.target.classList.contains("cell")) {
            gameController.playTurn(parseInt(e.target.dataset.index));
        }
    });

    startBtn.addEventListener("click", () => {
        gameController.startGame(p1Input.value, p2Input.value);
    });

    return { render, setMessage };
})();

displayController.render();
