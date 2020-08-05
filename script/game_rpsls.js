// DOM VARIABLES
let text = document.getElementsByTagName("P"),
    infoTextElement = document.getElementById('infoText'),
    newgameButton = document.getElementById('newgame-button'),
    descriptionElement = document.getElementById('description'),
    gameElement = document.getElementById('game');

text = text[0];

// GET GAME SCORE
const gameName = 'rpsls',
    playerName = Player.getPlayerName();

let gameScore = parseInt(Player.getPlayerGameScoreItem(gameName, 'score')),
    gameCountTotal = parseInt(Player.getPlayerGameScoreItem(gameName, 'count_total')),
    gameCountWin = parseInt(Player.getPlayerGameScoreItem(gameName, 'count_win')),
    gameCountLoss = parseInt(Player.getPlayerGameScoreItem(gameName, 'count_loss')),
    gameScoreElement = document.getElementById('gameScore');

gameScoreElement.innerText = gameScore;
// gameScoreElement.innerText = gameScore + ' - total tries: ' + gameCountTotal + ' (' + gameCountWin + ' wins / ' + gameCountLoss + ' losses)';

// GAME VARIABLES
let choices = ["rock", "paper", "scissors", "lizard", "spock"],
    userLives = 0,
    botLives = 0,
    endGame = false;

gameElement.style.display = 'none';
generateChoicesList();

newgameButton.onclick = () => {
    console.log('New game started');
    newgameButton.style.display = 'none';
    descriptionElement.style.display = 'none';
    document.getElementById('gameSection').classList.remove('bgcolor1');
    gameElement.style.display = 'block';
    infoTextElement.innerHTML = '<span>Select a move from above to start!</span>';

    let lifeElements = document.getElementsByClassName("icon-heart");
    lifeElements[0].style.display = "inline";
    lifeElements[1].style.display = "inline";
    lifeElements[2].style.display = "inline";
    lifeElements[3].style.display = "inline";
    lifeElements[4].style.display = "inline";
    lifeElements[5].style.display = "inline";
    endGame = false;
};

function game(choice) {

    let result, userChoice, computerChoice;
    userChoice = choice.id;
    computerChoice = Math.floor(Math.random() * choices.length);

    result = getResult(userChoice, computerChoice);

    // switch (computerChoice) {
    //     case 0:
    //         // Rock
    //         if (userChoice === "paper" || userChoice === "spock") {
    //             result = userWins;
    //         } else if (userChoice === "rock") {
    //             result = draw;
    //         } else {
    //             result = botWins;
    //         }
    //         break;
    //
    //     case 1:
    //         // Paper
    //         if (userChoice === "scissor" || userChoice === "lizard") {
    //             result = userWins;
    //         } else if (userChoice === "paper") {
    //             result = draw;
    //         } else {
    //             result = botWins;
    //         }
    //         break;
    //
    //     case 2:
    //         // Scissors
    //         if (userChoice === "spock" || userChoice === "rock") {
    //             result = userWins;
    //         } else if (userChoice === "scissor") {
    //             result = draw;
    //         } else {
    //             result = botWins;
    //         }
    //         break;
    //
    //     case 3:
    //         // Lizard
    //         if (userChoice === "rock" || userChoice === "scissor") {
    //             result = userWins;
    //         } else if (userChoice === "lizard") {
    //             result = draw;
    //         } else {
    //             result = botWins;
    //         }
    //         break;
    //
    //     case 4:
    //         // Spock
    //         if (userChoice === "lizard" || userChoice === "paper") {
    //             result = userWins;
    //         } else if (userChoice === "spock") {
    //             result = draw;
    //         } else {
    //             result = botWins;
    //         }
    //         break;
    //
    //     default:
    //         result = "";
    // }

    if (!endGame) {

        const userWinsText = "Bot: " + choices[computerChoice] + "<span> YOU WIN!!!</span>";
        const botWinsText = "Bot: " + choices[computerChoice] + "<span> YOU LOSE!!!</span>";
        const drawText = "Bot: " + choices[computerChoice] + "<span> DRAW</span>";

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

        if (result === 'userWins') {
            styleChoice(choice, "#309B9C", userWinsText);
        }
        else if (result === 'botWins') {
            styleChoice(choice, "#CF293C", botWinsText);
        }
        else {
            styleChoice(choice, "#6029CF", drawText);
        }

        getScore(result);
    }
}

function styleChoice(choice, color, text) {
    let testchoiceElement = document.getElementById(choice.id);

    infoTextElement.style.color = color;
    infoTextElement.innerHTML = text;

    testchoiceElement.style.background = color;
    setTimeout(function () {
        testchoiceElement.style.background = "";
    }, 1000);

}

function getScore(result) {

    const lifeElements = document.getElementsByClassName("icon-heart");
    if (result === 'userWins') {
        lifeElements[botLives++ + 3].style.display = "none";
    }
    else if (result === 'botWins') {
        lifeElements[userLives++].style.display = "none";
    }

    // END OF GAME
    if (botLives === 3 || userLives === 3) {
        gameCountTotal += 1;
        if (userLives === 3) {
            infoTextElement.innerHTML += "<span>Better Luck Next Time! Bot Wins!</span>";
            gameCountLoss += 1;
        }
        else {
            infoTextElement.innerHTML += "<span>Some good luck you got there!</span>";
            gameScore += 100;
            gameCountWin += 1;
        }

        Player.setPlayerGameScoreItem(gameName, 'score', gameScore);
        Player.setPlayerGameScoreItem(gameName, 'count_total', gameCountTotal);
        Player.setPlayerGameScoreItem(gameName, 'count_win', gameCountWin);
        Player.setPlayerGameScoreItem(gameName, 'count_loss', gameCountLoss);
        gameScoreElement.innerText = gameScore;

        endGame = true;
        newgameButton.style.display = 'inline';
        console.log("Game ended");

        for (let i = lifeElements.length - 1; i >= 0; i--) {
            lifeElements[i].style.color = "rgb(255,0,0)";
            botLives = 0;
            userLives = 0;
        }
    }
}

function getResult(userChoice, computerChoice) {

    let result = '';
    switch (computerChoice) {
        case 0:
            // Rock
            if (userChoice === "paper" || userChoice === "spock") {
                result = 'userWins';
            } else if (userChoice === "rock") {
                result = 'draw';
            } else {
                result = 'botWins';
            }
            break;

        case 1:
            // Paper
            if (userChoice === "scissor" || userChoice === "lizard") {
                result = 'userWins';
            } else if (userChoice === "paper") {
                result = 'draw';
            } else {
                result = 'botWins';
            }
            break;

        case 2:
            // Scissors
            if (userChoice === "spock" || userChoice === "rock") {
                result = 'userWins';
            } else if (userChoice === "scissor") {
                result = 'draw';
            } else {
                result = 'botWins';
            }
            break;

        case 3:
            // Lizard
            if (userChoice === "rock" || userChoice === "scissor") {
                result = 'userWins';
            } else if (userChoice === "lizard") {
                result = 'draw';
            } else {
                result = 'botWins';
            }
            break;

        case 4:
            // Spock
            if (userChoice === "lizard" || userChoice === "paper") {
                result = 'userWins';
            } else if (userChoice === "spock") {
                result = 'draw';
            } else {
                result = 'botWins';
            }
            break;

        default:
            result = '';
    }

    return result
}

function generateChoicesList() {
    let ul = document.getElementById("choices");
    ul.setAttribute('id', 'choices');

    for (let i = 0; i < choices.length; i++) {
        let img = document.createElement('img');
        img.setAttribute('src', 'assets/game_rpsls/big-l' + choices[i] + '.svg');
        img.setAttribute('alt', choices[i]);

        let li = document.createElement('li');
        li.setAttribute('id', choices[i]);
        li.setAttribute('onclick', 'game(this)');
        li.appendChild(img);

        ul.appendChild(li);
    }
}