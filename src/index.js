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

const colors = new Array(
  [252, 159, 244], // pink
  [255, 174, 227], // pink
  [144, 202, 227], // blue
  [118, 239, 240], // blue
  [238, 230, 135], // yellow
  [249, 155, 138]
); // yellow

let step = 0;
let colorIndices = [0, 1, 2, 3];
let gradientSpeed = 0.015;

function updateGradient() {
  if ($ === undefined) return;

  let c0_0 = colors[colorIndices[0]];
  let c0_1 = colors[colorIndices[1]];
  let c1_0 = colors[colorIndices[2]];
  let c1_1 = colors[colorIndices[3]];

  let istep = 1 - step;

  let r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
  let g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
  let b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
  let color1 = 'rgb(' + r1 + ',' + g1 + ',' + b1 + ')';

  let r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
  let g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
  let b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
  let color2 = 'rgb(' + r2 + ',' + g2 + ',' + b2 + ')';

  $('#gradient')
    .css({
      background:
        '-webkit-gradient(linear, left top, right top, from(' +
        color1 +
        '), to(' +
        color2 +
        '))',
    })
    .css({
      background:
        '-moz-linear-gradient(left, ' + color1 + ' 0%, ' + color2 + ' 100%)',
    });

  step += gradientSpeed;
  if (step >= 1) {
    step %= 1;
    colorIndices[0] = colorIndices[1];
    colorIndices[2] = colorIndices[3];
    colorIndices[1] =
      (colorIndices[1] + Math.floor(1 + Math.random() * (colors.length - 1))) %
      colors.length;
    colorIndices[3] =
      (colorIndices[3] + Math.floor(1 + Math.random() * (colors.length - 1))) %
      colors.length;
  }
}

const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart-button');

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

    languageGame.timer();
  });

  restartButton.addEventListener('click', () => {
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
