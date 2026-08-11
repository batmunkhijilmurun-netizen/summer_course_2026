function setup() {
  createCanvas(600, 400);
}

function draw() {
  background("#f5f5f5");

  drawBall(100, 200, 60, 255, 0, 0);

  drawBall(200, 200, 60, 0, 255, 0);

  drawBall(300, 200, 60, 0, 0, 255);

  drawBall(400, 200, 60, 255, 255, 0);

  drawBall(500, 200, 60, 255, 0, 255);
}

function drawBall(x, y, size, r, g, b) {
  fill(r, g, b);         
  circle(x, y, size);     
}