var oboard;
const humanPlayer = 'O';
const computer = 'X';
const winComb = [
    [0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
]
const cells = document.querySelectorAll('.cell');
start();

function start() {
    document.querySelector(".end").style.display = "none";
    oboard = Array.from(Array(9).keys());
    for(var i=0; i<cells.length; i++) {
        cells[i].innerText = '';
        cells[i].style.removeProperty('background-color');
        cells[i].addEventListener('click', turnClick, false);
    }
}

function turnClick(square) {
    if(typeof oboard[square.target.id] == 'number') {
        turn(square.target.id, humanPlayer);
        if(!checkTie())
            turn(bestSpot(), computer);
    }
}

function turn(squareId, player) {
	oboard[squareId] = player;
    document.getElementById(squareId).innerText = player;
    let gameWon = checkWin(oboard, player);
    if(gameWon)
        gameOver(gameWon);
}

function checkWin(board, player) {
    let plays = board.reduce((a, e, i) => 
        (e === player) ? a.concat(i) : a, []);
    let gameWon = null;
    for (let [index, win] of winComb.entries()) {
		if (win.every(elem => plays.indexOf(elem) > -1)) {
			gameWon = {index: index, player: player};
			break;
		}
	}
	return gameWon;
}

function gameOver(gameWon) {
	for (let index of winComb[gameWon.index]) {
		document.getElementById(index).style.backgroundColor =
			gameWon.player == humanPlayer ? "blue" : "red";
	}
	for (var i = 0; i < cells.length; i++) {
		cells[i].removeEventListener('click', turnClick, false);
    }
    declareWinner(gameWon.player == humanPlayer ? "You win!" : "You loose");
}

function bestSpot() {
    return emptySquares()[0];
}

function emptySquares() {
    return oboard.filter(s => typeof s == 'number');
}

function checkTie() {
    if(emptySquares().length == 0) {
        for(var i=0; i<cells.length; i++) {
            cells[i].style.backgroundColor = "green";
            cells[i].removeEventListener('click', turnClick, false);
        }
        declareWinner("Tie Game!");
        return true;
    }
    return false;
}

function declareWinner(who) {
    document.querySelector(".end").style.display= "block";
    document.querySelector(".end .text").innerText = who;
}
