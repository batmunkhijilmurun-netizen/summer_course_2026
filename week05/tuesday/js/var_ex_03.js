let count = 10; 

function setup() {
  createCanvas(400, 400);
  let count = 50; 
  
  print("setup доторх count: " + count); 
}

function draw() {
  background(220);
  
  square(50, 50, count); 
  print("draw доторх count: " + count); 
}