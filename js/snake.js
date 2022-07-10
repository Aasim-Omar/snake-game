const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const box = 32;
const snake = [];

const foodImage = document.getElementById("foodImage");

snake[0] = {
  x: 9 * box,
  y: 10 * box,
};

let food = {
  x: Math.floor(Math.random() * 17 + 1) * box,
  y: Math.floor(Math.random() * 14 + 4) * box,
};

let score = 0;
let d = "";

document.addEventListener("keydown", direction);

function direction(e) {
  if (e.keyCode == 37 && d != "RIGHT") {
    d = "LEFT";
  }
  if (e.keyCode == 38 && d != "DOWN") {
    d = "UP";
  }
  if (e.keyCode == 39 && d != "LEFT") {
    d = "RIGHT";
  }
  if (e.keyCode == 40 && d != "UP") {
    d = "DOWN";
  }
}

// Draw Everything
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = (i == 0) ? "green" : "white";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
    ctx.strokeStyle = "red";
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }
  ctx.drawImage(foodImage, food.x, food.y);

  // Old Head Position
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  // Which Direction
  if (d == "UP") snakeY -= box;
  if (d == "RIGHT") snakeX += box;
  if (d == "DOWN") snakeY += box;
  if (d == "LEFT") snakeX -= box;

  // Grow the snake
  if (snakeX == food.x && snakeY == food.y) {
    score++
    food = {
      x: Math.floor(Math.random() * 17 + 1) * box,
      y: Math.floor(Math.random() * 14 + 4) * box,
    };

  } else {
    snake.pop()
  }

  const newHead = {
    x: snakeX,
    y: snakeY,
  }

  // Set Game Over
  if (snakeX < box || snakeX > 17 * box || snakeY < 4 * box || snakeY > 17 * box || collistion(newHead, snake)  ) {
    clearInterval(game)
    ctx.fillStyle = "white"
    ctx.font = "50px 'Cascadia Code'";
    ctx.textAlign = "center"
    ctx.fillText("Game Over", canvas.width / 2, (canvas.height / 2) + 45)
  }

  function collistion(head, snake) {
    for (let i = 0; i < snake.length; i++) {
      if (head.x == snake[i].x && head.y == snake[i].y) {
        return true
      }
    }
    return false
  }

  snake.unshift(newHead)

  ctx.fillStyle = "white";
  ctx.font = "45px 'Cascadia Code'";
  ctx.textAlign = "left"
  ctx.fillText(score, box * 2.3, box * 2);
}

const game = setInterval(draw, 300);
