function setup() {
  
  createCanvas(600, 400);
}

function draw() {
 
  background('#f5f5f5');

  
  if (mouseY < height / 2) {
    fill('#2ecc71');
  } else {
    fill('#9b59b6'); 
  }

  noStroke();

  ellipse(width / 2, height / 2, 140, 140);
}