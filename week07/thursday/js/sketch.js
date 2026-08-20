let scene = {
  count: 10,
  size: 30,
  color: "#3498db",
  shape: "circle"
};


function setup() {
  const canvas = createCanvas(700, 450);

  canvas.parent("canvas-container");


  const countSlider =
    document.querySelector("#count-slider");

  const countValue =
    document.querySelector("#count-value");


  const sizeSlider =
    document.querySelector("#size-slider");

  const sizeValue =
    document.querySelector("#size-value");


  const colorInput =
    document.querySelector("#color-input");


  const shapeSelect =
    document.querySelector("#shape-select");


  const resetButton =
    document.querySelector("#reset-button");


  countSlider.addEventListener(
    "input",
    function () {
      scene.count =
        Number(countSlider.value);

      countValue.textContent =
        scene.count;
    }
  );


  sizeSlider.addEventListener(
    "input",
    function () {
      scene.size =
        Number(sizeSlider.value);

      sizeValue.textContent =
        scene.size;
    }
  );


  colorInput.addEventListener(
    "input",
    function () {
      scene.color =
        colorInput.value;
    }
  );


  shapeSelect.addEventListener(
    "change",
    function () {
      scene.shape =
        shapeSelect.value;
    }
  );


  resetButton.addEventListener(
    "click",
    function () {
      scene.count = 10;
      scene.size = 30;
      scene.color = "#3498db";
      scene.shape = "circle";

      countSlider.value = 10;
      countValue.textContent = 10;

      sizeSlider.value = 30;
      sizeValue.textContent = 30;

      colorInput.value = "#3498db";

      shapeSelect.value = "circle";
    }
  );
}


function draw() {
  background("#f8fafc");

  fill(scene.color);
  noStroke();

  for (let i = 0; i < scene.count; i++) {

    let x =
      70 + (i % 10) * 60;

    let y =
      80 + floor(i / 10) * 100;

    drawShape(
      x,
      y,
      scene.size,
      scene.shape
    );
  }
}


function drawShape(
  x,
  y,
  size,
  shape
) {

  if (shape === "square") {

    rectMode(CENTER);

    square(
      x,
      y,
      size
    );

  } else {

    circle(
      x,
      y,
      size
    );

  }
}