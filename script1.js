/* scripts.js */

document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const resetBtn = document.getElementById('resetBtn');
    const statusText = document.querySelector('.status');
    let board = Array(9).fill(null);
    let currentPlayer = 'X';
    let isGameActive = true;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetBtn.addEventListener('click', resetGame);

    function handleCellClick(e) {
        const cell = e.target;
        const cellIndex = cell.getAttribute('data-index');

        if (board[cellIndex] || !isGameActive) return;

        updateCell(cell, cellIndex);
        checkForWinner();
    }

    function updateCell(cell, index) {
        board[index] = currentPlayer;
        cell.textContent = currentPlayer;
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusText.textContent = `Player ${currentPlayer}'s turn`;
    }

    function checkForWinner() {
        let roundWon = false;

        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            statusText.textContent = `Player ${currentPlayer === 'X' ? 'O' : 'X'} wins!`;
            isGameActive = false;
            return;
        }

        if (!board.includes(null)) {
            statusText.textContent = `It's a draw!`;
            isGameActive = false;
            return;
        }
    }

    function resetGame() {
        board.fill(null);
        cells.forEach(cell => (cell.textContent = ''));
        currentPlayer = 'X';
        isGameActive = true;
        statusText.textContent = `Player X's turn`;
    }
});
