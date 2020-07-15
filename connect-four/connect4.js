/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

function makeBoard() {
    for (let y = 0; y < HEIGHT; y++) {
        board.push(Array.from({ length: WIDTH }));
    }
}
/** makeHtmlBoard: make HTML table and row of column tops. */
function makeHtmlBoard() {
    // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
    const board = document.getElementById('board');
    // TODO: add comment for this code
    const trow = document.createElement("tr");
    trow.setAttribute("id", "column-top");
    trow.addEventListener("click", handleClick);

    for (let x = 0; x < WIDTH; x++) {
        const headCell = document.createElement("td");
        headCell.setAttribute("id", x);
        trow.append(headCell);
    }
    board.append(trow);
    // TODO: add comment for this code
    for (let y = 0; y < HEIGHT; y++) {
        const row = document.createElement("tr");

        for (let x = 0; x < WIDTH; x++) {
            const cell = document.createElement("td");
            cell.setAttribute("id", `${y}-${x}`);
            row.append(cell);
        }
        board.append(row);
    }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
    for (let y = HEIGHT - 1; y >= 0; y--) {
        if (!board[y][x]) {
            return y;
        }
    }
    return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
    const piece = document.createElement('div');
    piece.classList.add('piece');
    piece.classList.add(`p${currPlayer}`);
    piece.style.top = -50 * (y + 2);


    const location = document.getElementById(`${y}-${x}`);
    location.append(piece);
}

/** endGame: announce game end */
function endGame(msg) {
    alert(msg);
    // TODO: pop up alert message
}
/** handleClick: handle click of column top to `play` piece */

function handleClick(evt) {
    // get x from ID of clicked cell
    const x = +evt.target.id;

    // get next spot in column (if none, ignore click)
    const y = findSpotForCol(x);
    if (y === null) {
        console.log(`${y}-${x}`);
        return;
    }

    // place piece in board and add to HTML table
    board[y][x] = currPlayer;
    // TODO: add line to update in-memory board
    placeInTable(y, x);

    // check for win
    if (checkForWin()) {
        return endGame(`Player ${currPlayer} won!`);
    }
    // check for tie
    if (board.every(row => row.every(cell => cell))) {
        return endGame('tie');
    }
    // TODO: check if all cells in board are filled; if so call, call endGame
    currPlayer = currPlayer === 1 ? 2 : 1;
    // switch players

    // TODO: switch currPlayer 1 <-> 2
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
    function _win(cells) {

        // Check four cells to see if they're all color of current player
        //  - cells: list of four (y, x) cells
        //  - returns true if all are legal coordinates & all match currPlayer

        return cells.every(
            ([y, x]) =>
            y >= 0 &&
            y < HEIGHT &&
            x >= 0 &&
            x < WIDTH &&
            board[y][x] === currPlayer
        );
    }

    // TODO: read and understand this code. Add comments to help you.

    for (let y = 0; y < HEIGHT; y++) {
        for (let x = 0; x < WIDTH; x++) {
            const horiz = [
                [y, x],
                [y, x + 1],
                [y, x + 2],
                [y, x + 3]
            ];
            const vert = [
                [y, x],
                [y + 1, x],
                [y + 2, x],
                [y + 3, x]
            ];
            const diagDR = [
                [y, x],
                [y + 1, x + 1],
                [y + 2, x + 2],
                [y + 3, x + 3]
            ];
            const diagDL = [
                [y, x],
                [y + 1, x - 1],
                [y + 2, x - 2],
                [y + 3, x - 3]
            ];

            if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
                return true;
            }
        }
    }
}

makeBoard();
makeHtmlBoard();