let isPressed = false;
let circleSize = 100;
let circleColor = "#3498db";

function setup() {
 
  createCanvas(600, 400);
}

function draw() {
  background(240);

  
  if (isPressed === true) {
    circleSize = 200;
    circleColor = "#e74c3c"; 
  } else {
    circleSize = 100;
    circleColor = "#3498db";
  }

  fill(circleColor);
  noStroke();
  ellipse(width / 2, height / 2, circleSize, circleSize);
}

function mousePressed() {
  
  isPressed = true;
}

function mouseReleased() {

  isPressed = false;
}