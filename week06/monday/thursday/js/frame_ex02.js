function setup() {
  createCanvas(500, 400);
}

function draw() {
  background(240); 
  
  let baseSize = 80;  
  let speed = 0.05;      
  let amplitude = 40; 
  
  let size = baseSize + sin(frameCount * speed) * amplitude;
  
  let redValue = map(sin(frameCount * speed), -1, 1, 100, 255);
  
  fill(redValue, 100, 200); 
  
  circle(width / 2, height / 2, size);
}