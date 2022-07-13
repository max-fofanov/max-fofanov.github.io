let game = document.getElementById("game");
let ball = document.getElementById("ball");

let interval;
let both = false;
let counter = 0;
let elements = [];
let SPEED = 0.5;

function moveLeft(){
    let left = parseInt(window.getComputedStyle(ball).getPropertyValue("left"));
    if (left > 0) {
        ball.style.left = left - 2 + "px";
    }
}

function moveRight(){
    let left = parseInt(window.getComputedStyle(ball).getPropertyValue("left"));
    if (left < 380) {
        ball.style.left = left + 2 + "px";
    }
}

document.addEventListener("keydown", event => {
    if (!both) {
        both = true;
        if(event.key==="ArrowLeft"){
            interval = setInterval(moveLeft, 1);
        }
        if(event.key==="ArrowRight"){
            interval = setInterval(moveRight, 1);
        }
    }
});

document.addEventListener("keyup", event => {
    clearInterval(interval);
    both = false;
});

let gameCycle = setInterval(function() {
    let blockLast = document.getElementById("block"+(counter-1));
    let holeLast = document.getElementById("hole"+(counter-1));

    if (counter > 0) {
        var blockLastTop = parseInt(window.getComputedStyle(blockLast).getPropertyValue("top"));
        var holeLastTop = parseInt(window.getComputedStyle(holeLast).getPropertyValue("top"));
    }

    if (blockLastTop < 400 || counter === 0) {
        let block = document.createElement("div");
        let hole = document.createElement("div");

        block.setAttribute("class", "block");
        hole.setAttribute("class", "hole");
        block.setAttribute("id", "block" + counter);
        hole.setAttribute("id", "hole" + counter);

        block.style.top = blockLastTop + 100 + "px";
        hole.style.top = holeLastTop + 100 + "px";
        hole.style.left = Math.floor(Math.random() * 360) + "px";

        game.appendChild(block);
        game.appendChild(hole);

        elements.push(counter);
        counter++;
    }

    let ballTop = parseInt(window.getComputedStyle(ball).getPropertyValue("top"));
    let ballLeft = parseInt(window.getComputedStyle(ball).getPropertyValue("left"));
    let drop = false;

    if (ballTop <= 0 || ballTop >= 480) {
        alert("Game over. Score: " + (counter - 5));
        clearInterval(gameCycle);
        location.reload();
    }

    for (let i = 0; i < elements.length; ++i) {

        let current = elements[i];
        let currentBlock = document.getElementById("block"+current);
        let currentHole = document.getElementById("hole"+current);
        let currentBlockTop = parseFloat(window.getComputedStyle(currentBlock).getPropertyValue("top"));
        let currentHoleTop = parseFloat(window.getComputedStyle(currentHole).getPropertyValue("left"));

        currentBlock.style.top = currentBlockTop - SPEED + "px";
        currentHole.style.top = currentBlockTop - SPEED + "px";

        if(currentBlockTop < -20) {
            elements.shift();
            currentBlock.remove();
            currentHole.remove();
        }

        if(currentBlockTop -20 < ballTop && currentBlockTop > ballTop) {

            drop = !(currentHoleTop <= ballLeft && currentHoleTop + 20 >= ballLeft);
        }
    }

    if(!drop) {
        if(ballTop < 480) {
            ball.style.top = ballTop + (4 * SPEED) + "px";
        }
    } else {
        ball.style.top = ballTop - SPEED + "px";
    }

    let score = document.getElementById("score");
    score.textContent = "Score: " + (counter - 5);
    SPEED += 0.00001

},1);