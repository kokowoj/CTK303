let particles = [];

function drawStar(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;

  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    vertex(x + cos(a) * radius1, y + sin(a) * radius1);
    vertex(x + cos(a + halfAngle) * radius2, y + sin(a + halfAngle) * radius2);
  }
  endShape(CLOSE);
}

function setup() {
  let c = createCanvas(window.innerWidth, window.innerHeight);
  c.parent(document.body);
  clear();
  noStroke();
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
}

function draw() {
  clear();

  if (frameCount % 2 === 0) {
    let colors = [
      [255, 255, 255],
      [255, 105, 180],
      [255, 220, 120]
    ];

    let c = random(colors);
    particles.push(new Particle(mouseX, mouseY, c));
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();

    if (particles[i].alpha <= 0) {
      particles.splice(i, 1);
    }
  }
}

class Particle {
  constructor(x, y, col) {
    this.x = x;
    this.y = y;
    this.r = col[0];
    this.g = col[1];
    this.b = col[2];
    this.alpha = 255;

    this.vx = random(-1.5, 1.5);
    this.vy = random(-3, -0.5);
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 3;
  }

  display() {
    fill(this.r, this.g, this.b, this.alpha);
    drawStar(this.x, this.y, 6, 3, 5);
  }
}

function mousePressed() {
  particles = [];
}