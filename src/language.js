class LanguageGame {
  constructor(cards) {
    this.cards = cards;
    this.pickedCards = [];
    this.cardPairs = [];
    this.time = 30;

    this.startScreen = document.getElementById('game-intro');
    this.gameScreen = document.getElementById('game-screen');
    this.gameBoard = document.getElementById('game-board');
    this.gameEndScreen = document.getElementById('game-end');
    this.timeDisplay = document.getElementById('timer');

    this.shuffleCards();
  }

  start() {
    this.startScreen.style.display = 'none';
    this.gameScreen.style.display = 'block';
    this.createGameBoard();
  }

  createGameBoard() {
    let html = '';
    this.cards.forEach(card => {
      html += `
      <div class = "card" data-card-name = "${card.name}" style = "background: url(img/${card.img}) no-repeat">
      </div>
      `;
    });

    this.gameBoard.innerHTML = html;
  }

  updateGameBoard() {
    let newHtml = '';

    this.cards.forEach(card => {
      if (this.cardPairs.includes(card.name)) {
        newHtml += `<div class = "card matched" data-card-name = "${card.name}"></div>`;
      } else {
        newHtml += `<div class = "card" data-card-name = "${card.name}" style = "background: url(img/${card.img}) no-repeat"></div>`;
      }
    });

    this.gameBoard.innerHTML = newHtml;
  }

  shuffleCards() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  checkIfPair(card1, card2) {
    if (card1 === card2) {
      return true;
    } else {
      return false;
    }
  }

  checkIfFinished() {
    if (this.cardPairs.length === this.cards.length) {
      this.endGame();
    }
  }

  timer() {
    const timeLeft = setInterval(() => {
      this.timeDisplay.innerText = this.time;

      this.time--;

      if (this.time < 0) {
        clearInterval(timeLeft);
        this.endGame();
      }
    }, 1000);
  }

  // playSound(card) {
  //   const cardName = card.getAttribute('data-type-name');

  //   if (card.getAttribute('text')) {
  //     const sound = new Audio(`/sound/${cardName}.mp3`);
  //     sound.play();
  //   }
  // }

  endGame() {
    this.gameScreen.style.display = 'none';
    this.gameEndScreen.style.display = 'block';
  }
}
