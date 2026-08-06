let buttonX = 200;
let buttonY = 150;
let buttonWidth = 200;
let buttonHeight = 80;

function setup() {
  createCanvas(600, 400);

  textAlign(CENTER, CENTER);
  textSize(28);
}

function draw() {
  background(240);

  

  if (isMouseInside && mouseIsPressed) {
    fill('#1e8449');
  } else if (isMouseInside) {
    fill('#2ecc71');
  } else {
    fill('#3498db'); 
  }


  rect(buttonX, buttonY, buttonWidth, buttonHeight);

  fill(255);
  text("START", buttonX + buttonWidth / 2, buttonY + buttonHeight / 2);
}