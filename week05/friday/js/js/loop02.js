function setup() {
    createCanvas(600, 400)
}
function draw(){
    background("#fff")
    stroke("#22222222")
    strokeWeight(3)
    for (let i = 0; i < 10; i++){
        let x = 50 + i * 55;
        line(x, 50, x, 80)
    }

    for (let i = 0; i < 10; i++) {
        let x = 50 + i * 55;
        line (x, 100, x, 130)
    }
    for (let i = 0; i < 10; i++) {
        let x = 50 + i * 55;
        line(x, 150, x, 180);
    }
}