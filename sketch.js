// star helper
function drawStar(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius1;
    let sy = y + sin(a) * radius1;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius2;
    sy = y + sin(a + halfAngle) * radius2;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

// star particles 
let stars = [];

class Star {
  constructor(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.o = 255;
    this.x = mouseX;
    this.y = mouseY;
  }

  display() {
    fill(this.r, this.g, this.b, this.o);
    noStroke();
    drawStar(this.x, this.y, 10, 5, 5);
    this.o -= 4;
  }

  move() {
    this.x += random(-2, 2);
    this.y -= random(0, 4);
  }
}

// hearts <3
var bubbles = [];
let url = "";

class Bubble {
  constructor(season, color, name) {
    this.season = season;
    this.color = color;
    this.name = name;
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(random(2, 4), 0);
  }

  display() {
    stroke("#50404D");
    fill("#94426A");
    strokeWeight(6);

    // HEART SHAPE
    beginShape();
    for (let t = 0; t <= TWO_PI; t += 0.1) {
      let x = 16 * pow(sin(t), 3);
      let y = -(13 * cos(t) - 5 * cos(2 * t) - 2 * cos(3 * t) - cos(4 * t));
      vertex(this.pos.x + x * 3, this.pos.y + y * 3);
    }
    endShape(CLOSE);

    noStroke();
    fill("white");
    textAlign(CENTER);
    textSize(12);
    text(
      this.name + "\n" + this.color + "\n" + this.season,
      this.pos.x,
      this.pos.y
    );

    // movement
    this.pos.add(this.vel);
    if (this.pos.x > width + 50) {
      this.pos.x = -50;
    }
  }
}

// data from google doc
function gotData(data) {
  for (let i = 0; i < data.length; i++) {
    bubbles.push(
      new Bubble(
        data[i]["fav season"],
        data[i]["fav cool color"],
        data[i]["name"]
      )
    );
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER);

  let key = "1S6PG7r8-7G7kIp_1lboFaY54DYjUoW3Q4eWhv3t7Qu8";
  url = "https://opensheet.vercel.app/" + key + "/Form+Responses+1";
  loadJSON(url, gotData);
}

function draw() {

  background("#B19CD7");

  // HEARTS
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].display();
  }

  // STAR TRAIL 
  if (frameCount % 2 === 0) {
    if (frameCount % 3 === 0) stars.push(new Star(255, 255, 0));
    else if (frameCount % 3 === 1) stars.push(new Star(255, 105, 180));
    else stars.push(new Star(255, 255, 255));
  }

  for (let i = stars.length - 1; i >= 0; i--) {
    stars[i].display();
    stars[i].move();
    if (stars[i].o < 0) {
      stars.splice(i, 1);
    }
  }
}

function mousePressed() {
  stars = [];
}
