const cards = document.querySelectorAll(".memory-card");

let descriptionElement = document.getElementById("description");
let newgameButton = document.getElementById("newgame-button");
let gameElement = document.getElementById("game");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let endGame = false,
  test = 0;

// Start game

gameElement.style.display = "none";

newgameButton.onclick = () => {
  console.log("New game started");
  newgameButton.style.display = "none";
  gameElement.style.display = "block";
  descriptionElement.style.display = "none";
  document.getElementById("gameSection").classList.remove("bgcolor3");
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

(function shuffle() {
  cards.forEach((card) => {
    let randomPos;
    randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach((card) => card.addEventListener("click", flipCard));
// cards.forEach((card) => (card.style.display = "none"));
