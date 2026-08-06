function setup() {
    createCanvas(600, 400)
}

function draw() {
    if(mouseX  < width)
        background("#3498db")
} else {
        background("#e74c3c")
}
fill("#fff")
circle(mouseX, mouseY, 30)