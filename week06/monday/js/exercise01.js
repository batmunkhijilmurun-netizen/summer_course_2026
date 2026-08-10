function setup() {
  createCanvas(600, 400); 
}

function draw() {
  background("#87ceeb"); 
  
  drawSun();
}

function drawSun() {
  fill("yellow");
  circle(300, 200, 150); 
}