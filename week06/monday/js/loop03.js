let barWidth = 50;
let startX = 70;
let gap = 70;

function setup() {
  createCanvas(800, 450); 
}

function draw() {
  background("#f5f5f5"); 
  fill("#9b59b6");    
  noStroke();

  for (let i = 0; i < 10; i++) {
    let x = startX + i * gap;
    let barHeight = 30 + i * 35;
    
    let y = 420 - barHeight;
    rect(x, y, barWidth, barHeight);
  }
}