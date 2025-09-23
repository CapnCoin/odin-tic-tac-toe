function Player(marker, name){
    return {marker, name};
}

const GameBoard = (function(){
    let board = ['','','','','','','','',''];

    /**
     * pretty self explanitory don't you think?
     * @returns the game board
     */
    const getBoard = () => board;

    /**
     * places a marker on the board.
     * @param {number} index - index on the board to place the marker.
     * @param {string} marker - marker to be placed.
     * @returns {bool} true if marker has been placed. false if the marker could not be placed.
     */
    const placeMarker = (index, marker) => {
        if(board[index] === ''){
            board[index] = marker;
            return true;
        }

        return false;
    }

    /**
     * resets all markers on the board
     */
    const resetBoard = () => {
        board.forEach((index) => {
            index = '';
        });
    }

    return {getBoard, placeMarker, resetBoard};
})();

const GameController = (function(){
    const player1 = Player('X', 'Player1');
    const player2 = Player('O', 'Player2');

    let gameEnded = false;
    let currentPlayer = player1;

    const getCurrentPlayer = () => currentPlayer;

    /**
     * switches between players
     */
    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }

    /**
     * 
     * @returns 'X' or 'O' if there is a winner, 'tie' if it is a tie, or null if there is no winner or tie
     */
    const checkForWin = () => {
        const board = GameBoard.getBoard();

        const winConditions = [
            //horizontal
            [0,1,2],[3,4,5],[6,7,8],
            //vertical
            [0,3,6],[1,4,7],[2,5,8],
            //diagonal
            [0,4,8],[2,4,6]
        ];

        for(const [a, b, c] of winConditions) {
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a]; // return 'X' or 'O' if there is a winner
            }
        }

        if(!board.includes('')) return 'tie'; //return 'tie' if it is a tie
        
        return null; //return null if there is no winner
    }

    /**
     * sets gameEnded to true if there is a winner or switches the player if not
     * @param {number} index - index on board where player clicked
     */
    const playRound = (index) => {
        if(gameEnded) return; //exit if the game has already been won

        const winVar = checkForWin();

        if(winVar){
            gameEnded = true;
            console.log(winVar);
        }
        else{
            switchPlayer();
        }
    }

    /**
     * resets the board, current player, and gameEnded
     */
    const resetGame = () => {
        GameBoard.resetBoard();
        currentPlayer = player1;
        gameEnded = false;
    }

    const getGameEnded = () => gameEnded;

    return {playRound, resetGame, getCurrentPlayer, checkForWin, getGameEnded};
})();

const DisplayController = (function(){
    //DOM elements
    const statusWindow = document.getElementById('status-window');

    const render = () => {
        const container = document.getElementById('container');
        const board = GameBoard.getBoard();

        for(let i = 0; i < board.length; i++){
            //create cell
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.index = i;
            cell.textContent = board[i];

            //add to container
            container.appendChild(cell);
        }
    }

    const refresh = () => {
        const container = document.getElementById('container');

        //clear all children
        while(container.firstElementChild){
            container.removeChild(container.firstElementChild);
        }

        render();
    }

    const updateStatusWindow = () => {
        const winStatus = GameController.checkForWin();

        switch (winStatus){
            case 'X':
                statusWindow.textContent = 'Player1 is the winner!';
                break;

            case 'O':
                statusWindow.textContent = 'Player2 is the winner!';
                break;

            case 'tie':
                case 'X':
                statusWindow.textContent = "It's a tie!";
                break;

            case null:
                case 'X':
                statusWindow.textContent = `It's ${GameController.getCurrentPlayer().name}'s turn.`;
                break;

            default:
                console.log('error in updateStatusWindow');
        }
    }

    return {refresh, updateStatusWindow};
})();

document.addEventListener('click', (event) => {
    if(event.target.classList.contains('cell')){
        const cell = event.target;
        const currentPlayer = GameController.getCurrentPlayer();
        const index = cell.dataset.index;

        if(GameBoard.placeMarker(index, currentPlayer.marker) && GameController.getGameEnded() === false){
            cell.textContent = currentPlayer.marker;
            GameController.playRound();
            DisplayController.refresh();
            DisplayController.updateStatusWindow();
        }
    }
});

//first render
DisplayController.refresh();
DisplayController.updateStatusWindow();