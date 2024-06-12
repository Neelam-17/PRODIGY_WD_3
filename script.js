const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restart');

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(e) {
    const cell = e.target;
    const index = cell.getAttribute('data-index');

    if (gameState[index] !== '' || checkWinner()) return;

    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWinner()) {
        alert(`Player ${currentPlayer} wins!`);
    } else if (gameState.every(cell => cell !== '')) {
        alert('Draw!');
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWinner() {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return gameState[index] === currentPlayer;
        });
    });
}

function restartGame() {
    gameState = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    cells.forEach(cell => cell.textContent = '');
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);

function handleCellClick(e) {
    const cell = e.target;
    const index = cell.getAttribute('data-index');

    if (gameState[index] !== '' || checkWinner()) return;

    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWinner()) {
        alert(`Player ${currentPlayer} wins!`);
    } else if (gameState.every(cell => cell !== '')) {
        alert('Draw!');
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (currentPlayer === 'O') {
            aiMove();
        }
    }
}

function aiMove() {
    let availableCells = gameState.map((val, idx) => val === '' ? idx : null).filter(val => val !== null);
    let move = availableCells[Math.floor(Math.random() * availableCells.length)];
    gameState[move] = 'O';
    cells[move].textContent = 'O';

    if (checkWinner()) {
        alert(`Player ${currentPlayer} wins!`);
    } else if (gameState.every(cell => cell !== '')) {
        alert('Draw!');
    } else {
        currentPlayer = 'X';
    }
}
