// DOM VARIABLES
let infoTextElement = document.getElementById("infoText"),
  newgameButton = document.getElementById("newgame-button"),
  descriptionElement = document.getElementById("description"),
  gameElement = document.getElementById("game"),
  playerHeaderElement = document.getElementById("playerHeader"),
  dealerHeaderElement = document.getElementById("dealerHeader");

// GET GAME SCORE
const gameName = "rpsls",
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
let choices = ["rock", "paper", "scissors", "lizard", "spock"],
  totalLives = 3,
  userLives = 0,
  botLives = 0,
  endGame = false;

gameElement.style.display = "none";
generateChoicesList();
generateLives("user");
generateLives("bot");

newgameButton.onclick = () => {
  console.log("New game started");
  // RESET STYLES FOR ELEMENTS
  newgameButton.style.display = "none";
  descriptionElement.style.display = "none";
  document.getElementById("gameSection").classList.remove("bgcolor1");
  gameElement.style.display = "block";
  infoTextElement.innerHTML = "";
  infoTextElement.classList.remove("fade");
  playerHeaderElement.innerHTML = "";
  dealerHeaderElement.innerHTML = "";

  // RESET HEART ICONS AFTER GAME FINISH
  let lifeElements = document.getElementsByClassName("icon-heart");
  for (let i = 0; i < lifeElements.length; i++) {
    lifeElements[i].style.display = "inline";
  }

  endGame = false;
};

function game(choice) {
  let result, userChoice, computerChoice;
  userChoice = choice.id;
  computerChoice = Math.floor(Math.random() * choices.length);

  result = getResult(userChoice, computerChoice);

  if (!endGame) {
    let messageObject;
    // switch (result) {
    //     case 'userWins': {
    //         text.style.color = "#309B9C";
    //         choice.style.background = "#309B9C";
    //         text.innerHTML = userWinsText;
    //         console.log(text.innerHTML);
    //         setTimeout(function () {
    //             choice.style.background = "";
    //         }, 1000);
    //         // styleChoice("green");
    //         break;
    //     }
    //
    //     case 'dealerWins': {
    //         text.style.color = "#CF293C";
    //         choice.style.background = "#CF293C";
    //         text.innerHTML = botWinsText;
    //         console.log(text.innerHTML);
    //         setTimeout(function () {
    //             choice.style.background = "";
    //         }, 1000);
    //         //styleChoice("red");
    //         break;
    //     }
    //
    //     default: {
    //         text.style.color = "#6029CF";
    //         choice.style.background = "#6029CF";
    //         text.innerHTML = drawText;
    //         console.log(text.innerHTML);
    //         setTimeout(function () {
    //             choice.style.background = "";
    //         }, 1000);
    //         //styleChoice ("white");
    //         break;
    //     }
    // }

    if (result === "userWins") {
      messageObject = {
        userText: userChoice + "<span> - YOU WIN!!!</span>",
        botText: choices[computerChoice],
      };
      styleChoice(choice, "#309B9C", messageObject);
    } else if (result === "botWins") {
      messageObject = {
        userText: userChoice + "<span> - YOU LOOSE!!!</span>",
        botText: choices[computerChoice],
      };
      styleChoice(choice, "#CF293C", messageObject);
    } else {
      messageObject = {
        userText: userChoice + "<span> - DRAW</span>",
        botText: choices[computerChoice] + "<span> - DRAW</span>",
      };
      styleChoice(choice, "#6029CF", messageObject);
    }

    getScore(result);
  }
}

function styleChoice(choice, color, text) {
  playerHeaderElement.style.color = color;
  playerHeaderElement.innerHTML = text.userText.toUpperCase();
  dealerHeaderElement.style.color = color;
  dealerHeaderElement.innerHTML = text.botText.toUpperCase();

  let selectedChoiceElement = document.getElementById(choice.id);
  selectedChoiceElement.style.background = color;
  setTimeout(function () {
    selectedChoiceElement.style.background = "";
  }, 1000);
}

function getScore(result) {
  const lifeElements = document.getElementsByClassName("icon-heart");
  if (result === "userWins") {
    lifeElements[botLives++ + 3].style.display = "none";
  } else if (result === "botWins") {
    lifeElements[userLives++].style.display = "none";
  }

  // END OF GAME
  if (botLives === 3 || userLives === 3) {
    gameCountTotal += 1;
    if (userLives === 3) {
      infoTextElement.innerHTML =
        "<span>Better Luck Next Time! Bot Wins!</span>";
      infoTextElement.classList.add("fade");
      gameCountLoss += 1;
    } else {
      infoTextElement.innerHTML = "<span>Some good luck you got there!</span>";
      infoTextElement.classList.add("fade");
      gameScore += 100;
      gameCountWin += 1;
    }

    Player.setPlayerGameScoreItem(gameName, "score", gameScore);
    Player.setPlayerGameScoreItem(gameName, "count_total", gameCountTotal);
    Player.setPlayerGameScoreItem(gameName, "count_win", gameCountWin);
    Player.setPlayerGameScoreItem(gameName, "count_loss", gameCountLoss);
    gameScoreElement.innerText = gameScore;

    endGame = true;
    newgameButton.style.display = "inline";
    console.log("Game ended");

    for (let i = lifeElements.length - 1; i >= 0; i--) {
      lifeElements[i].style.color = "rgb(255,0,0)";
      botLives = 0;
      userLives = 0;
    }
  }
}

function getResult(userChoice, computerChoice) {
  let result = "";
  switch (computerChoice) {
    case 0:
      // Rock
      if (userChoice === "paper" || userChoice === "spock") {
        result = "userWins";
      } else if (userChoice === "rock") {
        result = "draw";
      } else {
        result = "botWins";
      }
      break;

    case 1:
      // Paper
      if (userChoice === "scissor" || userChoice === "lizard") {
        result = "userWins";
      } else if (userChoice === "paper") {
        result = "draw";
      } else {
        result = "botWins";
      }
      break;

    case 2:
      // Scissors
      if (userChoice === "spock" || userChoice === "rock") {
        result = "userWins";
      } else if (userChoice === "scissor") {
        result = "draw";
      } else {
        result = "botWins";
      }
      break;

    case 3:
      // Lizard
      if (userChoice === "rock" || userChoice === "scissor") {
        result = "userWins";
      } else if (userChoice === "lizard") {
        result = "draw";
      } else {
        result = "botWins";
      }
      break;

    case 4:
      // Spock
      if (userChoice === "lizard" || userChoice === "paper") {
        result = "userWins";
      } else if (userChoice === "spock") {
        result = "draw";
      } else {
        result = "botWins";
      }
      break;

    default:
      result = "";
  }

  return result;
}

function generateChoicesList() {
  let ul = document.getElementById("choices");

  for (let i = 0; i < choices.length; i++) {
    let img = document.createElement("img");
    img.setAttribute("src", "assets/game_rpsls/big-l" + choices[i] + ".svg");
    img.setAttribute("alt", choices[i]);

    let li = document.createElement("li");
    li.setAttribute("id", choices[i]);
    li.setAttribute("onclick", "game(this)");
    li.appendChild(img);

    ul.appendChild(li);
  }
}

function generateLives(elementName) {
  let ul = document.getElementById(elementName);

  for (let i = 0; i < totalLives; i++) {
    let iElement = document.createElement("i");
    iElement.setAttribute("class", "fas fa-heart icon-heart");

    let spanElement = document.createElement("span");
    spanElement.appendChild(iElement);

    let li = document.createElement("li");
    li.appendChild(spanElement);

    ul.appendChild(li);
  }
}
