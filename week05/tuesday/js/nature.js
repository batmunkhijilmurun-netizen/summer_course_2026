function setup() {
  createCanvas(800, 450);
}

function draw() {
  background(135, 206, 235);

  stroke(60, 20, 10);
  strokeWeight(5);

  
  ellipse(680, 100, 100, 100);

  fill(128, 80, 150);
  
  triangle(150, 310, 250, 80, 360, 310);

  triangle(280, 310, 400, 40, 520, 310);
  
  triangle(480, 310, 580, 70, 680, 310);

  fill(255);
  
  ellipse(135, 110, 70, 50);
  ellipse(180, 95, 60, 45);
  ellipse(215, 110, 70, 50);
  
  
  ellipse(290, 160, 50, 35);
  ellipse(320, 145, 45, 35);
  ellipse(345, 160, 50, 35);

  ellipse(440, 130, 70, 50);
  ellipse(485, 115, 60, 45);
  ellipse(520, 130, 70, 50);

  fill(100, 160, 60);
  
  arc(220, 320, 300, 150, PI, TWO_PI);
  arc(380, 340, 320, 140, PI, TWO_PI);
  arc(520, 330, 300, 140, PI, TWO_PI);
  fill(120, 70, 30); 
  rect(100, 290, 25, 60);
  rect(145, 300, 20, 50);
  
  rect(630, 300, 20, 50);
  rect(675, 290, 25, 60);

  fill(60, 110, 40); 
  ellipse(112, 270, 90, 90);
  ellipse(155, 285, 70, 70);
  
  ellipse(640, 285, 70, 70);
  ellipse(687, 270, 90, 90);
 
  fill(85, 145, 50);
  rect(150, 335, 160, 45, 20);
  rect(420, 335, 160, 45, 20);

  rect(60, 370, 680, 70);
}