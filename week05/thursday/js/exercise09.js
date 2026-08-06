let targetX;
let targetY;
let targetSize = 80;
let score = 0;

function setup() {
  createCanvas(400, 400);
  
  targetX = random(targetSize / 2, width - targetSize / 2);
  targetY = random(targetSize / 2, height - targetSize / 2);
}

function draw() {
  background(220);
  fill(50, 150, 250);
  noStroke();
  ellipse(targetX, targetY, targetSize);

  fill(0);
  textSize(20);
  textAlign(LEFT, TOP);
  text("Score: " + score, 10, 10);
}

function mousePressed() {

  let d = dist(mouseX, mouseY, targetX, targetY);

  
  if (d < targetSize / 2) {
    score++;
  
    targetX = random(targetSize / 2, width - targetSize / 2);
    targetY = random(targetSize / 2, height - targetSize / 2);
  } else {
    score--; 
  }
}