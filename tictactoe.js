const board = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
const resetScoresButton = document.getElementById('resetScores');
let currentPlayer = 'X';
let gameState = Array(9).fill('');
let scoreX = 0;
let scoreO = 0;

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

document.addEventListener('DOMContentLoaded', () => {
    scoreX = parseInt(localStorage.getItem('scoreX')) || 0;
    scoreO = parseInt(localStorage.getItem('scoreO')) || 0;
    document.getElementById('scoreX').textContent = scoreX;
    document.getElementById('scoreO').textContent = scoreO;
});

function updateScores() {
    localStorage.setItem('scoreX', scoreX);
    localStorage.setItem('scoreO', scoreO);
    document.getElementById('scoreX').textContent = scoreX;
    document.getElementById('scoreO').textContent = scoreO;
}

board.forEach(cell => {
    cell.addEventListener('click', () => {
        const index = cell.dataset.index;
        if (gameState[index] !== '' || checkWinner()) return;

        gameState[index] = currentPlayer;
        cell.textContent = currentPlayer;
        
        const winner = checkWinner();
        if (winner) {
            if (winner === 'X') {
                scoreX++;
                updateScores();
                document.getElementById('scoreX').textContent = scoreX;
                alert(`Player X wins!`);
            } else if (winner === 'O') {
                scoreO++;
                updateScores();
                document.getElementById('scoreO').textContent = scoreO;
                alert(`Player O wins!`);
            }
            resetGame();
        } else if (gameState.every(cell => cell !== '')) {
            alert("It's a draw!");
            resetGame();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            if (currentPlayer === 'O') {
                makeAIMove();
            }
        }
    });
});

resetButton.addEventListener('click', () => {
    resetGame();
});

resetScoresButton.addEventListener('click', () => {
    scoreX = 0;
    scoreO = 0;
    updateScores();
    localStorage.removeItem('scoreX');
    localStorage.removeItem('scoreO');
});

function makeAIMove() {
    let availableCells = gameState
        .map((cell, index) => (cell === '' ? index : null))
        .filter(index => index !== null);

    const randomIndex = Math.floor(Math.random() * availableCells.length);
    const aiMove = availableCells[randomIndex];

    gameState[aiMove] = currentPlayer;
    board[aiMove].textContent = currentPlayer;

    const winner = checkWinner();
    if (winner) {
        if (winner === 'X') {
            scoreX++;
            alert(`Player X wins!`);
        } else if (winner === 'O') {
            scoreO++;
            alert(`Player O wins!`);
        }
        updateScores();
        resetGame();
    } else if (gameState.every(cell => cell !== '')) {
        alert("It's a draw!");
        resetGame();
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWinner() {
    for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            return gameState[a];
        }
    }
    return null;
}

function resetGame() {
    gameState.fill('');
    board.forEach(cell => (cell.textContent = ''));
    currentPlayer = 'X';
}