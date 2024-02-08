"use strict";

const newGameBtn = document.querySelector("#new-game-btn");
const rollBtn = document.querySelector("#roll-btn");
const holdBtn = document.querySelector("#hold-btn");

let player0El = document.querySelector("#player-0");
let player1El = document.querySelector("#player-1");
let player0Tot = document.querySelector("#player-0-total-score");
let player0Cur = document.querySelector("#player-0-cur-score");
let player1Tot = document.querySelector("#player-1-total-score");
let player1Cur = document.querySelector("#player-1-cur-score");
let diceImg = document.querySelector("#dice-img");

let activePlayer = 0;

let playerEl = [player0El, player1El];
let curScoreEl = [player0Cur, player1Cur];
let totalScoreEl = [player0Tot, player1Tot];

let curScore = [0, 0];
let totalScore = [0, 0];

let playing = true;

const newGame = function () {
    for (let i = 0; i < 2; i++) {
        curScoreEl[i].textContent = "0";
        totalScoreEl[i].textContent = "0";
        curScore[i] = 0;
        totalScore[i] = 0;
    }

    // change backgrounds
    player0El.classList.remove("bg-red-300");
    player1El.classList.add("bg-red-300");

    // change backgrounds in case we land here after winning the game
    if (player0El.classList.contains("bg-slate-800")) {
        player0El.classList.toggle("bg-slate-800");
        document.querySelector("#text-0").classList.toggle("text-white");
    } else if (player1El.classList.contains("bg-slate-800")) {
        player1El.classList.toggle("bg-slate-800");
        document.querySelector("#text-1").classList.toggle("text-white");
    }

    // Make dice invisible
    if (diceImg.classList.contains("opacity-100")) {
        diceImg.classList.remove("opacity-100");
    }

    //make playing === true
    playing = true;
};

const switchPlayer = function () {
    player0El.classList.toggle("bg-red-300");
    player1El.classList.toggle("bg-red-300");
    curScore[activePlayer] = 0;
    curScoreEl[activePlayer].textContent = curScore[activePlayer];
    if (activePlayer === 0) {
        activePlayer = 1;
    } else {
        activePlayer = 0;
    }
};

const rollDice = function () {
    if (playing) {
        let score = 0;
        // random number between 1 to 6
        let rolledNumber = Math.floor(Math.random() * 6 + 1);
        diceImg.src = `./images/dice-${rolledNumber}.png`;
        diceImg.classList.add("opacity-100");
        console.log(rolledNumber);

        if (rolledNumber === 1) {
            // make active player's curScore as 0 and switch the active player
            switchPlayer();
        } else {
            score += rolledNumber;
            curScore[activePlayer] += score;
            curScoreEl[activePlayer].textContent = curScore[activePlayer];
        }
    }
};

const holdScore = function () {
    if (playing) {
        totalScore[activePlayer] += curScore[activePlayer];
        totalScoreEl[activePlayer].textContent = totalScore[activePlayer];

        // Winner Check
        if (totalScore[activePlayer] >= 20) {
            diceImg.classList.remove("opacity-100");
            playerEl[activePlayer].classList.toggle("bg-slate-800");
            if (activePlayer == 0) {
                document
                    .querySelector("#text-0")
                    .classList.toggle("text-white");
            } else {
                document
                    .querySelector("#text-1")
                    .classList.toggle("text-white");
            }
            playing = false;
        } else switchPlayer();
    }
};

// New Game functionality
newGameBtn.addEventListener("click", newGame);

// Roll Dice functionality
rollBtn.addEventListener("click", rollDice);

// Hold Functionality
holdBtn.addEventListener("click", holdScore);
