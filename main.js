var game;
var rules = {
    rock: ['scissors', 'lizard'],
    paper: ['rock', 'alien'],
    scissors: ['paper', 'lizard'],
    lizard: ['paper', 'alien'],
    alien: ['scissors', 'rock']
}

var humanEmoji = '\uD83E\uDDD1';
var computerEmoji = '\uD83E\uDD16';
var swordsEmoji = '\u2694';

var currentGameBoard;
var chosenFighter;

var main = document.querySelector('main');
var gameSelectionView = document.querySelector('.game-selection');
var gameOption = document.querySelectorAll('.game-option');
var gameBoards = document.querySelectorAll('.game-board');
var fighterAreas = document.querySelectorAll('.fighters');
var humanWins = document.getElementById('humanWins');
var computerWins = document.getElementById('computerWins');
var changeGameButton = document.getElementById('changeGame');

window.addEventListener('load', function() {
    createNewGame();
    var previousHumanWins = !localStorage.getItem("humanWins") ? 0 : localStorage.getItem("humanWins");
    var previousComputerWins = !localStorage.getItem("computerWins") ? 0 : localStorage.getItem("computerWins");
    createPlayers(previousHumanWins, previousComputerWins);
    humanWins.innerText = `Wins: ${game.players[0].wins}`;
    computerWins.innerText = `Wins: ${game.players[1].wins}`;
});

window.addEventListener('beforeunload', function() {
    localStorage.setItem("humanWins", game.players[0].wins);
    localStorage.setItem("computerWins", game.players[1].wins);
});

gameOption.forEach((option) => {
    option.addEventListener('click', function(e) {
        selectGameType(e);
        hideToggler(gameSelectionView, changeGameButton);
    });
});

gameBoards.forEach((board) => {
    board.addEventListener('click', function(e) {
        chosenFighter = selectFighter(e);
        this.firstElementChild.innerText = playGame(chosenFighter);
    })
})

changeGameButton.addEventListener('click', returnToGameSelection);

function createNewGame() {
    game = {
        players: [],
        gameType: ''
    };
}

function selectGameType(event) {
    if (event.currentTarget.id === 'classicGame') {
        game.gameType = 'classic';
        currentGameBoard = gameBoards[0];
    } else if (event.currentTarget.id === 'difficultGame') {
        game.gameType = 'difficult';
        currentGameBoard = gameBoards[1];
    }
    hideToggler(currentGameBoard);
}

function createPlayers(previousHumanWins, previousComputerWins) {
    var playerOne = createPlayer('Human', humanEmoji, previousHumanWins);
    var playerTwo = createPlayer('Computer', computerEmoji, previousComputerWins);
    game.players.push(playerOne, playerTwo);
}

function createPlayer(playerType, playerToken, wins = 0) {
    return {
        playerType,
        playerToken,
        wins
    };
}

function playGame(chosenFighter) {
    var computerFighter = selectFighter().cloneNode();
    revealFighters(chosenFighter, computerFighter);
    if (chosenFighter.id === computerFighter.id) {
        return `${swordsEmoji} It's a draw! ${swordsEmoji}`;
    }
    var winner = getWinner(chosenFighter, computerFighter)
    return `${winner.playerToken} ${winner.playerType} won this round! ${winner.playerToken}`;
}

function selectFighter(event) {
    return !event && game.gameType === 'classic' ? Array.from(fighterAreas[0].children)[getRandomIndex(fighterAreas[0].children)]
         : !event && game.gameType === 'difficult' ? Array.from(fighterAreas[1].children)[getRandomIndex(fighterAreas[1].children)]
         : event.target.cloneNode();
}

function revealFighters(chosenFighter, computerFighter) {
    var fighterArea = currentGameBoard.lastElementChild;
    hideToggler(fighterArea);
    var revealArea = fighterArea.cloneNode();
    revealArea.append(chosenFighter, computerFighter);
    currentGameBoard.appendChild(revealArea);
    main.classList.toggle('no-click');
    hideToggler(revealArea);
    
    setTimeout(() => {
        currentGameBoard.removeChild(revealArea);
        main.classList.toggle('no-click');
        currentGameBoard.firstElementChild.innerText = 'Choose your fighter!';
        hideToggler(fighterArea);
    }, 3000);
}

function getWinner(chosenFighter, computerFighter) {
    var winner;
    var winnerText;
    if (rules[chosenFighter.id].includes(computerFighter.id)) {
        winner = game.players[0];
        winnerText = humanWins;
    } else {
        winner = game.players[1];
        winnerText = computerWins;
    }

    incrementWins(winner);
    winnerText.innerText = `Wins: ${winner.wins}`;
    return winner;
}

function incrementWins(player) {
    player.wins++;
}

function returnToGameSelection() {
    hideToggler(currentGameBoard, gameSelectionView, changeGameButton);
}

function getRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
}

function hideToggler(...args) {
    args.forEach((arg) => {
        arg.classList.toggle('hidden');
    })
}
