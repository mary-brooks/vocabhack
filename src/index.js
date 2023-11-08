const cards = [
  { name: 'apple', img: 'apple.png' },
  { name: 'banana', img: 'banana.png' },
  { name: 'blueberry', img: 'blueberry.png' },
  { name: 'cherry', img: 'cherry.png' },
  { name: 'grape', img: 'grapes.png' },
  { name: 'lemon', img: 'lemon.png' },
  { name: 'orange', img: 'orange.png' },
  { name: 'peach', img: 'peach.png' },
  { name: 'pear', img: 'pear.png' },
  { name: 'pineapple', img: 'pineapple.png' },
  { name: 'strawberry', img: 'strawberry.png' },
  { name: 'watermelon', img: 'watermelon.png' },
  { name: 'apple', img: 'apple-txt.png', audio: 'apple.mp3' },
  { name: 'banana', img: 'banana-txt.png' },
  { name: 'blueberry', img: 'blueberry-txt.png' },
  { name: 'cherry', img: 'cherry-txt.png' },
  { name: 'grape', img: 'grape-txt.png' },
  { name: 'lemon', img: 'lemon-txt.png' },
  { name: 'orange', img: 'orange-txt.png' },
  { name: 'peach', img: 'peach-txt.png' },
  { name: 'pear', img: 'pear-txt.png' },
  { name: 'pineapple', img: 'pineapple-txt.png' },
  { name: 'strawberry', img: 'strawberry-txt.png' },
  { name: 'watermelon', img: 'watermelon-txt.png' },
];

const languageGame = new LanguageGame(cards);

window.onload = function () {
  const startButton = document.getElementById('start-button');
  const restartButton = document.getElementById('restart-button');

  /* function playSound() {
    const sound = new Audio('/sound/apple.mp3');
    sound.play();
  }

  playSound(); */

  startButton.addEventListener('click', function () {
    languageGame.start();

    document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('click', () => {
        handleClick(card, languageGame);
      });
    });

    languageGame.timer();
  });

  restartButton.addEventListener('click', () => {
    location.reload();
  });
};

function handleClick(card, game) {
  console.log('clicked');

  if (!game.pickedCards.includes(card)) {
    card.classList.toggle('clicked');
    game.pickedCards.push(card);
    // game.playSound(card);
  }

  if (game.pickedCards.length === 2) {
    firstCard = game.pickedCards[0].getAttribute('data-card-name');
    secondCard = game.pickedCards[1].getAttribute('data-card-name');

    if (game.checkIfPair(firstCard, secondCard)) {
      game.pickedCards.forEach(pickedCard => {
        game.cardPairs.push(pickedCard.getAttribute('data-card-name'));
      });

      game.checkIfFinished();

      game.shuffleCards();

      game.updateGameBoard();

      document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => {
          handleClick(card, languageGame);
        });
      });
    } else {
      game.pickedCards.forEach(pickedCard => {
        pickedCard.classList.add('incorrect');
      });

      setTimeout(() => {
        console.log('2 seconds has passed');

        game.pickedCards.forEach(pickedCard => {
          pickedCard.classList.remove('incorrect');
        });
      }, 2000);
    }

    game.pickedCards.length = 0;
  }
}
