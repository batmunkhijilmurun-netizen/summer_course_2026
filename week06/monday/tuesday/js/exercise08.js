function setup() {
  createCanvas(600, 350);
}

function draw() {
  background("#f5f5f5");

  let size1 = calculateSize(3); 
  let size2 = calculateSize(6); 

  fill(100, 150, 255);
  circle(200, 175, size1); 

  fill(255, 100, 150);
  circle(400, 175, size2); 
}
function calculateSize(number) {
  return number * 20;
}