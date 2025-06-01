let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

updateScoreElement();
/*
  if (!score) {
    score = {
      wins: 0,
      losses: 0,
      ties: 0,
    };
  }
    */

  function playGame(playerMove) {
    const computerMove = pickComputerMove();
    let result = '';
    if(playerMove === 'scissors') {
      if (computerMove === 'rock') {
      result = 'You lose.';
      } else if (computerMove === 'paper') {
      result ='You Win.';
      } else if (computerMove === 'scissors') {
      result = 'Tie.';
      }

    } else if(playerMove === 'paper') {
      if (computerMove === 'rock') {
      result = 'You Win.';
      } else if (computerMove === 'paper') {
      result ='Tie.';
      } else if (computerMove === 'scissors') {
      result = 'You lose.';
      }
      
    } else if(playerMove === 'rock') {
      if (computerMove === 'rock') {
      result = 'Tie.';
      } else if (computerMove === 'paper') {
      result ='You lose.';
      } else if (computerMove === 'scissors') {
      result = 'You Win.';
      }
    }

    if (result === 'You Win.') {
      score.wins += 1 ;
    } else if ( result === 'You lose.') {
      score.losses += 1;
    } else if (result === 'Tie.') {
      score.ties += 1;
    }

    localStorage.setItem('score',JSON.stringify(score));
    updateScoreElement();

    document.querySelector('.js-result').innerHTML = result ;

    document.querySelector('.js-moves').innerHTML =
    `You
    <img src="${playerMove}-emoji.png" class="move-icon">
    <img src="${computerMove}-emoji.png" class="move-icon">
    Computer`;

  
  }

  function updateScoreElement() {
    document.querySelector('.js-score')
  .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}` ;
  }
  
  function pickComputerMove() {
    let computerMove = '';
    const randomnumber = Math.random();
    if(randomnumber >=0 && randomnumber < 1/3 ) {
      computerMove = 'rock';
    } else if(randomnumber >= 1/3 && randomnumber < 2/3){
      computerMove = 'paper';
    } else if(randomnumber >=2/3 && randomnumber < 1){
      computerMove = 'scissors';
    }
    return computerMove;
  }