
let centerX, centerY;
let sunSize = 70;
let orbitRadius1 = 120;

let orbitRadius2 = 200;

function setup() {

  createCanvas(600, 600);
  
  centerX = width / 2;
  centerY = height / 2;
}

function draw() {
  background(15, 15, 30); 


  
  noFill();
  stroke(100, 100, 150, 100);
  strokeWeight(1);
  ellipse(centerX, centerY, orbitRadius1 * 2); 
  ellipse(centerX, centerY, orbitRadius2 * 2); 

  
  fill(255, 204, 0); 
  ellipse(centerX, centerY, sunSize);

 
  let angle1 = frameCount * 0.03; 
  
  let x1 = centerX + cos(angle1) * orbitRadius1;
  let y1 = centerY + sin(angle1) * orbitRadius1;

 
  fill(100, 200, 255); 
  ellipse(x1, y1, 20);

 
  let angle2 = frameCount * 0.015; 
  
  let x2 = centerX + cos(angle2) * orbitRadius2;
  let y2 = centerY + sin(angle2) * orbitRadius2;

  fill(255, 100, 100); 
  ellipse(x2, y2, 30);
}