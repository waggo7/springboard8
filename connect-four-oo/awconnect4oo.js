class Game {
    constructor(height = 6, width = 7, p1, p2) {
        this.players = [p1, p2]
        this.height = height;
        this.width = width;
        this.board = board;
        this.makeBoard();
        this.makeHtmlBoard();
        this.currPlayer = p1;
        this.gameOver = false;
    }
    makeBoard() {
        this.board = [];
        for (let y = 0; y < this.HEIGHT; y++) {
            this.board.push(Array.from({ length: this.WIDTH }))
        }
    }
    makeHtmlBoard() {
        const board = document.getElementById('board');
        board.innerHTML = '';

        const top = document.createElement('tr');
        top.setAttribute('id', 'column-top');
        this.handleGameClick = this.handleClick.bind(this);
        top.addEventListener('click', this.handleClick);
        for (let x = 0; x < this.WIDTH; x++) {
            const headCell = document.createElement('td');
            headCell.setAttribute('id', x);
            top.append(headCell);
        }
        board.append(top);
        for (let y = 0; y < this.HEIGHT; y++) {
            const row = document.createElement('tr');
            for (let x = 0; x < this.WIDTH; x++) {
                const cell = document.createElement('td');
                cell.setAttribute('id', `${y}-${x}`);
                row.append(cell);
            }
            board.append(row);
        }
    }
    findSpotForCol(x) {
        for (let y = this.HEIGHT - 1; y >= 0; y--) {
            if (!this.board[y][x]) {
                return y;
            }
        }
        return null;
    }
    placeInTable(y, x) {
        const piece = document.createElement('div');
        piece.classList.add('piece');
        piece.style.backgroundColor = this.currPlayer.color;
        piece.style.top = -50 * (y + 2);

        const spot = document.getElementById(`${y}-${x}`);
        spot.append(piece);
    }

    endGame(msg) {
        alert(msg);
        const top = document.queryCommandValue('#column-top');
        top.removeEventListener('click', this.handleClick);
    }
    handleClick(evt) {
        const x = +evt.target.id;
        const y = this.findSpotForCol(x);
        if (y === null) {
            return;
        }
        this.board[y][x] = this.currPlayer;
        this.placeInTable(y, x);

        if (this.board.every(row => row.every(cell => cell))) {
            return this.endGame('Tie!');
        }
        if (this.checkForWin()) {
            this.gameOver = true;
            return this.endGame(`Player ${this.currPlayer.color} won!`);
        }

        this.currPlayer = this.currPlayer === this.players[0] ? this.players[1] : this.players[0]
    }

    checkForWin() {
        const _win = (cells) => {
            cells.every(
                ([y, x]) =>
                y >= 0 &&
                y < this.HEIGHT &&
                x >= 0 &&
                x < this.WIDTH &&
                this.board[y][x] === this.currPlayer
            );

            for (let y = 0; y < this.HEIGHT; y++) {
                for (let x = 0; x < this.WIDTH; x++) {
                    // get "check list" of 4 cells (starting here) for each of the different
                    // ways to win
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

                    // find winner (only checking each win-possibility as needed)
                    if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
                        return true;
                    }
                }
            }
        }
    }

}

class player {
    constructor(color) {
        this.color = color;
    }
}
document.getElementById("button").addEventListener('click', () => {
    let p1 = new player(document.getElementById('player1color').value);
    let p2 = new player(document.getElementById('player2color').value);
    new Game(p1, p2);
});