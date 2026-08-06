 function setup() {
  
  createCanvas(600, 400);
}

function draw() {
 
  if (mouseX < width / 3) {
    background('#e74c3c');
  } 
  
  else if (mouseX < (width / 3) * 2) {
    background('#f1c40f'); 
  } 
 
  else {
    background('#2ecc71'); 
  }

 
  fill(0); 
  noStroke();
  ellipse(mouseX, mouseY, 50, 50);
}