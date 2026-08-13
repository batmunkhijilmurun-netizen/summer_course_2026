let cars = []; 

function setup() {
  createCanvas(700, 450); 
  
  let startY = 220; 
  let gap = 40;  

  for (let i = 0; i < 5; i++) {
    cars.push({
      x: random(width),
      y: startY + i * gap,
      speed: random(2, 5),    
      width: random(50, 80), 
      r: random(255),       
      g: random(255),
      b: random(255)
    });
  }
}

function draw() {
  background('#38bdf8'); 
  fill('#22c55e');
  rect(0, 150, width, 300); 
  
  fill('#334155');
  rect(0, 200, width, 220); 
  
  fill(255);
  noStroke();
  for (let x = 0; x < width; x += 40) {
    rect(x, 295, 20, 5);
  }

  for (let car of cars) {
    fill(car.r, car.g, car.b);
    rect(car.x, car.y, car.width, 20);

    fill(0);
    circle(car.x + 10, car.y + 20, 10);           
    circle(car.x + car.width - 10, car.y + 20, 10);  

    car.x += car.speed;

    if (car.x > width) {
      car.x = -car.width; 
      
      car.speed = random(2, 5);
      car.r = random(255);
      car.g = random(255);
      car.b = random(255);
    }
  }
}