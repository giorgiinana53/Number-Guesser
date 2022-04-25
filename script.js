"use strict";
const minNumber = 1;
const maxNumber = 10;
const numberRange = maxNumber - minNumber;
let winningNum = getRandomNum(); 
let guessesLeft = 3;

const audioLose = new Audio('lose.wav');
const audioWin = new Audio('win.wav');

/* UI Element */

const game = document.getElementById("game");
const guessBtn = document.querySelector("#guess-btn");
const guessInput = document.querySelector("#guess-input");
const message = document.querySelector(".message");

guessBtn.addEventListener("mousedown", function(e) {
    if(e.target.className === "play-again") {
        window.location.reload();
    }
});

guessBtn.addEventListener("click", function() {
    var guess = Number(guessInput.value); 

    if (isNaN(guess) || guess < minNumber || guess > maxNumber) {
        document.getElementById("error").innerHTML = `Please enter a number between ${minNumber} and ${maxNumber}`;
        document.getElementById("error").style.color = "red";
        document.getElementById("error").style.marginTop = "5px";
        document.getElementById("error").style.marginLeft = "5px";
    }

    if (guess === winningNum) {
        
        gameOver(true, winningNum + " is correct, YOU WIN !!!");
        guessInput.style.borderColor = "green";
        audioWin.play();

    } else {
        guessesLeft -= 1;

        if(guessesLeft === 0) {
            /* game over */

            gameOver(false, "Game over, you lost. The correct number was " + winningNum);

            guessInput.disabled = true;
            message.style.marginTop = "5px";
        
            audioLose.play();
        } else {
            guessInput.style.borderColor = "red";
            message.style.marginTop = "5px";
            message.style.color = "red";
            message.innerHTML =  `${guessInput.value} is not correct, ${guessesLeft} guesses left`;
        }
    }
});

function gameOver(won, msg) {

    let color;
    won === true ? message.style.color = "green" : message.style.color = "red"; 

    guessInput.disabled = true;
    guessInput.style.borderColor = color;
    message.innerHTML =  winningNum + "\ is correct !  YOU WIN";
    message.style.marginTop = "5px";
    setMessage(msg);

    guessBtn.value = "Play Again";
    guessBtn.classList.add("play-again");
}

function  getRandomNum() {
    return Math.round(Math.random() * numberRange) + 1;
}

function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}

function submitEvent(event) {
    event.preventDefault();
    
}

