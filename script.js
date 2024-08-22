const board = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
let currentPlayer = 'X';
let gameState = Array(9).fill('');

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

board.forEach(cell => {
    cell.addEventListener('click', () => {
        const index = cell.dataset.index;
        if (gameState[index] !== '' || checkWin()) return;

        gameState[index] = currentPlayer;
        cell.textContent = currentPlayer;
        
        if (checkWin()) {
            alert(`${currentPlayer} wins!`);
        } else if (gameState.every(cell => cell !== '')) {
            alert("It's a draw!");
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            makeAIMove();
        }
    });
});

resetButton.addEventListener('click', resetGame);

function makeAIMove() {
    let availableCells = gameState
        .map((cell, index) => (cell === '' ? index : null))
        .filter(index => index !== null);

    const randomIndex = Math.floor(Math.random() * availableCells.length);
    const aiMove = availableCells[randomIndex];

    gameState[aiMove] = currentPlayer;
    board[aiMove].textContent = currentPlayer;

    if (checkWin()) {
        alert(`${currentPlayer} wins!`);
    } else if (gameState.every(cell => cell !== '')) {
        alert("It's a draw!");
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWin() {
    return winConditions.some(condition => {
        return condition.every(index => gameState[index] === currentPlayer);
    });
}

function resetGame() {
    gameState.fill('');
    board.forEach(cell => (cell.textContent = ''));
    currentPlayer = 'X';
}