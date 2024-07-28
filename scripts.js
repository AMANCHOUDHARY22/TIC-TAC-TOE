document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('resetButton');
    const statusText = document.getElementById('status');
    const popup = document.getElementById('popup');
    const closePopup = document.getElementById('closePopup');
    const winnerMessage = document.getElementById('winnerMessage');
    let board = ['', '', '', '', '', '', '', '', ''];
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

    const handleResultValidation = () => {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            statusText.textContent = `Player ${currentPlayer} wins!`;
            winnerMessage.textContent = `Player ${currentPlayer} wins!`;
            popup.style.display = 'flex';
            setTimeout(() => popup.style.display = 'none', 5000);
            isGameActive = false;
            return;
        }

        if (!board.includes('')) {
            statusText.textContent = 'Draw!';
            winnerMessage.textContent = 'Draw!';
            popup.style.display = 'flex';
            setTimeout(() => popup.style.display = 'none', 5000);
            isGameActive = false;
        }
    };

    const handleCellClick = (event) => {
        const clickedCell = event.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

        if (board[clickedCellIndex] !== '' || !isGameActive) {
            return;
        }

        board[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
        handleResultValidation();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    };

    const handleRestartGame = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        currentPlayer = 'X';
        statusText.textContent = '';
        cells.forEach(cell => cell.textContent = '');
        popup.style.display = 'none';
    };

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', handleRestartGame);
    closePopup.addEventListener('click', () => popup.style.display = 'none');
});
