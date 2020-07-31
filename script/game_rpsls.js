let text = document.getElementsByTagName("P");
text = text[0];
let userLives = 0;
let botLives = 0;

function game(choice) {

    let choices = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
    let result, userChoice, computerChoice;
    userChoice = choice.id;
    computerChoice = Math.floor((Math.random() * choices.length));


    const userWins = 'Bot: ' + choices[computerChoice] + '<span> YOU WIN !!</span>';
    const botWins = 'Bot: ' + choices[computerChoice] + '<span> YOU LOSE !!</span>';
    const draw = 'Bot: ' + choices[computerChoice] + '<span> DRAW</span>';

    switch (computerChoice) {
        case 0 :
            // Rock
            if (userChoice == "paper" || userChoice == "spock") {
                result = userWins;
            } else if (userChoice == "rock") {
                result = draw;
            } else {
                result = botWins;
            }
            break;

        case 1 :
            // Paper
            if (userChoice == "scissor" || userChoice == "lizard") {
                result = userWins;
            } else if (userChoice == "paper") {
                result = draw;
            } else {
                result = botWins;
            }
            break;

        case 2 :
            // Scissors
            if (userChoice == "spock" || userChoice == "rock") {
                result = userWins;
            } else if (userChoice == "scissor") {
                result = draw;
            } else {
                result = botWins;
            }
            break;

        case 3 :
            // Lizard
            if (userChoice == "rock" || userChoice == "scissor") {
                result = userWins;
            } else if (userChoice == "lizard") {
                result = draw;
            } else {
                result = botWins;
            }
            break;

        case 4 :
            // Spock
            if (userChoice == "lizard" || userChoice == "paper") {
                result = userWins;
            } else if (userChoice == "spock") {
                result = draw;
            } else {
                result = botWins;
            }
            break;

        default :
            result = "";
    }


    if (result == userWins) {
        text.style.color = "green";
        choice.style.background = "green";
        text.innerHTML = result;
        setTimeout(function () {
            choice.style.background = "";
        }, 1000);
        // styleChoice("green");
    } else if (result == botWins) {
        text.style.color = "red";
        choice.style.background = "red";
        text.innerHTML = result;
        setTimeout(function () {
            choice.style.background = "";
        }, 1000);
        //styleChoice("red");
    } else if (result == draw) {
        text.style.color = "white";
        choice.style.background = "white";
        text.innerHTML = result;
        setTimeout(function () {
            choice.style.background = "";
        }, 1000);
        //styleChoice ("white");
    }
    score(result, userWins, botWins);
};

// function styleChoice(color) {
//     // text.style.color = color;
//     // choice.style.background = color;
//     // setTimeout(function () {
//     //     choice.style.background = "";
//     // }, 1000);
// }

function score(result, userWins, botWins) {
    const life = document.getElementsByClassName("icon-heart");
    if (result === userWins) {
        life[(botLives++) + 3].style.color = "black";
    } else if (result === botWins) {
        life[(userLives++)].style.color = "black";
    }
    if (botLives === 3 || userLives === 3) {
        if (userLives === 3) {
            text.innerHTML += "<span>Better Luck Next Time! Bot Wins!</span>";
        } else {
            text.innerHTML += "<span>Some good luck you got there!</span>";
        }
        for (let i = life.length - 1; i >= 0; i--) {
            life[i].style.color = "rgb(255,0,0)";
            botLives = 0
            userLives = 0
        }
    }
};