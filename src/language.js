class LanguageGame {
  constructor(cards) {
    this.cards = cards;
    this.pickedCards = [];
    this.cardPairs = [];
    this.time = 60;
    this.startScreen = document.getElementById('game-intro');
    this.loadingScreen = document.getElementById('game-loading');
    this.gameScreen = document.getElementById('game-screen');
    this.gameBoard = document.getElementById('game-board');
    this.gameEndScreen = document.getElementById('game-end');
    this.winScreen = document.getElementById('win-game-end');
    this.loseScreen = document.getElementById('lose-game-end');
    this.timeDisplay = document.getElementById('timer');
    this.shuffleCards();
  }
  start() {
    this.startScreen.style.display = 'none';
    this.gameScreen.style.display = 'block';
    this.createGameBoard();
    /*this.loadingScreen.style.display = 'flex';
    setTimeout(() => {
      this.loadingScreen.style.display = 'none';
      this.gameScreen.style.display = 'block';
      this.createGameBoard();
    }, 5000);*/
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
    this.pickedCards.length = 0;
  }
  selectCard(clickedCard) {
    if (!this.pickedCards.includes(clickedCard)) {
      clickedCard.classList.add('clicked');
      this.pickedCards.push(clickedCard);
      // game.playSound(card);
    }
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
  matchCards() {
    const firstCardName = this.pickedCards[0].getAttribute('data-card-name');
    const secondCardName = this.pickedCards[1].getAttribute('data-card-name');
    if (this.checkIfPair(firstCardName, secondCardName)) {
      setTimeout(() => {
        this.correctMatch();
        document.querySelectorAll('.card').forEach(card => {
          card.addEventListener('click', () => {
            handleClick(card);
          });
        });
      }, 500);
    } else {
      this.incorrectMatch();
    }
  }
  correctMatch() {
    this.pickedCards.forEach(pickedCard => {
      this.cardPairs.push(pickedCard.getAttribute('data-card-name'));
    });
    this.checkIfWon();
    this.shuffleCards();
    this.updateGameBoard();
  }
  incorrectMatch() {
    this.pickedCards.forEach(pickedCard => {
      pickedCard.classList.add('incorrect');
    });
    setTimeout(() => {
      this.pickedCards.forEach(pickedCard => {
        pickedCard.classList.remove('incorrect');
        pickedCard.classList.remove('clicked');
      });
      this.pickedCards.length = 0;
    }, 500);
  }
  checkIfWon() {
    if (this.cardPairs.length === this.cards.length) {
      this.winGame();
    }
  }
  timer() {
    const timeLeft = setInterval(() => {
      this.timeDisplay.innerText = this.time;
      this.time--;
      if (this.time < 0) {
        clearInterval(timeLeft);
        this.loseGame();
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
  winGame() {
    this.gameScreen.style.display = 'none';
    this.gameEndScreen.style.display = 'block';
    this.winScreen.style.display = 'flex';
  }
  loseGame() {
    this.gameScreen.style.display = 'none';
    this.gameEndScreen.style.display = 'block';
    this.loseScreen.style.display = 'flex';
  }
}
