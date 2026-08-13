let snowflakes = []; 

function setup() {
  createCanvas(600, 450); 
  

  for (let i = 0; i < 40; i++) {
    snowflakes.push({
      x: random(width),      
      y: random(height),      
      speed: random(0.5, 2.5),
      size: random(3, 10)    
    });
  }
}

function draw() {
  background('#0f172a'); 
  
  for (let s of snowflakes) {
    fill(255);
    noStroke();
    circle(s.x, s.y, s.size);
    
    s.y += s.speed;
    
    if (s.y > height) {
      s.y = 0;           
      s.x = random(width);
    }
  }
}
