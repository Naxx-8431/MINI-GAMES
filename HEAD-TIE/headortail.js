const score =
  JSON.parse(localStorage.getItem('headTailScore')) || {
    wins: 0,
    losses: 0
  };

let isAutoPlaying = false;
let intervalId;

updateScoreElement();

function pickComputerMove() {
  const randomNumber = Math.random();
  return randomNumber < 0.5 ? 'head' : 'tail';
}

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = '';

  if (playerMove === computerMove) {
    result = 'you win';
    score.wins += 1;
  } else {
    result = 'you lose';
    score.losses += 1;
  }

  localStorage.setItem('headTailScore', JSON.stringify(score));

  document.querySelector('.js-result').innerHTML = result;

  document.querySelector('.js-moves').innerHTML =
    `you <span>${playerMove}</span> &nbsp;&nbsp; ` +
    `<span>${computerMove}</span> computer`;

  updateScoreElement();
}

function updateScoreElement() {
  document.querySelector('.js-score').innerHTML =
    `wins: ${score.wins}, losses: ${score.losses}`;
}

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  localStorage.removeItem('headTailScore');
  updateScoreElement();
  document.querySelector('.js-result').innerHTML = '';
  document.querySelector('.js-moves').innerHTML = '';
}

function toggleAutoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = Math.random() < 0.5 ? 'head' : 'tail';
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
    document.querySelector('.autoPlay-btn').textContent = 'Stop Auto Play';
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    document.querySelector('.autoPlay-btn').textContent = 'Auto Play';
  }
}
