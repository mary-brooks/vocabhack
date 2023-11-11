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

const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart-button');
const tryAgainButton = document.getElementById('try-again-button');

const languageGame = new LanguageGame(cards);

window.onload = function () {
  /* function playSound() {
    const sound = new Audio('/sound/apple.mp3');
    sound.play();
  }

  playSound(); */

  setInterval(updateGradient, 10);

  startButton.addEventListener('click', function () {
    languageGame.start();

    document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('click', () => {
        handleClick(card);
      });
    });

    // languageGame.timer();
  });

  restartButton.addEventListener('click', () => {
    location.reload();
  });

  tryAgainButton.addEventListener('click', () => {
    location.reload();
  });
};

function handleClick(card) {
  console.log('clicked');

  languageGame.selectCard(card);

  if (languageGame.pickedCards.length === 2) {
    languageGame.matchCards();
  }
}
