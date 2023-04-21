var game;

var rules = {
    rock: ['scissors', 'lizard'],
    paper: ['rock', 'alien'],
    scissors: ['paper', 'lizard'],
    lizard: ['paper', 'alien'],
    alien: ['scissors', 'rock']
}

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
    createPlayers();
});

gameOption.forEach((option) => {
    option.addEventListener('click', function(e) {
        selectGameType(e);
        hideToggler(gameSelectionView, changeGameButton);
    });
});

gameBoards.forEach((board) => {
    board.addEventListener('click', function(e) {
        selectFighter(e);
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
    if (event.currentTarget.classList.contains('classic-game')) {
        game.gameType = 'classic';
        currentGameBoard = gameBoards[0];
    } else if (event.currentTarget.classList.contains('difficult-game')) {
        game.gameType = 'difficult';
        currentGameBoard = gameBoards[1];
    }
    hideToggler(currentGameBoard);
}

function createPlayers() {
    var playerOne = createPlayer('Human', '&#129489;');
    var playerTwo = createPlayer('Computer', '&#129302;');
    game.players.push(playerOne, playerTwo);
}

function createPlayer(playerType, playerToken) {
    return {
        playerType,
        playerToken,
        wins: 0
    };
}

function playGame(chosenFighter) {
    var computerFighter = selectFighter().cloneNode();
    revealFighters(chosenFighter, computerFighter);
    if (chosenFighter.id === computerFighter.id) {
        return `emoji It's a draw! emoji`;
    }
    var winner = getWinner(chosenFighter, computerFighter)
    return `emoji ${winner} won this round! emoji`;
}

function selectFighter(event) {
    if (!event && game.gameType === 'classic') {
        return Array.from(fighterAreas[0].children)[getRandomIndex(fighterAreas[0].children)];
    } else if (!event && game.gameType === 'difficult') {
        return Array.from(fighterAreas[1].children)[getRandomIndex(fighterAreas[1].children)];
    } else if (event.target.nodeName === 'IMG') {
        chosenFighter = event.target.cloneNode();
    }
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
    return winner.playerType;
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
