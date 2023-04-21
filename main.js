var game;

var rules = {
    'rock': ['scissors', 'lizard'],
    'paper': ['rock', 'alien'],
    'scissors': ['paper', 'lizard'],
    'lizard': ['paper', 'alien'],
    'alien': ['scissors', 'rock']
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

gameOption.forEach((option) => {
    option.addEventListener('click', function(e) {
        createNewGame();
        selectGameType(e);
        createPlayers();
        gameSelectionView.classList.toggle('hidden');
    });
});

gameBoards.forEach((board) => {
    board.addEventListener('click', function(e) {
        selectFighter(e);
        this.firstElementChild.innerText = playGame(chosenFighter);
    })
})

changeGameButton.addEventListener('click', returnToGameSelection)

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
        currentGameBoard.classList.toggle('hidden');
    } else if (event.currentTarget.classList.contains('difficult-game')) {
        game.gameType = 'difficult';
        currentGameBoard = gameBoards[1];
        currentGameBoard.classList.toggle('hidden');
    }
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
    fighterArea.classList.toggle('hidden');
    var revealArea = fighterArea.cloneNode();
    revealArea.append(chosenFighter, computerFighter);
    currentGameBoard.appendChild(revealArea);
    main.classList.toggle('no-click');
    revealArea.classList.toggle('hidden');
    
    setTimeout(() => {
        currentGameBoard.removeChild(revealArea);
        main.classList.toggle('no-click');
        currentGameBoard.firstElementChild.innerText = 'Choose your fighter!';
        fighterArea.classList.toggle('hidden');
    }, 5000);
}

function getWinner(chosenFighter, computerFighter) {
    var winner;
    if (rules[chosenFighter.id].includes(computerFighter.id)) {
        winner = game.players[0];
    } else {
        winner = game.players[1];
    }

    incrementWins(winner);
    computerWins.innerText = `Wins: ${winner.wins}`;
    return winner.playerType;
}

function returnToGameSelection() {
    currentGameBoard.classList.toggle('hidden');
    gameSelectionView.classList.toggle('hidden');
}

function incrementWins(player) {
    player.wins++;
}

function getRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
}