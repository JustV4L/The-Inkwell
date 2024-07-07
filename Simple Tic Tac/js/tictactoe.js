document.addEventListener('DOMContentLoaded', () => {
  let gameBoard = Array(9).fill('');
  let currentPlayer = 'X';
  let gameOver = false;
  let playAgainstAI = false;

  const cells = document.querySelectorAll('.field');
  const gameStatus = document.getElementById('game-status');
  const playBtn = document.getElementById('play-btn');
  const multiplayerBtn = document.getElementById('multiplayer-btn');
  const restartBtn = document.getElementById('restart-btn');

  cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
      if (gameOver || gameBoard[index] !== '') return;
      makeMove(index, currentPlayer);
      if (checkWin(gameBoard, currentPlayer)) {
        gameStatus.textContent = `Player ${currentPlayer} wins!`;
        gameOver = true;
      } else if (!gameBoard.includes('')) {
        gameStatus.textContent = 'It\'s a draw!';
        gameOver = true;
      } else {
        switchPlayer();
        if (currentPlayer === 'O' && playAgainstAI) {
          makeAIMove();
        }
      }
    });
  });

  playBtn.addEventListener('click', () => startGame(true));
  multiplayerBtn.addEventListener('click', () => startGame(false));
  restartBtn.addEventListener('click', () => startGame(playAgainstAI));

  function startGame(ai) {
    gameBoard = Array(9).fill('');
    gameOver = false;
    currentPlayer = 'X';
    gameStatus.textContent = '';
    playAgainstAI = ai;
    cells.forEach(cell => (cell.textContent = ''));
    if (playAgainstAI && currentPlayer === 'O') {
      makeAIMove();
    }
  }

  function makeMove(index, player) {
    gameBoard[index] = player;
    document.getElementById(index.toString()).textContent = player;
  }

  function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }

  function checkWin(board, player) {
    const winConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    return winConditions.some(([a, b, c]) => {
      return board[a] === player && board[a] === board[b] && board[a] === board[c];
    });
  }

  function makeAIMove() {
    let bestScore = -Infinity;
    let bestMove;
    for (let i = 0; i < 9; i++) {
      if (gameBoard[i] === '') {
        gameBoard[i] = 'O';
        const score = minimax(gameBoard, 0, false);
        gameBoard[i] = '';
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }
    makeMove(bestMove, 'O');
    if (checkWin(gameBoard, 'O')) {
      gameStatus.textContent = 'Player O wins!';
      gameOver = true;
    } else if (!gameBoard.includes('')) {
      gameStatus.textContent = 'It\'s a draw!';
      gameOver = true;
    } else {
      switchPlayer();
    }
  }

  function minimax(board, depth, isMaximizing) {
    const winner = checkWinner(board);
    if (winner !== null) {
      return winner === 'X' ? -10 + depth : winner === 'O' ? 10 - depth : 0;
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === '') {
          board[i] = 'O';
          const score = minimax(board, depth + 1, false);
          board[i] = '';
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === '') {
          board[i] = 'X';
          const score = minimax(board, depth + 1, true);
          board[i] = '';
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  }

  function checkWinner(board) {
    const winConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (const [a, b, c] of winConditions) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    return board.includes('') ? null : 'draw';
  }
});


/* function of the exit button*/

// script.js
document.addEventListener('DOMContentLoaded', function() {
  const exitButton = document.getElementById('exit');
  exitButton.addEventListener('click', function() {
    window.location.href = '../curious minds.html'; // Navigate to specified URL on click
  });
});
