
let currentX = 0;
let circleY; 

function setup() {
  createCanvas(600, 200);
  
  background(30); 

  circleY = height / 2; 
  noStroke(); 
}

function draw() {
  let greenValue = map(currentX, 0, width, 0, 255);
  fill(255, greenValue, 0);

  circle(currentX, circleY, 20);

  currentX += 2;
}