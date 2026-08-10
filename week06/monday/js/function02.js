function setup() {
    createCanvas(400, 400);
}

function draw() {
    background("#a4e0f071");
    circle(50, 60, 80);
    sayHello();

    drawBall();
    drawBall();
    drawBall();
    drawBall();

    drawBall(130, 130);
    drawBall(190, 190);
    drawBall(250, 250);
    drawBall(310, 310);
    drawBall(370, 370);

    drawBall(370, 0, '#ca2b2b');
    drawBall(270, 0, '#33ca2bff');
    drawBall(170, 0, '#2b36caff');
    drawBall(70, 0, '#ca2bb7ff');
    drawBall(0, 0, '#ca2b2b'); 
}

function sayHello() {
    console.log("Hello"); 
}

function drawBall(x = 50, y = 50, color = '#ca2b2b') {
    fill(color);
    circle(x, y, 40);
}