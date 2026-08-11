function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(240);

  let centerX = width / 2;
  let centerY = height / 2;

  let mouseDistance = getDistance(mouseX, mouseY, centerX, centerY);

  if (mouseDistance < 100) {
    fill("red");
  } else {
    fill("blue");
  }
 
  circle(centerX, centerY, 100);
}

function getDistance(x1, y1, x2, y2) {
  return dist(x1, y1, x2, y2);
}