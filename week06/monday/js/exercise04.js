function setup() {
  createCanvas(600, 400);
}

function draw() {
  background("#f5f5f5");
  
  drawBall(100, 200, 40);  
  drawBall(300, 200, 80);  
  drawBall(500, 200, 140); 
}

function drawBall(x, y, size) {
  fill("#094831"); 
  circle(x, y, size); 
}