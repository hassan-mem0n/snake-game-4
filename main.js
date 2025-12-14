let board = document.querySelector(".board");
let StartButton = document.querySelector(".start-game");
let modal = document.querySelector(".modal");
let StartGameModal = document.querySelector(".start-game");
let OverGameModal = document.querySelector(".over-game");
let RestartBtn = document.querySelector(".btn-restart");

let highScoreElement = document.querySelector("#high-score");
let scoreElement = document.querySelector("#score");
let timeElement = document.querySelector("#time");

let highScore = 0
let score = 0

let blockHeight = 50;
let blockWidth = 50;

const rows = Math.floor(board.clientHeight / blockHeight);
const cols = Math.floor(board.clientWidth / blockWidth);

let intervalId = null;

const blocks = {};
let snake = [{ x: 1, y: 1 }];

let food = { 
    x: Math.floor(Math.random() * rows), 
    y: Math.floor(Math.random() * cols) 
};

let direction = "right";

// Create Grid
for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
        let block = document.createElement("div");
        block.classList.add("block");
        board.appendChild(block);
        blocks[`${x}-${y}`] = block;
    }
}

function render() {
 
    let head = { ...snake[0] };

    // Draw Food
    blocks[`${food.x}-${food.y}`]?.classList.add("food");

    // Movement Logic
    if (direction === "left") head.y -= 1;
    else if (direction === "right") head.y += 1;
    else if (direction === "down") head.x += 1;
    else if (direction === "up") head.x -= 1;

    // Boundary Check
    if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols) {
        clearInterval(intervalId);
        modal.style.display="flex"
        StartGameModal.style.display="none"
        OverGameModal.style.display="flex"
        return;
    }

    // Clear Old Snake Fill
    snake.forEach(segment =>
        blocks[`${segment.x}-${segment.y}`]?.classList.remove("fill")
    );

    // FOOD CHECK
    if (head.x == food.x && head.y == food.y) {
        // grow: do not pop
        snake.unshift(head);

        // remove old food
        blocks[`${food.x}-${food.y}`]?.classList.remove("food");

        // new food
        score = score+1
         scoreElement.innerHTML = score;
        

        food = {
            x: Math.floor(Math.random() * rows),
            y: Math.floor(Math.random() * cols)
        };

        blocks[`${food.x}-${food.y}`]?.classList.add("food");
        

    } else {
        // normal move
        snake.unshift(head);
        snake.pop();

    }

    // Render Snake
    snake.forEach(segment =>
        blocks[`${segment.x}-${segment.y}`]?.classList.add("fill")
    );
}

StartButton.addEventListener("click", () => {
    modal.style.display = "none";

    intervalId = setInterval(() => {
        render();
    }, 200);
});
RestartBtn.addEventListener("click",restartgame)
function restartgame() {
    score = 0;
    scoreElement.innerHTML = score;


    blocks[`${food.x}-${food.y}`]?.classList.remove("food");
     snake.forEach(segment =>
        blocks[`${segment.x}-${segment.y}`]?.classList.remove("fill")
    );
    direction ="down"
    modal.style.display="none"
    snake =[{x:1,y:3}]
    food = { 
    x: Math.floor(Math.random() * rows), 
    y: Math.floor(Math.random() * cols) 
    }

if (score > highScore) {
    highScore = score;
    highScoreElement.innerHTML = highScore;
}

       

       intervalId = setInterval(() => {
        render();
    }, 200);


   
}

// Controls
addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" && direction !== "down") direction = "up";
    if (e.key === "ArrowLeft" && direction !== "right") direction = "left";
    if (e.key === "ArrowRight" && direction !== "left") direction = "right";
    if (e.key === "ArrowDown" && direction !== "up") direction = "down";
});







