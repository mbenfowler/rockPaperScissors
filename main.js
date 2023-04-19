var game;

var rules = {
    'rock': ['scissors', 'lizard'],
    'paper': ['rock', 'alien'],
    'scissors': ['paper', 'lizard'],
    'lizard': ['paper', 'alien'],
    'alien': ['scissors', 'rock']
}

var gameSelectionView = document.querySelector('.game-selection');
var classicGameBoardView = document.querySelector('.classic-game-board');
var difficultGameBoardView = document.querySelector('.difficult-game-board');
var gameOption = document.querySelectorAll('.game-option');

gameOption.forEach((option) => {
    option.addEventListener('click', function(e) {
        createNewGame()
        selectGameType(e);
        createPlayers();
        gameSelectionView.classList.toggle('hidden');
    });
});

function createNewGame() {
    game = {
        players: [],
        gameType: ''
    };
}

function selectGameType(event) {
    if (event.currentTarget.classList.contains('classic-game')) {
        game.gameType = 'classic';
        classicGameBoardView.classList.toggle('hidden');
    } else if (event.currentTarget.classList.contains('difficult-game')) {
        game.gameType = 'difficult';
        difficultGameBoardView.classList.toggle('hidden');
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
    var computerFighter = getRandomFighter();
    if (chosenFighter === computerFighter) {
        return ` emoji It's a draw! emoji`
    }
    
    var winner = getWinner(chosenFighter, computerFighter)
    return `emoji ${winner} won this round! emoji`
}

function getWinner(chosenFighter, computerFighter) {
    if (rules[chosenFighter].includes(computerFighter)) {
        return game.players[0].playerType;
    } else {
        return game.players[1].playerType;
    }
}

function getRandomFighter() {
    var rulesKeys = Object.keys(rules)
    return rulesKeys[getRandomIndex(rulesKeys)]
}

function getRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
}