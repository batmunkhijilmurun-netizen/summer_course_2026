let targetX = 100;
let targetY = 200;
let targetSize = 70;
let targetSpeed = 4;
let score = 0;
let lives = 3;
let gameState = "playing";

function setup() {
  createCanvas(600, 400);
  

  textAlign(CENTER, CENTER);
  textSize(20);
}

function draw() {
  background(240);


  if (gameState === "playing") {
   

   
    if (targetX - targetSize / 2 < 0 || targetX + targetSize / 2 > width) {
      targetSpeed *= -1;
    }

    
    fill('#e74c3c');
    noStroke();
    ellipse(targetX, targetY, targetSize, targetSize);
  } 
  
  else if (gameState === "gameOver") {
    fill(255, 0, 0);
    textSize(40);
    text("GAME OVER", width / 2, height / 2);
    
    textSize(18);
    fill(50);
    text("Дахин эхлүүлэхийн тулд 2 удаа дарна уу (Double click)", width / 2, height / 2 + 50);
  }

 
  textSize(20);
  fill(0);
  textAlign(LEFT, TOP);
  text("Score: " + score, 20, 20);
  text("Lives: " + lives, 20, 50);
  
  
  textAlign(CENTER, CENTER);
}

function mousePressed() {
  
  if (gameState === "playing") {
 
    let d = dist(mouseX, mouseY, targetX, targetY);

  
    if (d < targetSize / 2) {
      score++;
      
      
      if (targetSpeed > 0) {
        targetSpeed += 1;
      } else {
        targetSpeed -= 1;
      }

     
      targetY = random(targetSize / 2, height - targetSize / 2);
    } 
    
    else {
      lives--;
      
      
      if (lives <= 0) {
        gameState = "gameOver";
      }
    }
  }
}

function doubleClicked() {

  targetX = 100;
  targetY = 200;
  targetSize = 70;
  targetSpeed = 4;
  score = 0;
  lives = 3;
  gameState = "playing";
}