let bubbles = [];

function setup() {
  createCanvas(500, 500);

  for (let i = 0; i < 15; i++) {
    bubbles.push({
      x: random(width),
      y: random(height),
      speed: random(1, 4),
      size: random(15, 35)
    });
  }
}

function draw() {
  background(173, 216, 230); 

  for (let b of bubbles) {
    circle(b.x, b.y, b.size);

    b.y -= b.speed;

    if (b.y < 0) {
      b.y = height;
      b.x = random(width);
    }
  }
}