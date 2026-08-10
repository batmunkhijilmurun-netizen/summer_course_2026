let boxSize = 45; 
let startX = 60;
let gap = 70;

function setup() {
  createCanvas(800, 400);
  rectMode(CENTER);
}

function draw() {
  background("#f5f5f5"); 


  fill("#3498db"); 
  for (let i = 0; i < 10; i++) {
    let x = startX + i * gap;
    rect(x, 100, boxSize, boxSize); 
  }

  fill("#e67e22"); 
  for (let i = 0; i < 10; i++) {
    let x = startX + i * gap;
    rect(x, 200, boxSize, boxSize);
  }
  fill("#2ecc71"); 
  for (let i = 0; i < 10; i++) {
    let x = startX + i * gap;
    rect(x, 300, boxSize, boxSize); 
  }
}