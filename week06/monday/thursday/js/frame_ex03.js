function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  
  let timer = frameCount % 60;
  
  if (timer < 30) {
    fill(255, 255, 0); 
  } else {
    fill(100);       
  }
  
  circle(width / 2, height / 2, 150);
}