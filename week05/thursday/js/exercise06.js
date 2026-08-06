let circleX = 300;
let circleY = 200;
let circleColor = "#3498db";
let circleSize = 90;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(240);

  fill(circleColor);
  noStroke();
  ellipse(circleX, circleY, circleSize, circleSize);
}

function mousePressed() {
  
  circleX = mouseX;
  circleY = mouseY;

  
  if (mouseX < width / 2) {
    circleColor = "#3498db"; 
  } else {
    circleColor = "#e67e22"; 
  }
}