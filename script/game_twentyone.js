// FIXES:
// playerScore = dealerScore
// ACE 1 or 10 points
// Dealer gets five cards => wins
// tie message instead of dealer wins
// 21 on load games does not display wins, only when hitting the stay button

// DOM VARIABLES
let playerHeaderElement = document.getElementById("playerHeader"),
    playerDeckElement = document.getElementById("playerDeck"),
    playerScoreElement = document.getElementById("playerScore"),
    dealerHeaderElement = document.getElementById("dealerHeader"),
    dealerDeckElement = document.getElementById("dealerDeck"),
    dealerScoreElement = document.getElementById("dealerScore"),
    newgameButton = document.getElementById("newgame-button"),
    hitButton = document.getElementById("hit-button"),
    stayButton = document.getElementById("stay-button");

// GET GAME SCORE
const gameName = "twentyone",
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
// gameScoreElement.innerText = gameScore + ' - total tries: ' + gameCountTotal + ' (' + gameCountWin + ' wins / ' + gameCountLoss + ' losses)';

// GAME VARIABLES
let gameStarted = false,
    gameOver = false,
    playerWon = false,
    dealerCards = [],
    playerCards = [],
    dealerScore = 0,
    playerScore = 0,
    newCardDeck = [];

playerHeaderElement.style.display = "none";
playerScoreElement.style.display = "none";
dealerHeaderElement.style.display = "none";
dealerScoreElement.style.display = "none";
hitButton.style.display = "none";
stayButton.style.display = "none";

showStatus();

newgameButton.onclick = () => {
    gameStarted = true;
    gameOver = false;
    playerWon = false;

    playerHeaderElement.innerText = "Player";
    playerDeckElement.innerHTML = "";
    dealerHeaderElement.innerText = "Dealer";
    dealerDeckElement.innerHTML = "";

    newCardDeck = createCardDeck();
    playerCards = [getNextCard(), getNextCard()];
    dealerCards = [getNextCard(), getNextCard()];

    playerHeaderElement.style.display = "block";
    playerScoreElement.style.display = "block";
    dealerHeaderElement.style.display = "block";
    dealerScoreElement.style.display = "block";
    newgameButton.style.display = "none";
    hitButton.style.display = "inline";
    stayButton.style.display = "inline";

    showStatus();
};

hitButton.onclick = () => {
    playerCards.push(getNextCard());
    checkGameEnd();
    showStatus();
};

stayButton.onclick = () => {
    gameOver = true;
    checkGameEnd();
    showStatus();
};

function createCardDeck() {
    newCardDeck = new cardDeck();
    newCardDeck.generateDeck();
    newCardDeck.shuffleDeck();
    return newCardDeck;
}

function getNextCard() {
    return newCardDeck.dealCard();
}

function getCardNumericValue(cardValue) {
    switch (cardValue) {
        case "A":
            return 1;
        case "K":
        case "Q":
        case "J":
            return 10;
        default:
            return parseInt(cardValue);
    }
}

function getScore(arrayCard) {
    let score = 0,
        hasAce = false;
    arrayCard.forEach((cardElement) => {
        score += getCardNumericValue(cardElement.value);
        if (cardElement.value === "A") {
            hasAce = true;
        }
    });

    if (hasAce && score + 10 <= 21) {
        return score + 10;
    }

    return score;
}

function updateScores() {
    dealerScore = getScore(dealerCards);
    playerScore = getScore(playerCards);
}

function showStatus() {
    playerDeckElement.innerHTML = "";
    dealerDeckElement.innerHTML = "";

    playerCards.forEach((playerCardElement) => {
        playerDeckElement.innerHTML += newCardDeck.renderCard(playerCardElement);
    });

    dealerCards.forEach((dealerCardElement) => {
        dealerDeckElement.innerHTML += newCardDeck.renderCard(dealerCardElement);
    });

    updateScores();

    playerScoreElement.innerText = "Score: " + playerScore;
    dealerScoreElement.innerText = "Score: " + dealerScore;

    if (gameOver) {
        gameCountTotal += 1;

        if (playerWon) {
            playerHeaderElement.innerText += " wins!";
            gameScore += 100;
            gameCountWin += 1;
        } else {
            dealerHeaderElement.innerText += " wins!";
            gameCountLoss += 1;
        }

        Player.setPlayerGameScoreItem(gameName, "score", gameScore);
        Player.setPlayerGameScoreItem(gameName, "count_total", gameCountTotal);
        Player.setPlayerGameScoreItem(gameName, "count_win", gameCountWin);
        Player.setPlayerGameScoreItem(gameName, "count_loss", gameCountLoss);
        gameScoreElement.innerText = gameScore;
        // gameScoreElement.innerText = gameScore + ' - total tries: ' + gameCountTotal + ' (' + gameCountWin + ' wins / ' + gameCountLoss + ' losses)';
        newgameButton.style.display = "inline";
        hitButton.style.display = "none";
        stayButton.style.display = "none";
    }
}

function checkGameEnd() {
    updateScores();

    if (gameOver) {
        // new card for dealer
        while (
            dealerScore < playerScore &&
            dealerScore <= 21 &&
            playerScore <= 21
            ) {
            dealerCards.push(getNextCard());
            updateScores();
        }
    }

    if (playerScore > 21) {
        playerWon = false;
        gameOver = true;
    } else if (dealerScore > 21) {
        playerWon = true;
        gameOver = true;
    } else if (gameOver) {
        if (playerScore > dealerScore) {
            playerWon = true;
        } else {
            playerWon = false;
        }
    }
}
