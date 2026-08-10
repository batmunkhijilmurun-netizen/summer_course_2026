function setup() {
  createCanvas(600, 400);
}

function draw() {
  background("#dff6ff"); 

  drawFish(100, 100, 60);
  drawFish(250, 200, 90);
  drawFish(450, 120, 50);
  drawFish(180, 300, 110);
  drawFish(420, 280, 70);
}

function drawFish(x, y, size) {
  fill("orange");
  triangle(
    x - size * 0.8, y - size * 0.3, 
    x - size * 0.8, y + size * 0.3, 
    x, y
  );

  fill("coral");
  ellipse(x, y, size * 1.2, size * 0.7);
  fill("white");
  circle(x + size * 0.3, y - size * 0.1, size * 0.2); // Нүдний цагаан
  fill("black");
  circle(x + size * 0.3, y - size * 0.1, size * 0.08); // Нүдний хар
}