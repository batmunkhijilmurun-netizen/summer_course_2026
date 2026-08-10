function setup() {
  createCanvas(600, 400);
}

function draw() {
  background("#dff6ff");
  
  drawHouse(50, 200);  
  drawHouse(230, 200); 
  drawHouse(410, 200); 
}

function drawHouse(x, y) {
  fill("#e0a96d"); 
  rect(x, y, 140, 100);
  
  fill("#a93226");
  triangle(x - 10, y, x + 70, y - 50, x + 150, y);
  
  fill("#5d4037");
  rect(x + 55, y + 50, 30, 50);

  fill("#ffffff");
  rect(x + 15, y + 20, 30, 30);

  rect(x + 95, y + 20, 30, 30);
}