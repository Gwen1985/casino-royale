const cards = document.querySelectorAll(".memory-card");

let descriptionElement = document.getElementById("description");
let newgameButton = document.getElementById("newgame-button");
let gameElement = document.getElementById("game");
// let timeElement = document.getElementById("game-time");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let endGame = false,
  test = 0;
let time = 100;

let downloadTimer;

// GET GAME SCORE
const gameName = "memory",
  playerName = Player.getPlayerName();

let gameScore = parseInt(Player.getPlayerGameScoreItem(gameName, "score")),
  gameCountTotal = parseInt(
    Player.getPlayerGameScoreItem(gameName, "count_total")
  ),
  gameCountWin = parseInt(Player.getPlayerGameScoreItem(gameName, "count_win")),
  gameCountLoss = parseInt(
    Player.getPlayerGameScoreItem(gameName, "count_loss")
  ),
  gameScoreElement = document.getElementById("gameScore");

gameScoreElement.innerText = gameScore;

// Start game

gameElement.style.display = "none";

newgameButton.onclick = () => {
  console.log("New game started");
  gameCountTotal += 1;
  Player.setPlayerGameScoreItem(gameName, "count_total", gameCountTotal);

  test = 0;
  newgameButton.style.display = "none";
  gameElement.style.display = "block";
  descriptionElement.style.display = "none";
  document.getElementById("gameSection").classList.remove("bgcolor3");
  cards.forEach((card) => {
    card.classList.remove("flip");
    card.addEventListener("click", flipCard);
  });
  shuffle();

  // Timer
  let timeleft = 10;
  downloadTimer = setInterval(function () {
    if (timeleft <= 0) {
      clearInterval(downloadTimer);
      document.getElementById("game-time").innerHTML = "Finished";
      cards.forEach((card) => {
        card.removeEventListener("click", flipCard);
      });
      newgameButton.style.display = "inline";
      gameCountLoss += 1;
      Player.setPlayerGameScoreItem(gameName, "count_loss", gameCountLoss);
    } else {
      document.getElementById("game-time").innerHTML = timeleft;
    }
    timeleft -= 1;
  }, 1000);
};

// FlipCard

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  // second click
  secondCard = this;

  checkForMatch();

  // ALL CARDS ARE FLIPPED, GAME ENDED
  if (test === 6) {
    endGame = true;

    // DO STUFF
    clearInterval(downloadTimer);
    newgameButton.style.display = "inline";
    document.getElementById("game-time").innerHTML = "Finished";
    gameScore += 100;
    gameCountWin += 1;
    Player.setPlayerGameScoreItem(gameName, "score", gameScore);
    Player.setPlayerGameScoreItem(gameName, "count_win", gameCountWin);

    gameScoreElement.innerText = gameScore;
    // gameScoreElement.innerText = gameScore + ' - total tries: ' + gameCountTotal + ' (' + gameCountWin + ' wins / ' + gameCountLoss + ' losses)';
  }
}

// check if cards match
function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

// disable card when 2 card are turned
function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  test += 1;
  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function shuffle() {
  cards.forEach((card) => {
    let randomPos;
    randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
}
