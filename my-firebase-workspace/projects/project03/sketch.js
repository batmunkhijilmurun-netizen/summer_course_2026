let fishes = [];
let bubbles = [];
let rocks = [];
let seaweeds = [];
let shark = null;
let octopus = null;
let giantClam = null;
let bgImage = null;
let bgW = 0;
let bgH = 0;

// Зургийг ачаалах
function preload() {
  bgImage = loadImage('screenshot/us.jpg');
}

function setup() {
  let canvas = createCanvas(1500, 900);
  canvas.parent('canvas-container');

  // Зургийг бүхэл canvas-ийг бүрхүүлэхээр масштаблах (cover)
  let scale = max(width / bgImage.width, height / bgImage.height);
  bgW = bgImage.width * scale;
  bgH = bgImage.height * scale;

  for (let i = 0; i < 15; i++) {
    rocks.push({
      x: random(width),
      y: random(height - 40, height - 15),
      w: random(20, 50),
      h: random(15, 30),
      color: color(random(100, 140), random(100, 130), random(100, 120))
    });
  }

  for (let i = 0; i < 8; i++) {
    seaweeds.push({
      x: random(30, width - 30),
      baseY: height - 50,
      height: random(80, 160),
      segmentCount: 10,
      color: color(random(20, 60), random(120, 180), random(50, 90)),
      offset: random(1000)
    });
  }

  for (let i = 0; i < 6; i++) {
    let speedVal = random(1.5, 4);
    fishes.push({
      x: random(width),
      y: random(50, height - 150),
      size: random(30, 60),
      speed: random() > 0.5 ? speedVal : -speedVal,
      color: color(random(200, 255), random(100, 200), random(50, 150))
    });
  }

  for (let i = 0; i < 12; i++) {
    bubbles.push({
      x: random(width),
      y: random(height - 80, height),
      size: random(8, 20),
      speed: random(1, 3)
    });
  }

  shark = {
    x: width / 2,
    y: height / 2,
    size: 100,
    speedX: 3,
    speedY: 2
  };

  // Наймаалжны анхны байрлал
  octopus = {
    x: width * 0.25,
    y: height - 120,
    size: 70,
    speedX: 1.5,
    offset: 0
  };

  // Том дун хясааны байрлал (Элсэн дээр байрлана)
  giantClam = {
    x: width * 0.75,
    y: height - 60,
    w: 140,
    h: 90
  };
}

function draw() {
  // Зурагтай background (cover)
  image(bgImage, (width - bgW) / 2, (height - bgH) / 2, bgW, bgH);
  drawSeaweeds();

  // Элс / Далайн ёроол
  noStroke();
  fill(218, 183, 111);
  rect(0, height - 60, width, 60);

  drawRocks();

  // Том хясаа болон наймаалжийг зурах
  drawGiantClam(giantClam);
  drawOctopus(octopus);
  moveOctopus(octopus);

  for (let b of bubbles) {
    drawBubble(b);
    moveBubble(b);
  }

  for (let fish of fishes) {
    drawFish(fish.x, fish.y, fish.size, fish.color, fish.speed);
    moveFish(fish);
  }

  if (shark) {
    drawShark(shark.x, shark.y, shark.size, shark.speedX);
    moveShark(shark);
    checkSharkEatFishes();
  }
}

function drawSeaweeds() {
  strokeWeight(6);
  noFill();

  for (let s of seaweeds) {
    stroke(s.color);
    beginShape();
    let segmentHeight = s.height / s.segmentCount;

    for (let j = 0; j <= s.segmentCount; j++) {
      let wave = sin(frameCount * 0.03 + s.offset + j * 0.3) * (j * 1.5);
      let px = s.x + wave;
      let py = s.baseY - j * segmentHeight;
      vertex(px, py);
    }
    endShape();
  }
}

function drawRocks() {
  noStroke();
  for (let r of rocks) {
    fill(r.color);
    ellipse(r.x, r.y, r.w, r.h);
  }
}

// Том хясаа зурах функц (Нээгдэж, хаагдах хөдөлгөөнтэй + Сувдтай)
function drawGiantClam(clam) {
  push();
  translate(clam.x, clam.y);

  // Хясааны нээгдэх өнцгийн хөдөлгөөн
  let openAngle = sin(frameCount * 0.02) * 0.25 + 0.15;

  // Доод таг
  fill(180, 140, 190);
  stroke(100, 60, 110);
  strokeWeight(3);
  arc(0, 0, clam.w, clam.h, 0, PI, CHORD);

  // Доторх сувд
  noStroke();
  fill(255, 245, 230);
  ellipse(0, -5, 22, 22);
  fill(255);
  ellipse(-3, -8, 7, 7);

  // Дээд таг (Нээгдэж, хаагдана)
  push();
  translate(0, -5);
  rotate(-openAngle);
  stroke(100, 60, 110);
  strokeWeight(3);
  fill(200, 150, 210);
  arc(0, 0, clam.w, clam.h, PI, TWO_PI, CHORD);
  pop();

  pop();
}

// Наймаалж зурах функц
function drawOctopus(oct) {
  push();
  translate(oct.x, oct.y);

  // Наймаалжны хөлнүүд (Давалгаалах хөдөлгөөнтэй)
  stroke(220, 80, 110);
  strokeWeight(8);
  noFill();
  for (let i = -3; i <= 3; i++) {
    beginShape();
    let startX = i * 8;
    for (let j = 0; j < 40; j += 10) {
      let wave = sin(frameCount * 0.1 + i + j * 0.1) * 8;
      vertex(startX + wave, j);
    }
    endShape();
  }

  // Наймаалжны толгой
  noStroke();
  fill(230, 90, 120);
  ellipse(0, -10, oct.size, oct.size * 0.8);

  // Нүднүүд
  fill(255);
  ellipse(-12, -12, 14, 14);
  ellipse(12, -12, 14, 14);
  fill(0);
  ellipse(-12, -12, 6, 6);
  ellipse(12, -12, 6, 6);

  pop();
}

// Наймаалжны хөдөлгөөн
function moveOctopus(oct) {
  oct.x += oct.speedX;
  oct.y += sin(frameCount * 0.05) * 0.5; // Бага зэрэг дээш доош хөвнө

  if (oct.x > width - 100 || oct.x < 100) {
    oct.speedX *= -1;
  }
}

function drawFish(x, y, size, fishColor, speed) {
  push();
  translate(x, y);

  if (speed < 0) {
    scale(-1, 1);
  }

  fill(fishColor);
  noStroke();
  ellipse(0, 0, size, size * 0.6);

  fill(fishColor);
  triangle(
    -size / 2, 0,
    -size / 2 - size / 3, -size / 4,
    -size / 2 - size / 3, size / 4
  );

  fill(255);
  ellipse(size / 4, -size / 8, size / 5, size / 5);
  fill(0);
  ellipse(size / 4 + 1, -size / 8, size / 10, size / 10);

  pop();
}

function moveFish(fish) {
  fish.x += fish.speed;

  if (fish.x + fish.size / 2 > width || fish.x - fish.size / 2 < 0) {
    fish.speed *= -1;
  }
}

function drawShark(x, y, size, speedX) {
  push();
  translate(x, y);

  if (speedX < 0) {
    scale(-1, 1);
  }

  fill(120, 140, 160);
  noStroke();
  ellipse(0, 0, size * 1.3, size * 0.6);

  triangle(
    -size * 0.6, 0,
    -size * 0.9, -size * 0.3,
    -size * 0.9, size * 0.3
  );

  triangle(
    -size * 0.1, -size * 0.25,
    size * 0.1, -size * 0.25,
    -size * 0.1, -size * 0.6
  );

  fill(255);
  ellipse(size * 0.35, -size * 0.15, size * 0.15, size * 0.15);
  fill(0);
  ellipse(size * 0.37, -size * 0.15, size * 0.07, size * 0.07);

  let mouthOpen = abs(sin(frameCount * 0.1)) * (size * 0.12);

  noFill();
  triangle(size * 0.35, 0, size * 0.68, -mouthOpen, size * 0.68, mouthOpen);

  fill(255);
  triangle(size * 0.45, -mouthOpen + 2, size * 0.5, 0, size * 0.55, -mouthOpen + 2);
  triangle(size * 0.45, mouthOpen - 2, size * 0.5, 0, size * 0.55, mouthOpen - 2);

  pop();
}

function moveShark(s) {
  let moveSpeed = 4; 

  if (keyIsDown(87) || keyIsDown(119)) {
    s.y -= moveSpeed;
  }
  if (keyIsDown(83) || keyIsDown(115)) {
    s.y += moveSpeed;
  }
  if (keyIsDown(65) || keyIsDown(97)) {
    s.x -= moveSpeed;
    s.speedX = -1;
  }
  if (keyIsDown(68) || keyIsDown(100)) {
    s.x += moveSpeed;
    s.speedX = 1;
  }

  s.x = constrain(s.x, s.size / 2, width - s.size / 2);
  s.y = constrain(s.y, s.size / 4, height - 60);
}

function checkSharkEatFishes() {
  for (let i = fishes.length - 1; i >= 0; i--) {
    let f = fishes[i];
    let d = dist(shark.x, shark.y, f.x, f.y);

    if (d < shark.size / 2) {
      fishes.splice(i, 1);
    }
  }
}

function drawBubble(bubble) {
  fill(255, 255, 255, 120);
  stroke(255, 255, 255, 200);
  strokeWeight(1);
  ellipse(bubble.x, bubble.y, bubble.size);
}

function moveBubble(bubble) {
  bubble.y -= bubble.speed;

  if (bubble.y < -bubble.size) {
    bubble.y = height - 50;
    bubble.x = random(width);
  }
}

function mousePressed() {
  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    if (mouseButton === LEFT) {
      let speedVal = random(1.5, 4);
      fishes.push({
        x: mouseX,
        y: mouseY,
        size: random(30, 60),
        speed: random() > 0.5 ? speedVal : -speedVal,
        color: color(random(100, 255), random(100, 255), random(255))
      });
    } else if (mouseButton === RIGHT) {
      bubbles.push({
        x: mouseX,
        y: mouseY,
        size: random(8, 20),
        speed: random(1, 3)
      });
    }
  }
}