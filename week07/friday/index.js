let score = 0;
let lives = 3;
let targetX;
let targetY;
let targetSize = 100;
let gameState = "waiting";

let scoreElement, livesElement, difficultySelect, startButton, resetButton;

function setup() {
  const canvas = createCanvas(600, 400);
  canvas.parent("canvas-container");

  // DOM Elements
  scoreElement = document.querySelector("#score-value");
  livesElement = document.querySelector("#lives-value");
  difficultySelect = document.querySelector("#difficulty-select");
  startButton = document.querySelector("#start-button");
  resetButton = document.querySelector("#reset-button");

  // Event Listeners
  startButton.addEventListener("click", startGame);
  resetButton.addEventListener("click", resetGame);
  difficultySelect.addEventListener("change", updateDifficulty);

  updateDifficulty();
}

function draw() {
  background(220);

  if (gameState === "waiting") {
    textAlign(CENTER, CENTER);
    textSize(24);
    fill(50);
    text("Press Start to Begin!", width / 2, height / 2);
  } else if (gameState === "playing") {
    fill(255, 50, 50);
    ellipse(targetX, targetY, targetSize);
  } else if (gameState === "gameOver") {
    textAlign(CENTER, CENTER);
    textSize(32);
    fill(200, 0, 0);
    text("GAME OVER", width / 2, height / 2 - 20);
    textSize(20);
    fill(50);
    text(`Final Score: ${score}`, width / 2, height / 2 + 20);
  }
}

function spawnTarget() {
  const radius = targetSize / 2;
  targetX = random(radius, width - radius);
  targetY = random(radius, height - radius);
}

function updateDifficulty() {
  const val = difficultySelect.value;
  if (val === "easy") {
    targetSize = 100;
  } else if (val === "medium") {
    targetSize = 70;
  } else if (val === "hard") {
    targetSize = 45;
  }
}

function startGame() {
  score = 0;
  lives = 3;
  gameState = "playing";
  scoreElement.textContent = score;
  livesElement.textContent = lives;
  updateDifficulty();
  spawnTarget();
}

function resetGame() {
  score = 0;
  lives = 3;
  gameState = "waiting";
  difficultySelect.value = "easy";
  scoreElement.textContent = score;
  livesElement.textContent = lives;
  updateDifficulty();
}

function mousePressed() {
  if (gameState !== "playing") return;

  // Canvas-ийн дотор дарагдсан эсэхийг шалгана
  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    let d = dist(mouseX, mouseY, targetX, targetY);
    if (d < targetSize / 2) {
      score++;
      scoreElement.textContent = score;
      spawnTarget();
    } else {
      lives--;
      livesElement.textContent = lives;
      if (lives <= 0) {
        gameState = "gameOver";
      }
    }
  }
}