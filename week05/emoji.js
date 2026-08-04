function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES); 
}

function draw() {
  background(240);


  noStroke();
  fill(255, 204, 0);
  circle(200, 200, 225);

 
  fill(255, 100, 50, 90); 
  circle(135, 220, 55);
  circle(265, 220, 55);

  stroke(100, 50, 0);
  strokeWeight(7);
  noFill();

  arc(150, 185, 45, 35, 180, 360); 
  arc(250, 185, 45, 35, 180, 360); 

  strokeWeight(8);
  arc(200, 210, 110, 80, 0, 180); 
}