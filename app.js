const winningCombinations = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
];

const $playerNames = document.querySelector('.player-names');
const $playerOneNameInput = document.querySelector('#nameOne');
const $playerTwoNameInput = document.querySelector('#nameTwo');
const $nameSubmit = document.querySelector('#submit');
const $game = document.querySelector('.game');
const $current = document.querySelector(".current-player > span");
const $boxes = document.querySelectorAll(".board-item");
const $resetGame = document.querySelector("#reset");
const xSymbol = `<i class="fa-solid fa-x"></i>`;
const oSymbol = `<i class="fa-solid fa-o"></i>`;
let xMarks = [];
let oMarks = [];

let playerOneName, playerTwoName, activePlayer;

$playerOneNameInput.addEventListener('change', (e) => {
    playerOneName = e.target.value;
});

$playerTwoNameInput.addEventListener('change', (e) => {
    playerTwoName = e.target.value;
});

$nameSubmit.addEventListener('click', () => {
    if (!playerOneName || !playerTwoName) {
        return;
    }
    
    $playerNames.classList.toggle('visible');
    $game.classList.toggle('visible');
    activePlayer = playerOneName;
    $current.innerHTML = activePlayer;
});

$boxes.forEach(box => box.addEventListener('click', (e) => {
    if (!e.target.innerHTML) {
        e.target.innerHTML = generateSymbol();

        activePlayer = togglePlayer();
        $current.innerHTML = activePlayer;

        if (activePlayer === playerOneName) {
            xMarks.push(parseInt(e.target.getAttribute('data-index'), 10));
        } else {
            oMarks.push(parseInt(e.target.getAttribute('data-index'), 10));
        }
    }

    checkCombinations();

    if (checkCombinations()) {
        const winningCombination = checkCombinations();
        console.log('winningCombination', winningCombination);
        winningCombination.forEach(el => {
            let box = document.querySelector(`[data-index="${el}"]`);
            box.classList.add('win');
        });
    }
}));

$resetGame.addEventListener('click', () => {
    $boxes.forEach(box => {
        box.innerHTML = null;
        box.classList.remove('win');
    });
    activePlayer = playerOneName;
    xMarks = [];
    oMarks = [];
});

function generateSymbol() {
    return activePlayer === playerOneName ? xSymbol : oSymbol;
}

function togglePlayer() {
    return activePlayer === playerOneName ? playerTwoName : playerOneName;
}

function checkCombinations() {
    return winningCombinations.find(combination => {
        return combination.every(element => xMarks.includes(element)) || combination.every(element => oMarks.includes(element));
    });
};
