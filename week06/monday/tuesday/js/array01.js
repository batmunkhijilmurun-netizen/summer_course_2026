let ball = {
    x: 200,
    y: 200,
    size: 40,
    color: [255, 0, 0],
    speed: 3
}

console.log(ball.x);
console.log(ball.y);
console.log(ball.size);
console.log(ball.color);
console.log(ball.speed);

function setup() {
    createCanvas(600, 600)
}

function draw() {
    background('#45f');
    circle(ball.x, ball.y, ball.size);
    fill(ball.color);
    ball.x = ball.x + ball.speed

    if(ball.x > width) {
        ball.x = 0;
    }
}