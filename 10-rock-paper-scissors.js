let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  tiesComputer: 0,
  player1Wins: 0,
  player2Wins: 0,
  tiesTwoPlayer: 0
};

const body = document.body;
let gameMode = ""; // "computer" or "twoPlayer"
let player1Move = ""; // store move in two-player mode
let player1Name = "Player 1";
let player2Name = "Player 2";
let pendingMove = null; // for player1's move

updateScoreElement();

// Show only rules when user first arrives
window.onload = function() {
  document.getElementById('rulesModal').style.display = 'flex';
};

// Close rules → then show mode selection
document.getElementById('closeRules').onclick = function() {
  document.getElementById('rulesModal').style.display = 'none';
  document.getElementById('modeSelection').style.display = 'flex';
};

// Start game based on mode
function startGame(mode) {
  gameMode = mode;
  document.getElementById('modeSelection').style.display = 'none';
  document.getElementById('gameSection').style.display = 'block';

  if (gameMode === "twoPlayer") {
    let p1 = prompt("Enter Player 1's name:", "").trim();
    let p2 = prompt("Enter Player 2's name:", "").trim();
    player1Name = p1 === "" ? "Player 1" : p1;
    player2Name = p2 === "" ? "Player 2" : p2;

    document.querySelector('.js-result').innerHTML = `${player1Name}'s turn!`;
    document.querySelector('.js-moves').innerHTML = "";
  } else {
    document.querySelector('.js-result').innerHTML = "Your turn!";
  }

  updateScoreElement();
}

// Main gameplay
function playGame(playerMove) {
  if (gameMode === "computer") {
    playVsComputer(playerMove);
  } else if (gameMode === "twoPlayer") {
    playTwoPlayer(playerMove);
  }
}

// ------------------ VS COMPUTER ------------------
function playVsComputer(playerMove) {
  const computerMove = pickComputerMove();
  let result = '';

  if (playerMove === 'scissors') {
    result = computerMove === 'rock' ? 'You lose.' :
             computerMove === 'paper' ? 'You Win.' : 'Tie.';
  } else if (playerMove === 'paper') {
    result = computerMove === 'rock' ? 'You Win.' :
             computerMove === 'paper' ? 'Tie.' : 'You lose.';
  } else if (playerMove === 'rock') {
    result = computerMove === 'rock' ? 'Tie.' :
             computerMove === 'paper' ? 'You lose.' : 'You Win.';
  }

  if (result === 'You Win.') score.wins++;
  else if (result === 'You lose.') score.losses++;
  else score.tiesComputer++;

  localStorage.setItem('score', JSON.stringify(score));
  updateScoreElement();

  document.querySelector('.js-result').innerHTML = result;
  document.querySelector('.js-moves').innerHTML =
    `You <img src="${playerMove}-emoji.png" class="move-icon">
     <img src="${computerMove}-emoji.png" class="move-icon"> Computer`;
}

// ------------------ TWO PLAYER ------------------
function playTwoPlayer(move) {
  if (!player1Move) {
    // First click → Player 1 move
    player1Move = move;
    document.querySelector('.js-result').innerHTML = `${player2Name}'s turn!`;
    document.querySelector('.js-moves').innerHTML = "";

    // Rotate for Player 2 (mobile only)
    if (window.innerWidth <= 768) {
      body.classList.add("rotate-180");
    }
  } else {
    // Second click → Player 2 move
    const player2Move = move;
    let result = "";

    if (player1Move === player2Move) {
      result = "It's a Tie!";
      score.tiesTwoPlayer++;
    } else if (
      (player1Move === "rock" && player2Move === "scissors") ||
      (player1Move === "paper" && player2Move === "rock") ||
      (player1Move === "scissors" && player2Move === "paper")
    ) {
      result = `${player1Name} Wins!`;
      score.player1Wins++;
    } else {
      result = `${player2Name} Wins!`;
      score.player2Wins++;
    }

    localStorage.setItem('score', JSON.stringify(score));
    updateScoreElement();

    document.querySelector('.js-result').innerHTML = result;
    document.querySelector('.js-moves').innerHTML =
      `${player1Name} <img src="${player1Move}-emoji.png" class="move-icon">
       <img src="${player2Move}-emoji.png" class="move-icon"> ${player2Name}`;

        // Rotate back after Player 2 plays (mobile only)
    if (window.innerWidth <= 768) {
      body.classList.remove("rotate-180");
    }
    // Reset for next round
    player1Move = "";
  }
}
function resetScore() {
  if (gameMode === "computer") {
    score.wins = 0;
    score.losses = 0;
    score.tiesComputer = 0;
  } else if (gameMode === "twoPlayer") {
    score.player1Wins = 0;
    score.player2Wins = 0;
    score.tiesTwoPlayer = 0;
  }

  localStorage.setItem('score', JSON.stringify(score));
  updateScoreElement();
}

// ------------------ Helpers ------------------
function updateScoreElement() {
  if (gameMode === "twoPlayer") {
    document.querySelector('.js-score').innerHTML =
      `${player1Name}: ${score.player1Wins}, ${player2Name}: ${score.player2Wins}, Ties: ${score.tiesTwoPlayer}`;
  } else {
    document.querySelector('.js-score').innerHTML =
      `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.tiesComputer}`;
  }
}

function pickComputerMove() {
  const randomNumber = Math.random();
  if (randomNumber < 1/3) return 'rock';
  else if (randomNumber < 2/3) return 'paper';
  else return 'scissors';
}
