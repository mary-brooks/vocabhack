const cards = [
  { name: 'apple', img: 'apple.png', type: 'img' },
  { name: 'banana', img: 'banana.png', type: 'img' },
  { name: 'blueberry', img: 'blueberry.png', type: 'img' },
  { name: 'cherry', img: 'cherry.png', type: 'img' },
  { name: 'grape', img: 'grapes.png', type: 'img' },
  { name: 'lemon', img: 'lemon.png', type: 'img' },
  { name: 'orange', img: 'orange.png', type: 'img' },
  { name: 'peach', img: 'peach.png', type: 'img' },
  { name: 'pear', img: 'pear.png', type: 'img' },
  { name: 'pineapple', img: 'pineapple.png', type: 'img' },
  { name: 'strawberry', img: 'strawberry.png', type: 'img' },
  { name: 'watermelon', img: 'watermelon.png', type: 'img' },
  { name: 'apple', img: 'apple-txt.png', type: 'text' },
  { name: 'banana', img: 'banana-txt.png', type: 'text' },
  { name: 'blueberry', img: 'blueberry-txt.png', type: 'text' },
  { name: 'cherry', img: 'cherry-txt.png', type: 'text' },
  { name: 'grape', img: 'grape-txt.png', type: 'text' },
  { name: 'lemon', img: 'lemon-txt.png', type: 'text' },
  { name: 'orange', img: 'orange-txt.png', type: 'text' },
  { name: 'peach', img: 'peach-txt.png', type: 'text' },
  { name: 'pear', img: 'pear-txt.png', type: 'text' },
  { name: 'pineapple', img: 'pineapple-txt.png', type: 'text' },
  { name: 'strawberry', img: 'strawberry-txt.png', type: 'text' },
  { name: 'watermelon', img: 'watermelon-txt.png', type: 'text' },
];

const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart-button');
const tryAgainButton = document.getElementById('try-again-button');

const languageGame = new LanguageGame(cards);

window.onload = function () {
  setInterval(updateGradient, 10);

  startButton.addEventListener('click', function () {
    languageGame.start();

    document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('click', () => {
        handleClick(card);
      });
    });
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
