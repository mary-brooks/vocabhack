class LanguageGame {
  constructor(cards) {
    this.cards = cards;
    this.pickedCards = [];
    this.cardPairs = [];
    this.time = 60;
    this.score = 0;
    this.startScreen = document.getElementById('game-intro');
    this.loadingScreen = document.getElementById('game-loading');
    this.gameScreen = document.getElementById('game-screen');
    this.timeDisplay = document.getElementById('timer');
    this.startTime = null;
    this.endTime = null;
    this.realTimeScore = document.getElementById ('currentScore');
    this.gameBoard = document.getElementById('game-board');
    this.gameEndScreen = document.getElementById('game-end');
    this.winScreen = document.getElementById('win-game-end');
    this.loseScreen = document.getElementById('lose-game-end');
    this.shuffleCards();
  }
  start() {
    this.gameScreen.style.display = 'block';
    this.loadingScreen.style.display = 'flex';
    this.startScreen.style.display = 'none';
    this.createGameBoard();
    this.startTime = new Date()
    setTimeout(() => {
      this.loadingScreen.style.display = 'none';
      this.timer();
    }, 5000);
  }
  createGameBoard() {
    let html = '';
    this.cards.forEach(card => {
      html += `
      <div class = "card" data-card-name = "${card.name}" type = "${card.type}" style = "background: url(img/${card.img}) no-repeat">
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
        newHtml += `<div class = "card" data-card-name = "${card.name}" type = "${card.type}" style = "background: url(img/${card.img}) no-repeat"></div>`;
      }
    });
    this.gameBoard.innerHTML = newHtml;
    this.pickedCards.length = 0;
  }
  selectCard(clickedCard) {
    const clickedCardName = clickedCard.getAttribute('data-card-name');
    const typeOfCard = clickedCard.getAttribute('type');

    if (!this.pickedCards.includes(clickedCard)) {
      clickedCard.classList.add('clicked');
      this.pickedCards.push(clickedCard);

      if (typeOfCard === 'text') {
        const sound = new Audio(`/sound/${clickedCardName}.mp3`);
        sound.play();
      }
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
      }, 800);
    } else {
      this.incorrectMatch();
    }
  }
  correctMatch() {
    this.pickedCards.forEach(pickedCard => {
      this.cardPairs.push(pickedCard.getAttribute('data-card-name'));
    });
    this.realTimeScore.innerText = parseInt(this.realTimeScore.innerText) + 1;
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
    }, 800);
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

  winGame() {
    this.gameScreen.style.display = 'none';
    this.gameEndScreen.style.display = 'block';
    this.winScreen.style.display = 'flex';
    this.endTime = new Date()
    const elapsedTime = Math.floor((this.endTime - this.startTime) / 1000);
    const totalTime = document.getElementById('timeTotal');
    totalTime.innerText = elapsedTime;

  }
  loseGame() {
    this.gameScreen.style.display = 'none';
    this.gameEndScreen.style.display = 'block';
    this.loseScreen.style.display = 'flex';
    const totalScore = document.getElementById('scoreTotal');
    totalScore.innerText = this.realTimeScore.innerText;
  }
}
