function setup() {
    createCanvas(400, 400)
}

function draw() {
    background(220)
    let x = sin(frameCount * 0.05) * 50 + 200;
    fill(100, 200, 255, 150);
    circle(x, 200, 40);
}