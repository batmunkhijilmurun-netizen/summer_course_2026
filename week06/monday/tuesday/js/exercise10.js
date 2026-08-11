function setup() {
  createCanvas(600, 400);
}

function draw() {
  background("#e0f7fa"); 

  drawRobot(120, 200, 150, 255, 80, 80);

  drawRobot(300, 200, 90, 80, 200, 100);

  drawRobot(480, 200, 150, 80, 130, 255);
}
function calculateHeadSize(bodySize) {
  return bodySize * 0.6; 
}

function drawRobot(x, y, bodySize, r, g, b) {

  let headSize = calculateHeadSize(bodySize);

  rectMode(CENTER);

  stroke(50);
  strokeWeight(3);
  line(x - bodySize / 2, y, x - bodySize / 2 - 20, y + 10);
  line(x + bodySize / 2, y, x + bodySize / 2 + 20, y + 10);
  line(x - bodySize / 4, y + bodySize / 2, x - bodySize / 4, y + bodySize / 2 + 30);
  line(x + bodySize / 4, y + bodySize / 2, x + bodySize / 4, y + bodySize / 2 + 30);

  fill(r, g, b);
  rect(x, y, bodySize, bodySize, 5);


  let headY = y - bodySize / 2 - headSize / 2 - 5; 
  rect(x, headY, headSize, headSize, 5);

  fill(255); 
  let eyeOffset = headSize / 4;
  let eyeSize = headSize / 5;
  circle(x - eyeOffset, headY - eyeSize / 2, eyeSize);
  circle(x + eyeOffset, headY - eyeSize / 2, eyeSize);

  fill(0);
  circle(x - eyeOffset, headY - eyeSize / 2, eyeSize / 2);
  circle(x + eyeOffset, headY - eyeSize / 2, eyeSize / 2);
}