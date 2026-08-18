const scene = {
    size: 100,
    color: "#3498db",
    shape: "circle",
};

function setup() {
    // 1. HTML дээрх савны ID "canvas-container" (a-тай) байна
    const canvas = createCanvas(400, 400);
    canvas.parent("canvas-container");

    const sizeSlider = document.querySelector('#size-slider');
    const colorInput = document.querySelector('#color-input');
    const shapeSelector = document.querySelector('#shape-select');

    // 2. Эвент сонсогчдыг тус тусад нь (ганц ганцаар нь) зарлана
    if (colorInput) {
        colorInput.addEventListener('input', function () {
            scene.color = colorInput.value;
        });
    }

    if (sizeSlider) {
        sizeSlider.addEventListener('input', function () {
            scene.size = Number(sizeSlider.value);
        });
    }

    if (shapeSelector) {
        shapeSelector.addEventListener('change', function () {
            scene.shape = shapeSelector.value;
        });
    }
}

function draw() {
    background('#f5f5f5');
    drawShape(width / 2, height / 2, scene.size, scene.color, scene.shape);
}

function drawShape(x, y, size, color, shape) {
    fill(color);
    noStroke();
    if (shape === 'square') {
        rectMode(CENTER);
        square(x, y, size);
    } else {
        circle(x, y, size);
    }
}