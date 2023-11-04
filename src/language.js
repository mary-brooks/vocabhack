class LanguageGame {
  constructor(cards) {
    this.cards = cards;
    this.pickedCards = [];
    this.cardPairs = [];
    this.startScreen = document.getElementById('game-intro');
    this.gameScreen = document.getElementById('game-screen');
    this.gameEndScreen = document.getElementById('game-end');

    this.shuffleCards();
  }

  start() {
    this.startScreen.style.display = 'none';
    this.gameScreen.style.display = 'block';
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

  endGame() {
    this.gameScreen.style.display = 'none';
    this.gameEndScreen.style.display = 'block';
  }
}
