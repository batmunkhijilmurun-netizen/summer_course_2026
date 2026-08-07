function setup() {
  createCanvas(700, 350);
}

function draw() {
  background("#f5f5f5");

  fill("#9b59b6");
  noStroke();

for (let i = 0; i < 5; i++) {
    let x = 100 + i * 120;
    
    let y = 175;
    
    let size = 40 + i * 20;

  circle(x, y, size);
  }
}