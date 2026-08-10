function setup() {
    createCanvas(800, 300);
}

function draw() {
    background("#f5f5f5");
    fill(0);

    let startX = 60;
    let gap = 75;
    let fixedSize = 40;
    let y = height / 2;

    for (let i = 0; i < 10; i++) {
        let x = startX + i * gap;

        circle(x, y, fixedSize);
    }
}