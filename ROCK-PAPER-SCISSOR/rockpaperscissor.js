        const score = JSON.parse(localStorage.getItem('score')) || {
            wins: 0,
            losses: 0,
            ties: 0
        };

        updateScore();

        /*
        if(!score) {
            score = {
                wins:0,
                losses:0,
                ties:0
            };
        }
        */

        let isAutoplay = false;

        let intervalId;


        function autoPlay() {

            if(!isAutoplay) {
                intervalId = setInterval(() => {
                const playerMove = pickComputerMove();
                gameMode(playerMove);
                },1000);
                isAutoplay = true;
            }else{
                clearInterval(intervalId);
                isAutoplay = false;
            }
        }


        document.querySelector('.js-rock-button').addEventListener('click', () => {
            gameMode('rock');
        });

        document.querySelector('.js-paper-button').addEventListener('click', () => {
            gameMode('paper');
        });

        document.querySelector('.js-scissor-button').addEventListener('click', () => {
            gameMode('Scissors');
        });


        document.body.addEventListener('keydown', (event) => {
            if(event.key === 'r') {
                gameMode('rock');
            } else if(event.key === 'p') {
                gameMode('paper');
            } else if(event.key === 's') {
                gameMode('Scissors');
            }
        });

        function gameMode(playerMove) {
            const computerMove = pickComputerMove();

            let result = '';

            if (playerMove === 'Scissors') {
                if (computerMove === 'rock') {
                    result = 'you lose';
                } else if (computerMove === 'paper') {
                    result = 'you win';
                } else if (computerMove === 'Scissors') {
                    result = 'tie';
                }
            } else if (playerMove === 'paper') {
                if (computerMove === 'rock') {
                    result = 'you win';
                } else if (computerMove === 'paper') {
                    result = 'tie';
                } else if (computerMove === 'Scissors') {
                    result = 'you lose';
                }
            } else if (playerMove === 'rock') {
                if (computerMove === 'rock') {
                    result = 'tie';
                } else if (computerMove === 'paper') {
                    result = 'you lose';
                } else if (computerMove === 'Scissors') {
                    result = 'you win';
                }
            }

            if (result === 'you win') {
                score.wins += 1;
            } else if (result === 'you lose') {
                score.losses += 1;
            } else if (result === 'tie') {
                score.ties += 1;
            }


            localStorage.setItem('score', JSON.stringify(score));

            updateScore();

            document.querySelector('.js-result').innerHTML = result;

            document.querySelector('.js-moves').innerHTML = `you
                <img src="${playerMove}-emoji.png" alt="scissor" class="pick-icon">
                <img src="${computerMove}-emoji.png" alt="scissor" class="pick-icon">
                computer `;

        }


        function updateScore() {
            document.querySelector('.js-score').innerHTML = `wins:${score.wins}, losses:${score.losses}, ties:${score.ties}`

        }

        function pickComputerMove() {
            const randomNumber = Math.random();

            let computerMove = '';

            if (randomNumber >= 0 && randomNumber < 1 / 3) {
                computerMove = 'rock';
            } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
                computerMove = 'paper';
            } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
                computerMove = 'Scissors';
            }

            return computerMove;

        }