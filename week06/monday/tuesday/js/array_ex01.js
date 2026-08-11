
let drops = [];

function setup() {
 
  createCanvas(400, 400);


  for (let i = 0; i < 10; i++) {
 
    drops.push({
      x: random(width),   
      y: random(height),    
      speed: random(2, 6),  
      size: random(10, 30) 
    });
  }
}

function draw() {
  background(220);

for (let d of drops) {

    fill(100, 150, 255);
    circle(d.x, d.y, d.size);

    d.y += d.speed;

    if (d.y > height) {
      d.y = 0;
 
    }  
  }
}