let gameSeq = [];
let userSeq = [];
let ranBtn = ["red", "yellow", "green", "blue"];
let started = false;
let level = 0;

//Steps Counter variable
let count = 0;

let h1 = document.querySelector("#heading");

let stepsDiv = document.querySelector(".stepsCon");
stepsDiv.classList.add("steps");

// accessing start button
let start = document.querySelector("#start");
//adding start game event
start.addEventListener("click", startGame);

function startGame() {
    if (started == false) {
        started = true;
        // leveling up call
        levelUp();
    }
}

// function for flashing the buttons
function flash(btn) {
    btn.classList.add("flash");
    //setting flash delay
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 500);
}

// function for button flash by user
function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(() => {
        btn.classList.remove("userflash");
    }, 250);
}

// level up function
function levelUp() {
    userSeq = [];
    level++;

    //initializing count
    count = level;
    stepsDiv.innerText = `Left : ${count}`;
    h1.innerText = `level : ${level}`;

    // getting random Color for next levels
    let ranIdx = Math.floor(Math.random() * 3);
    let ranColor = ranBtn[ranIdx];
    let userBtn = document.querySelector(`.${ranColor}`);
    //system Sequence
    gameSeq.push(ranColor);

    // flashing the random buttons
    flash(userBtn);

}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    }
    else {
        h1.innerHTML = `GAME OVER!<br> Your Score is : ${(level - 1) * 10}`;
        stepsDiv.classList.remove("steps");
        document.querySelector("body").style.backgroundColor = "orange";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "wheat";
        }, 3000);
        reset();
    }
}

// accessing the all buttons
let allBtn = document.querySelectorAll(".btn");
for (btn of allBtn) {
    btn.addEventListener("click", btnPress);
}

//  User Box pressing function
function btnPress() {

    if (started == true) {
        let btn = this;
        userFlash(btn);
        userBtn = btn.getAttribute("id");
        userSeq.push(userBtn);
        checkAns(userSeq.length - 1);
        count = count - 1;
        stepsDiv.innerText = `Left : ${count}`;
    }
    else {
        alert("Please Start The Game");
    }
}

// Reset Function
function reset() {
    started = false;
    userSeq = [];
    gameSeq = [];
    level = 0;
}