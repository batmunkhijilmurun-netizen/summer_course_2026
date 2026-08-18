let fishes = [];
let bubbles = [];
let rocks = []; 
function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent('canvas-container');

  
  for (let i = 0; i < 18; i++) {
    rocks.push({
      x: random(10, width - 10),
      y: random(height - 40, height - 10),
      w: random(20, 45), 
      h: random(12, 25), 
      color: color(random(80, 140), random(80, 130), random(80, 120)) // Саарал, бор сүүдэр
    });
  }

  for (let i = 0; i < 5; i++) {
    let dir = random() > 0.5 ? 1 : -1;
    fishes.push({
      x: random(0, width),
      y: random(50, height - 100),
      size: random(30, 60),
      speed: random(1, 3) * dir,
      color: color(random(100, 255), random(100, 255), random(100, 255))
    });
  }

  for (let i = 0; i < 10; i++) {
    bubbles.push({
      x: random(0, width),
      y: random(height - 60, height),
      size: random(8, 20),
      speed: random(1, 2.5)
    });
  }
}

function draw() {
  background(20, 80, 160);


  noStroke();
  fill(218, 165, 32);
  rect(0, height - 50, width, 50);

  drawRocks();

  for (let bubble of bubbles) {
    drawBubble(bubble);
    moveBubble(bubble);
  }

  for (let fish of fishes) {
    drawFish(fish.x, fish.y, fish.size, fish.color, fish.speed > 0 ? 1 : -1);
    moveFish(fish);
  }
}

function drawRocks() {
  noStroke();
  for (let rock of rocks) {
    fill(rock.color);
    ellipse(rock.x, rock.y, rock.w, rock.h);
  }
}

function drawFish(x, y, size, col, dir) {
  push();
  translate(x, y);
  scale(dir, 1);
  noStroke();
  fill(col);

  ellipse(0, 0, size, size * 0.6);
  triangle(
    -size / 2, 0,
    -size * 0.8, -size * 0.3,
    -size * 0.8, size * 0.3
  );

  fill(255);
  ellipse(size * 0.2, -size * 0.1, size * 0.2, size * 0.2);
  fill(0);
  ellipse(size * 0.2, -size * 0.1, size * 0.1, size * 0.1);

  pop();
}

function moveFish(fish) {
  fish.x += fish.speed;
  if (fish.speed > 0 && fish.x - fish.size > width) {
    fish.x = -fish.size;
  } else if (fish.speed < 0 && fish.x + fish.size < 0) {
    fish.x = width + fish.size;
  }
}

function drawBubble(bubble) {
  stroke(255, 255, 255, 150);
  strokeWeight(1.5);
  fill(255, 255, 255, 60);
  ellipse(bubble.x, bubble.y, bubble.size);
}

function moveBubble(bubble) {
  bubble.y -= bubble.speed;
  if (bubble.y < 0) {
    bubble.y = height - 50;
    bubble.x = random(0, width);
  }
}

function mousePressed() {
  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height - 50) {
    if (random() > 0.5) {
      let dir = random() > 0.5 ? 1 : -1;
      fishes.push({
        x: mouseX,
        y: mouseY,
        size: random(30, 60),
        speed: random(1, 3) * dir,
        color: color(random(100, 255), random(100, 255), random(100, 255))
      });
    } else {
      bubbles.push({
        x: mouseX,
        y: mouseY,
        size: random(8, 20),
        speed: random(1, 2.5)
      });
    }
  }
}