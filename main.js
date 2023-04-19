var game;

var gameSelectionView = document.querySelector('.game-selection');
var gameBoardView = document.querySelector('.game-board');
var gameOption = document.querySelectorAll('.game-option');

gameOption.forEach((option) => {
    option.addEventListener('click', function(e) {
        createNewGame()
        selectGameType(e);
        createPlayers();
        gameSelectionView.classList.toggle('hidden');
        gameBoardView.classList.toggle('hidden');
        console.log(game)
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
    } else if (event.currentTarget.classList.contains('difficult-game')) {
        game.gameType = 'difficult';
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