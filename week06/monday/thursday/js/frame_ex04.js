function setup() {
  createCanvas(800, 400);
}

function draw() {
  background(30);

  let numCircles = 10;
  let centerY = height / 2;
  let speed = 0.05;        
  let amplitude = 50;       

  for (let i = 0; i < numCircles; i++) {
    let x = map(i, 0, numCircles - 1, 100, width - 100);

    let y = centerY + sin(frameCount * speed + i * 0.5) * amplitude;

    fill(0, 200, 255);
    noStroke();
    circle(x, y, 40); 
  }
}