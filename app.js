let gameSeq = [];
let userSeq = [];
let maxScore = 0;
let colors = ["red", "blue", "green", "orange"];
let level = 0;
let started = false;
let warn = document.createElement("h2");
let stat = document.querySelector("h3");
document.addEventListener("keypress", function()
{
    if (started == false)
    {
        warn.innerHTML = "";
        started = true;
        levelUp();
        console.log("Game started"); 
    }
})




function updateGameSeq(randColor)
{
    gameSeq.push(randColor);
    console.log("Game sequence: " + gameSeq);
}
function btnFlash(btn)
{
    btn.classList.add("flash");
    setTimeout(function ()
    {
        btn.classList.remove("flash");
    }, 300);
}

function levelUp()
{
    userSeq = [];
    level++;
    stat.innerText = "Level " + level;

    let randInd = Math.floor(Math.random() * 3);
    let randColor = colors[randInd];
    updateGameSeq(randColor);
    let i = 0;
    for (let i = 0; i < gameSeq.length; i++) {
        setTimeout(function(index) {
            let btn = document.querySelector("#" + gameSeq[index]);
            btnFlash(btn);
        }, 500 * i, i); // pass the current index as an argument
    }
    // let btn = document.querySelector(`.${randColor}`);
    // btnFlash(btn);
}

function gameOver()
{
    gameSeq = [];
    userSeq = [];
    let score = level - 1;
    if (score > maxScore)
    {
        maxScore = score;
    }
    stat.innerText = "Press any key to start over"
    warn.innerText = `Game Over! Score: ${score}\nHighest Score: ${maxScore}\n Try again!`;
    document.querySelector('body').append(warn);
    level = 0;
    let bg = document.querySelector("body");
    bg.classList.add("error");
    setTimeout(bg.classList.remove("error"), 300);
    started = false;
}

function checkSeq(idx)
{
    if (userSeq[idx] === gameSeq[idx])
    {
        if (userSeq.length == gameSeq.length)
        {
            setTimeout(levelUp, 1000);
        }
    }
    else
    {
        gameOver();
    }
}

function btnPress()
{
    let btn = this;
    btnFlash(btn);
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    console.log(userSeq);
    checkSeq(userSeq.length-1);
}

let allBtn = document.querySelectorAll(".box");
for (btn of allBtn)
{
    btn.addEventListener("click", btnPress);
}