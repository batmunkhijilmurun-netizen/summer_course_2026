 let WIDTH = 400;
 let EELIPSE_Y = 200;

function setup() {
   
    let HEIGH = 400;
    createCanvas(WIDTH, HEIGH);
}
 let HEIGH = 400; 
 createCanvas(HEIGH, WIDTH)
function draw() {
let RADIUS = 40;
    // 1. Sunset Sky
    background(255, 160, 122); // Light salmon

    // 2. The Sun
    noStroke();
    fill(255, 215, 0); // Gold
    ellipse(300, 100, 80, 80); // Placed in the top right

    // 3. The Ground
    fill(46, 139, 87); // Sea green
    rect(0, 300, WIDTH, 100);

    // 4. The Tree Trunk
    fill(101, 67, 33); // Dark brown
    rect(80, 200, 40, 120);

    // 5. The Tree Leaves (Overlapping circles)
    fill(34, 139, 34); // Forest green
    // Left leaf clump
    ellipse(70,  EELIPSE_Y , 80, 40, RADIUS);
    // Right leaf clump
    ellipse(130,  EELIPSE_Y , 80, 40, RADIUS);
    ellipse(140,  EELIPSE_Y , 80, 40, RADIUS);
    ellipse(150,  EELIPSE_Y , 80, 40, RADIUS);
    // Top center leaf clump
    ellipse(100, 160, 90, 90);
}