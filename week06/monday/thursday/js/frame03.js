function setup() {
    createCanvas(400, 200)
}
function draw() {
    background(220);
    let size = (frameCount * 1.5) % 90 + 20;
    fill(100, 150, 255);
    circle(200, 150, size)
}