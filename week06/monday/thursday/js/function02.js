
let stars = [];

function setup() {
  createCanvas(600, 400);

  for (let i = 0; i < 20; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      speed: random(1, 2),
      size: random(3, 10)
    });
  }
}

function draw() {
  background('#111827');

  noStroke();
  fill(255);

  for (let s of stars) {
    
    circle(s.x, s.y, s.size);
    s.x = s.x + s.speed;

    if (s.x > width) {
      s.x = 0;
      s.y = random(height);
    }
  }
}