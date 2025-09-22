const GameBoard = (function(){
    let board = ['','','','','','','','','']

    //return current board state
    const getBoard = () => board;

    //place marker on board
    const placeMarker = (index, marker) => {
        if(board[index] === ''){
            board[index] = marker;
            return true; //successful placement of marker
        }

        return false; //could not place marker
    }

    //reset all board tiles to ''
    const resetBoard = () => {
        for(let i = 0; i < board.length; i ++){
            board[i] = '';
        }
    }

    return {getBoard, placeMarker, resetBoard};
})();

const Player = (name, marker) => {
    return {name, marker};
}

const GameControler = (function(){
    const player1 = Player(1, 'X');
    const player2 = Player(2, 'X');

    let activePlayer = player1;
    let gameOver = false;

    //return active player
    const getActivePlayer = () => activePlayer;

    //switch from current player to the next
    const switchPlayer = () => {
        activePlayer = activePlayer === player1 ? player2 : player1;
    }

    const checkForWin = () => {
        const board = GameBoard.getBoard();
        //index positions to check for wins
        const winConditions = [
            //horizontals
            [0,1,2], [3,4,5], [6,7,8],
            //verticals
            [0,3,6], [1,4,7], [2,5,8],
            //diagonals
            [0,4,8], [2,4,6]
        ];

        for(let condition in winConditions){
            //unpack condition
            const [a,b,c] = condition;

            if(board[a] && board[a] === board[b] && board[a] === board[c]){
                return board[a]; //returns 'X' or 'O' if there is a winner
            }
        }

        if(!board.includes('')) return 'tie' // return 'tie' if it is a tie

        return null; // return null if there is no winner yet
    }

    //main game logic
    const playRound = (index) => {
        if(gameOver) return; //stop game if there is a winner or a tie

        //only take action if it is a valid play
        if(GameBoard.placeMarker(index, getActivePlayer.marker)){
            const winner = checkForWin();

            if(winner){
                gameOver = true;
            }
            else{
                switchPlayer();
            }
        }
    }

    const restartGame = () => {
        GameBoard.resetBoard();
        activePlayer = player1;
        gameOver = false;
    }
})();

const DisplayController = (function(){
    //get DOM elements
    //function to render the board
    //function to update the status window
    //function to update the game status (used to check for a win and detirmine what should be rendered in the status window)
})();