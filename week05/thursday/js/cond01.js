function setup() {
    createCanvas(600, 600)
}

function draw() {
     background("#f2f2f2")
     fill("#1dba76")
     circle(300, 200, 120);

     print(mouseX > 300);

     print(6 > 7); // ???
     let a = 7;
     let b = 7;

     print(a >= b);
     print(a < b);
     priint(a <= b);
     print('hello');

     print(a == b);
     print(a === b);
     print(2 == '2')
     print(2 === '2')
}

if (mouseX > 300) {
    fill("#b3293b")
    circle(300, 200, 120)
}