let circleX;
let circleY;
let circleSize = 80;
let circleColor = "#3498db";

function setup() {
  createCanvas(600, 400);
}

function draw() {
  circleX = mouseX;
  circleY = mouseY;
  
  background("#f5f5f5");
  
  fill(circleColor);
  
  circle(circleX, circleY, circleSize);
}