

let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;

let h2 = document.querySelector("h2");

// To start the game by pressing any key
document.addEventListener("keypress", function() {
    if (!started) {
        console.log("Game is started");
        started = true;
        levelUp();
    }
});

// Flashing button and level up from 1
function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    // Random button choose
    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        // Display game over message and score
        h2.innerHTML = `Game over! Your score was <b>${level}</b> <br> Press any key to start.`;
        
        // Change background color to indicate game over
        document.querySelector("body").style.backgroundColor = "red";
        
        // Reset background color after 150ms
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "beige";
            
            // Now reset the game after showing the message
            reset();
        },1000 );
    }
}


function btnPress() {
    console.log("Button pressed:", this);
    let btn = this;
    userFlash(btn);

    let userColor = btn.classList[1]; // Get the second class name which is the color
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    h2.innerText = "Press any key to start.";
}
