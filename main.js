var game;

var rules = {
    'rock': ['scissors', 'lizard'],
    'paper': ['rock', 'alien'],
    'scissors': ['paper', 'lizard'],
    'lizard': ['paper', 'alien'],
    'alien': ['scissors', 'rock']
}

var chosenFighter;

var gameSelectionView = document.querySelector('.game-selection');
var gameOption = document.querySelectorAll('.game-option');
var gameBoards = document.querySelectorAll('.game-board');
var humanWins = document.getElementById('humanWins');
var computerWins = document.getElementById('computerWins');

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

function createNewGame() {
    game = {
        players: [],
        gameType: ''
    };
}

function selectGameType(event) {
    if (event.currentTarget.classList.contains('classic-game')) {
        game.gameType = 'classic';
        gameBoards[0].classList.toggle('hidden');
    } else if (event.currentTarget.classList.contains('difficult-game')) {
        game.gameType = 'difficult';
        gameBoards[1].classList.toggle('hidden');
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
        return `emoji It's a draw! emoji`;
    }
    
    var winner = getWinner(chosenFighter, computerFighter)
    return `emoji ${winner} won this round! emoji`;
}

function selectFighter(event) {
    if (event.target.nodeName === 'IMG') {
        chosenFighter = event.target.id;
    }
}

function getRandomFighter() {
    var rulesKeys = Object.keys(rules);
    return rulesKeys[getRandomIndex(rulesKeys)];
}

function getWinner(chosenFighter, computerFighter) {
    if (rules[chosenFighter].includes(computerFighter)) {
        incrementWins(game.players[0]);
        humanWins.innerText = `Wins: ${game.players[0].wins}`;
        return game.players[0].playerType;
    } else {
        incrementWins(game.players[1]);
        computerWins.innerText = `Wins: ${game.players[1].wins}`;
        return game.players[1].playerType;
    }
}

function incrementWins(player) {
    player.wins++;
}

function getRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
}