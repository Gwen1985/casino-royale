const cards = document.querySelectorAll(".memory-card");

let descriptionElement = document.getElementById("description");
let newgameButton = document.getElementById("newgame-button");
let gameElement = document.getElementById("game");
let timeElement = document.getElementById("game-time");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let endGame = false,
  test = 0;
let time = 100;

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
  // Final Countdown
  // Countdown in DIV
  // endgame => true
  // card.remove eventListenere in card.forEach
};

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

    newgameButton.style.display = "inline";
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
