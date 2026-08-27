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
let eatenCount = 0;

// ---- 3D харагдац / гэрэлтүүлгийн туслах функцууд ----
function rgba(r, g, b, a) {
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

// Радиаль градиент (гэрэлтэй, гүдгэр харагдуулна)
function fillRadialGradient(x, y, r, c1, c2) {
  let g = drawingContext.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, c1);
  g.addColorStop(1, c2);
  drawingContext.fillStyle = g;
}

// Шугаман (босоо) градиент (дээрээ бараан, доороо цайвар)
function fillLinearGradient(x0, y0, x1, y1, c1, c2) {
  let g = drawingContext.createLinearGradient(x0, y0, x1, y1);
  g.addColorStop(0, c1);
  g.addColorStop(1, c2);
  drawingContext.fillStyle = g;
}

// Зургийг ачаалах
function preload() {
  bgImage = loadImage('screenshot/us01.jpeg');
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
      baseSpeed: speedVal,
      color: color(random(200, 255), random(100, 200), random(50, 150)),
      offset: random(1000),
      dartUntil: 0
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

  // Акул
  shark = {
    x: width / 2,
    y: height / 2,
    size: 160,
    speedX: 3,
    speedY: 2,
    tilt: 0,
    biting: 0
  };

  // Наймаалжны анхны байрлал
  octopus = {
    x: width * 0.25,
    y: height - 120,
    size: 70,
    speedX: 1.5,
    offset: 0
  };

  // Том дун хясааны байрлал
  giantClam = {
    x: width * 0.75,
    y: height - 60,
    w: 140,
    h: 90
  };
}

function draw() {
  image(bgImage, (width - bgW) / 2, (height - bgH) / 2, bgW, bgH);

  drawLightRays();
  drawAtmosphere();

  drawSeaweeds();

  // Элс / Далайн ёроол
  noStroke();
  fill(218, 183, 111);
  rect(0, height - 60, width, 60);

  drawRocks();

  // Акулын сүүдэр (элсэн дээр)
  if (shark) {
    let depthFactor = constrain(1 - (height - 40 - shark.y) / height, 0.12, 1);
    noStroke();
    fill(0, 0, 30, 80 * depthFactor);
    ellipse(
      shark.x + shark.speedX * 30, height - 28,
      shark.size * 1.7 * depthFactor, shark.size * 0.28 * depthFactor
    );
  }

  drawGiantClam(giantClam);
  drawOctopus(octopus);
  moveOctopus(octopus);

  for (let b of bubbles) {
    drawBubble(b);
    moveBubble(b);
  }

  for (let fish of fishes) {
    drawFish(fish.x, fish.y, fish.size, fish.color, fish.speed, fish.offset);
    moveFish(fish, shark);
  }

  if (shark) {
    drawShark(shark.x, shark.y, shark.size, shark.speedX, shark.tilt);
    moveShark(shark);
    checkSharkEatFishes();
  }

  drawVignette();
  updateStats();
}

// Далайн гүнээс гэрэл тусах промин (light rays)
function drawLightRays() {
  noStroke();
  let t = frameCount * 0.01;
  for (let i = 0; i < 6; i++) {
    let x = ((i * 300 + t * 40) % (width + 400)) - 200;
    let w = 110 + sin(frameCount * 0.02 + i) * 40;
    fill(255, 240, 200, 16);
    beginShape();
    vertex(x, -10);
    vertex(x + w, -10);
    vertex(x + w + 180 + sin(i + t) * 60, height);
    vertex(x - 140 + cos(i + t) * 40, height);
    endShape(CLOSE);
  }
}

// Далайн гүний өнгөт манан
function drawAtmosphere() {
  noStroke();
  fillLinearGradient(
    0, 0, 0, height,
    rgba(40, 120, 180, 45),
    rgba(5, 25, 70, 60)
  );
  rect(0, 0, width, height);
}

// Кадрын ирмэгийг бараантган хүрээлэх (cinematic vignette)
function drawVignette() {
  noStroke();
  fillRadialGradient(
    width / 2, height / 2, width * 0.55,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 25, 160)
  );
  rect(0, 0, width, height);
}

function drawSeaweeds() {
  noFill();

  for (let s of seaweeds) {
    let segmentHeight = s.height / s.segmentCount;

    // Бүдэг дэвсгэр сэрвээ (гүнзгий харагдац)
    stroke(red(s.color) * 0.6, green(s.color) * 0.6, blue(s.color) * 0.6, 120);
    strokeWeight(9);
    beginShape();
    for (let j = 0; j <= s.segmentCount; j++) {
      let wave = sin(frameCount * 0.03 + s.offset + j * 0.3) * (j * 1.5);
      vertex(s.x + 5 + wave, s.baseY - j * segmentHeight);
    }
    endShape();

    // Үндсэн гэрэлтэй иш
    stroke(s.color);
    strokeWeight(6);
    beginShape();
    for (let j = 0; j <= s.segmentCount; j++) {
      let wave = sin(frameCount * 0.03 + s.offset + j * 0.3) * (j * 1.5);
      vertex(s.x + wave, s.baseY - j * segmentHeight);
    }
    endShape();
  }
}

function drawRocks() {
  noStroke();
  for (let r of rocks) {
    fillRadialGradient(
      r.x - r.w * 0.15, r.y - r.h * 0.3, r.w * 0.8,
      rgba(red(r.color) + 40, green(r.color) + 40, blue(r.color) + 40, 255),
      rgba(red(r.color), green(r.color), blue(r.color), 255)
    );
    ellipse(r.x, r.y, r.w, r.h);
  }
}

function drawGiantClam(clam) {
  push();
  translate(clam.x, clam.y);

  let openAngle = sin(frameCount * 0.02) * 0.25 + 0.15;

  // Доод хясаа
  noStroke();
  fillLinearGradient(
    0, 0, 0, clam.h / 2,
    rgba(210, 160, 220, 255),
    rgba(130, 70, 150, 255)
  );
  stroke(100, 60, 110);
  strokeWeight(3);
  arc(0, 0, clam.w, clam.h, 0, PI, CHORD);

  // Гялалзсан сувд (radial гэрэлтэй)
  noStroke();
  fillRadialGradient(0, -5, 20, rgba(255, 255, 255, 255), rgba(255, 235, 210, 30));
  ellipse(0, -5, 24, 24);
  fill(255);
  ellipse(-3, -8, 7, 7);

  push();
  translate(0, -5);
  rotate(-openAngle);
  stroke(100, 60, 110);
  strokeWeight(3);
  fillLinearGradient(
    0, -clam.h / 2, 0, 0,
    rgba(225, 175, 235, 255),
    rgba(160, 100, 180, 255)
  );
  arc(0, 0, clam.w, clam.h, PI, TWO_PI, CHORD);
  pop();

  pop();
}

function drawOctopus(oct) {
  push();
  translate(oct.x, oct.y);

  // Сүүдэр
  noStroke();
  fill(0, 0, 30, 50);
  ellipse(0, oct.size * 0.6, oct.size * 1.3, oct.size * 0.3);

  // Гар (тентакли) - баяжуулсан өнгө
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

  // Гарны сорох савар (suction cups)
  fill(250, 220, 225, 200);
  noStroke();
  for (let i = -3; i <= 3; i++) {
    for (let j = 15; j < 45; j += 12) {
      let wave = sin(frameCount * 0.1 + i + j * 0.1) * 8;
      ellipse(i * 8 + wave + 6, j, 4, 4);
    }
  }

  // Толгой (radial градиент - гүдгэр харагдац)
  fillRadialGradient(
    -oct.size * 0.15, -oct.size * 0.35, oct.size * 0.7,
    rgba(255, 150, 175, 255),
    rgba(200, 60, 100, 255)
  );
  ellipse(0, -10, oct.size, oct.size * 0.8);

  // Нүд (аниад нээгддэг)
  let blink = (frameCount * 0.02 + oct.offset) % 90;
  let closed = blink < 3;
  fill(255);
  ellipse(-12, -12, 14, 14);
  ellipse(12, -12, 14, 14);
  if (closed) {
    fill(200, 60, 100);
    ellipse(-12, -12, 14, 4);
    ellipse(12, -12, 14, 4);
  } else {
    fill(0);
    ellipse(-12, -12, 6, 6);
    ellipse(12, -12, 6, 6);
    fill(255);
    ellipse(-13, -14, 2.5, 2.5);
    ellipse(11, -14, 2.5, 2.5);
  }

  pop();
}

function moveOctopus(oct) {
  oct.x += oct.speedX;
  oct.y += sin(frameCount * 0.05) * 0.5;

  if (oct.x > width - 100 || oct.x < 100) {
    oct.speedX *= -1;
  }
}

// Жижиг загасыг илүү гоё, амьд зурах (гөлгөр бие, хөдөлгөөнт сэрвээ, гялалзсан нүд)
function drawFish(x, y, size, fishColor, speed, offset) {
  push();
  translate(x, y);

  if (speed < 0) {
    scale(-1, 1);
  }

  let w = size;        // Биеийн урт
  let h = size * 0.55; // Биеийн өндөр
  let tailWob = sin(frameCount * 0.15) * w * 0.06; // Сүүлний даллагаа

  noStroke();

  // Биеийн доорх сүүдэр
  fill(0, 0, 30, 40);
  ellipse(w * 0.05, h * 0.55, w * 0.9, h * 0.3);

  // Сүүлний сэрвээ (дээд + доод дэлбээ, хөдөлгөөнтэй)
  fill(fishColor);
  triangle(
    -w * 0.45, -h * 0.05,
    -w * 0.95, -h * 0.42 + tailWob * 2,
    -w * 0.55, -h * 0.05
  );
  triangle(
    -w * 0.45, h * 0.05,
    -w * 0.95, h * 0.42 + tailWob * 2,
    -w * 0.55, h * 0.05
  );

  // Нурууны сэрвээ
  fill(red(fishColor) * 0.85, green(fishColor) * 0.85, blue(fishColor) * 0.85);
  beginShape();
  vertex(-w * 0.08, -h * 0.3);
  bezierVertex(-w * 0.2, -h * 0.85 + tailWob, w * 0.1, -h * 0.8 + tailWob, w * 0.14, -h * 0.28);
  endShape(CLOSE);

  // Гэдэсний сэрвээ
  triangle(
    -w * 0.05, h * 0.25,
    -w * 0.05, h * 0.55 + tailWob * 0.5,
    w * 0.12, h * 0.28
  );

  // Бие (гөлгөр дусал хэлбэртэй, босоо градиент - 3D харагдац)
  let r = red(fishColor), g = green(fishColor), b = blue(fishColor);
  fillLinearGradient(
    -w * 0.2, -h * 0.8, -w * 0.2, h * 0.8,
    rgba(r * 0.75, g * 0.75, b * 0.75, 255),
    rgba(min(255, r + 60), min(255, g + 60), min(255, b + 60), 255)
  );
  beginShape();
  vertex(-w * 0.45, 0);
  bezierVertex(-w * 0.2, -h * 0.95, w * 0.4, -h * 0.55, w * 0.52, 0);
  bezierVertex(w * 0.4, h * 0.55, -w * 0.2, h * 0.95, -w * 0.45, 0);
  endShape(CLOSE);

  // Нурууны гялбаа (sheen)
  fill(255, 255, 255, 55);
  ellipse(0, -h * 0.35, w * 0.55, h * 0.2);

  // Цээжний сэрвээ
  fill(red(fishColor) * 0.7, green(fishColor) * 0.7, blue(fishColor) * 0.7);
  ellipse(w * 0.02, h * 0.2, w * 0.2, h * 0.22);

  // Биеийн судал
  noFill();
  stroke(0, 0, 0, 30);
  strokeWeight(w * 0.05);
  arc(0, -h * 0.12, w * 0.32, h * 0.45, PI * 0.15, PI * 0.85);
  arc(-w * 0.14, -h * 0.06, w * 0.32, h * 0.5, PI * 0.15, PI * 0.85);

  // Заламж
  stroke(0, 0, 0, 40);
  strokeWeight(1.5);
  noFill();
  arc(w * 0.2, 0, w * 0.2, h * 0.55, -PI * 0.65, PI * 0.65);

  // Нүд (гялалзсан, заримдаа анидаг)
  let blink = (frameCount * 0.02 + offset) % 80;
  noStroke();
  if (blink < 3) {
    stroke(25, 25, 35);
    strokeWeight(w * 0.022);
    line(w * 0.26, -h * 0.12, w * 0.36, -h * 0.12);
  } else {
    fill(255);
    ellipse(w * 0.3, -h * 0.12, w * 0.14, w * 0.14);
    fill(25, 25, 35);
    ellipse(w * 0.32, -h * 0.12, w * 0.075, w * 0.075);
    fill(255);
    ellipse(w * 0.34, -h * 0.15, w * 0.03, w * 0.03);
  }

  pop();
}

function moveFish(fish, shark) {
  fish.x += fish.speed;
  fish.y += sin(frameCount * 0.04 + fish.x * 0.01) * 0.6;

  // Акул ойртоход загас сандарч зугтана (амьд зан)
  if (shark) {
    let d = dist(fish.x, fish.y, shark.x, shark.y);
    if (d < shark.size * 1.9) {
      fish.dartUntil = frameCount + 35;
    }
    if (frameCount < fish.dartUntil) {
      let dir = fish.x < shark.x ? -1 : 1;
      fish.speed = lerp(fish.speed, dir * 7, 0.1);
    } else {
      fish.speed = lerp(fish.speed, fish.baseSpeed * (fish.speed >= 0 ? 1 : -1), 0.02);
    }
  }

  if (fish.x + fish.size / 2 > width || fish.x - fish.size / 2 < 0) {
    fish.speed *= -1;
  }
}

// Акул зурах функц (3D харагдац: градиент, сүүдэр, хазайлт, хазаж хаздаг хөдөлгөөн)
function drawShark(x, y, size, speedX, tilt) {
  push();
  translate(x, y);
  rotate(tilt + sin(frameCount * 0.05) * 0.02);

  if (speedX < 0) {
    scale(-1, 1);
  }

  let s = size;
  let tailWag = sin(frameCount * 0.12) * s * 0.08;   // Сүүлний даллагаа
  let finSway = sin(frameCount * 0.1) * s * 0.04;    // Сэрвээний даллагаа

  noStroke();

  // Сүүдэр (усан доторх гүн)
  fill(0, 0, 30, 45);
  ellipse(s * 0.1, s * 0.32, s * 1.4, s * 0.22);

  // Сүүлний сэрвээ (дээд + доод дэлбээ)
  fill(8, 18, 55);
  triangle(
    -s * 0.55, 0,
    -s * 0.98, -s * 0.42 + tailWag * 2,
    -s * 0.6, -s * 0.02
  );
  fill(20, 40, 80);
  triangle(
    -s * 0.55, 0,
    -s * 0.95, s * 0.4 + tailWag * 2,
    -s * 0.6, s * 0.02
  );

  // Бие (босоо градиент - дээд тал бараан, доод тал цайвар)
  fillLinearGradient(
    -s * 0.3, -s * 0.42, -s * 0.3, s * 0.42,
    rgba(10, 22, 60, 255),
    rgba(40, 75, 140, 255)
  );
  beginShape();
  vertex(-s * 0.55, 0);
  bezierVertex(-s * 0.3, -s * 0.45, s * 0.15, -s * 0.35, s * 0.62, 0);
  bezierVertex(s * 0.2, s * 0.3, -s * 0.15, s * 0.3, -s * 0.55, 0);
  endShape(CLOSE);

  // Хэвлийн цайвар хэсэг
  fill(70, 110, 165, 190);
  beginShape();
  vertex(-s * 0.5, 0);
  bezierVertex(-s * 0.25, s * 0.22, s * 0.2, s * 0.24, s * 0.58, 0);
  bezierVertex(s * 0.15, s * 0.12, -s * 0.2, s * 0.1, -s * 0.5, 0);
  endShape(CLOSE);

  // Нурууны гялбаа (усны тусгал)
  fill(160, 200, 255, 40);
  beginShape();
  vertex(-s * 0.45, -s * 0.2);
  bezierVertex(-s * 0.2, -s * 0.4, s * 0.1, -s * 0.32, s * 0.5, -s * 0.05);
  bezierVertex(s * 0.1, -s * 0.22, -s * 0.2, -s * 0.3, -s * 0.45, -s * 0.2);
  endShape(CLOSE);

  // Нурууны том сэрвээ
  fill(8, 18, 55);
  beginShape();
  vertex(-s * 0.28, -s * 0.28);
  bezierVertex(-s * 0.15, -s * 0.95 + finSway, s * 0.05, -s * 0.8 + finSway, s * 0.05, -s * 0.22);
  endShape(CLOSE);

  // Хоёрдахь нурууны сэрвээ (жижиг)
  fill(12, 25, 65);
  beginShape();
  vertex(-s * 0.43, -s * 0.2);
  bezierVertex(-s * 0.46, -s * 0.45 + finSway * 0.8, -s * 0.36, -s * 0.42 + finSway * 0.8, -s * 0.35, -s * 0.15);
  endShape(CLOSE);

  // Цээжний сэрвээ
  fill(15, 35, 85);
  beginShape();
  vertex(-s * 0.05, s * 0.12);
  bezierVertex(-s * 0.22, s * 0.42 + finSway * 1.5, s * 0.12, s * 0.45 + finSway * 1.5, s * 0.16, s * 0.18);
  endShape(CLOSE);

  // Заламж (3 ширхэг нум)
  stroke(70, 100, 150, 130);
  strokeWeight(s * 0.015);
  noFill();
  for (let i = 0; i < 3; i++) {
    arc(s * 0.16 + i * s * 0.1, 0, s * 0.2, s * 0.42, -PI * 0.45, PI * 0.45);
  }

  // Нүд (гялалзсан) + хөмсөг
  noStroke();
  fill(255);
  ellipse(s * 0.42, -s * 0.1, s * 0.13, s * 0.13);
  fill(20, 25, 40);
  ellipse(s * 0.44, -s * 0.1, s * 0.07, s * 0.07);
  fill(255);
  ellipse(s * 0.46, -s * 0.13, s * 0.028, s * 0.028);

  stroke(8, 18, 55);
  strokeWeight(s * 0.025);
  line(s * 0.33, -s * 0.18, s * 0.49, -s * 0.15);

  // Хамар
  noStroke();
  fill(8, 18, 55);
  arc(s * 0.58, -s * 0.04, s * 0.09, s * 0.06, 0, PI);

  // Ам: хазж байгаа үед том нээгдэнэ
  let biting = frameCount < shark.biting;
  let mouthOpen = biting
    ? s * 0.09 + sin(frameCount * 0.3) * s * 0.02
    : abs(sin(frameCount * 0.08)) * s * 0.06;

  // Амны дотор (харагдсан үед бараан улаан)
  noStroke();
  fill(80, 10, 25);
  beginShape();
  vertex(s * 0.3, s * 0.1);
  bezierVertex(s * 0.36, s * 0.1 + mouthOpen * 0.5, s * 0.44, s * 0.1 + mouthOpen * 0.6, s * 0.5, s * 0.1 + mouthOpen);
  bezierVertex(s * 0.44, s * 0.07 + mouthOpen * 0.3, s * 0.36, s * 0.06, s * 0.3, s * 0.08);
  endShape(CLOSE);

  stroke(255, 255, 255, 200);
  strokeWeight(s * 0.012);
  noFill();
  line(s * 0.3, s * 0.1, s * 0.5, s * 0.1 + mouthOpen);

  noStroke();
  fill(255);
  for (let i = 0; i < 4; i++) {
    let tx = s * (0.33 + i * 0.045);
    triangle(
      tx, s * 0.1,
      tx + s * 0.03, s * 0.1 + mouthOpen * 0.7 + s * 0.012,
      tx + s * 0.06, s * 0.1
    );
    triangle(
      tx, s * 0.1 + mouthOpen * 0.9,
      tx + s * 0.03, s * 0.1 + mouthOpen * 0.3,
      tx + s * 0.06, s * 0.1 + mouthOpen * 0.9
    );
  }

  pop();
}

function moveShark(s) {
  let moveSpeed = 4;
  let vy = 0;

  s.y += sin(frameCount * 0.03) * 0.3;

  if (keyIsDown(87) || keyIsDown(119) || keyIsDown(UP_ARROW)) {
    s.y -= moveSpeed;
    vy = -1;
  }
  if (keyIsDown(83) || keyIsDown(115) || keyIsDown(DOWN_ARROW)) {
    s.y += moveSpeed;
    vy = 1;
  }
  if (keyIsDown(65) || keyIsDown(97) || keyIsDown(LEFT_ARROW)) {
    s.x -= moveSpeed;
    s.speedX = -1;
  }
  if (keyIsDown(68) || keyIsDown(100) || keyIsDown(RIGHT_ARROW)) {
    s.x += moveSpeed;
    s.speedX = 1;
  }

  // Хазайлт (дээш/доош явахад бие нь хазайна - 3D харагдац)
  s.tilt = lerp(s.tilt, vy * 0.14, 0.06);

  s.x = constrain(s.x, s.size * 0.6, width - s.size * 0.6);
  s.y = constrain(s.y, s.size * 0.3, height - 70);
}

function checkSharkEatFishes() {
  for (let i = fishes.length - 1; i >= 0; i--) {
    let f = fishes[i];
    let d = dist(shark.x, shark.y, f.x, f.y);

    if (d < shark.size * 0.45) {
      fishes.splice(i, 1);
      eatenCount++;
      shark.biting = frameCount + 18;

      // Идсэн загасны оронд бөмбөлөгүүд гарах нь
      for (let k = 0; k < 3; k++) {
        bubbles.push({
          x: f.x + random(-20, 20),
          y: f.y + random(-20, 20),
          size: random(6, 14),
          speed: random(1, 3)
        });
      }
    }
  }
}

function drawBubble(bubble) {
  noStroke();
  fillRadialGradient(
    bubble.x - bubble.size * 0.3, bubble.y - bubble.size * 0.3, bubble.size * 0.9,
    rgba(255, 255, 255, 150),
    rgba(200, 230, 255, 40)
  );
  ellipse(bubble.x, bubble.y, bubble.size);

  // Гялбаа (цацраг)
  fill(255, 255, 255, 220);
  ellipse(bubble.x - bubble.size * 0.25, bubble.y - bubble.size * 0.25, bubble.size * 0.18, bubble.size * 0.18);
}

function moveBubble(bubble) {
  bubble.y -= bubble.speed;
  bubble.x += sin(frameCount * 0.05 + bubble.size) * 0.3;

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
        baseSpeed: speedVal,
        color: color(random(100, 255), random(100, 255), random(255)),
        offset: random(1000),
        dartUntil: 0
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

// UI статистикийг шинэчлэх
function updateStats() {
  if (frameCount % 8 !== 0) return;
  let elFish = document.getElementById('stat-fish');
  let elBubbles = document.getElementById('stat-bubbles');
  let elEaten = document.getElementById('stat-eaten');
  if (elFish) elFish.textContent = fishes.length;
  if (elBubbles) elBubbles.textContent = bubbles.length;
  if (elEaten) elEaten.textContent = eatenCount;
}