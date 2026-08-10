function setup() {
  createCanvas(600, 400);
}

function draw() {
  background("#dff6ff");
  
  drawTree();
}

function drawTree() {
  fill("#ac672b"); 
  rect(280, 220, 40, 140); 
  
  fill("#2bac54ff");
  circle(300, 180, 130); 
}