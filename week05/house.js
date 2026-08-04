function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(135, 195, 225);

  noStroke();
  fill(255, 240, 0);
  circle(340, 60, 60);

  stroke(0);
  strokeWeight(2);

  fill(212, 172, 130);
  rect(150, 140, 100, 100);

  fill(139, 69, 19);
  rect(185, 180, 30, 60);

  fill(190, 225, 245);
  rect(160, 155, 22, 22); 
  rect(218, 155, 22, 22); 

   fill(195, 45, 45);
  triangle(140, 140, 260, 140, 200, 80);
}