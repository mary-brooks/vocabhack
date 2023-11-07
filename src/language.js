class LanguageGame {
  constructor(cards) {
    this.cards = cards;
    this.pickedCards = [];
    this.cardPairs = [];
    this.time = 30;

    this.startScreen = document.getElementById('game-intro');
    this.gameScreen = document.getElementById('game-screen');
    this.gameEndScreen = document.getElementById('game-end');
    this.timeDisplay = document.getElementById('timer');

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
