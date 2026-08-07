function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(240); 
  fill(0);       
  strokeWeight(3)
  for (let i = 0; i < 6; i++) {
    rect(100, 50 + i * 40, 15, 15);
  }
}
