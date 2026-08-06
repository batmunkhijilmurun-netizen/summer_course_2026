
let warningDistance = 70;

function setup() {

  createCanvas(600, 400);
}

function draw() {

  background(240);


  if (mouseX < warningDistance || mouseX > width - warningDistance) {
    fill('#e74c3c'); 
  } else {
    fill('#3498db');
  }


  ellipse(mouseX, mouseY, 70, 70);
}