const cards = [
  { name: 'apple', img: 'apple.png' },
  { name: 'banana', img: 'banana.png' },
  { name: 'blueberry', img: 'blueberry.png' },
  { name: 'cherry', img: 'cherry.png' },
  { name: 'grapes', img: 'grapes.png' },
  { name: 'lemon', img: 'lemon.png' },
  { name: 'orange', img: 'orange.png' },
  { name: 'peach', img: 'peach.png' },
  { name: 'pear', img: 'pear.png' },
  { name: 'pineapple', img: 'pineapple.png' },
  { name: 'strawberry', img: 'strawberry.png' },
  { name: 'watermelon', img: 'watermelon.png' },
  { name: 'apple', img: 'apple-txt.png' },
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

window.addEventListener('load', event => {
  let html = '';
  languageGame.cards.forEach(card => {
    html += `
    <div class = "card" data-card-name = "${card.name}" style = "background: url(img/${card.img}) no-repeat">
    </div>
    `;
  });

  document.querySelector('#game-board').innerHTML = html;

  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
      console.log('clicked');

      languageGame.pickedCards.push(card);

      if (languageGame.pickedCards.length === 2) {
        firstCard = languageGame.pickedCards[0].getAttribute('data-card-name');
        secondCard = languageGame.pickedCards[1].getAttribute('data-card-name');

        if (languageGame.checkIfPair(firstCard, secondCard)) {
          languageGame.pickedCards[0].setAttribute(
            'style',
            'background: acqua'
          );
          languageGame.pickedCards[1].setAttribute(
            'style',
            'background: acqua'
          );
        }

        languageGame.pickedCards.length = 0;
      }
    });
  });
});
