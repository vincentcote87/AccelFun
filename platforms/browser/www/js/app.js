if (window.DeviceOrientationEvent) {
  window.addEventListener('deviceorientation', move);
} else {
  alert('Your device does not support this feature');
};

var x, y, z;
var ball = new Ball();
var xSpeed = 0.0;
var ySpeed = 0.0;
var maxSpeed = 1.0;
var goal = new Goal(((window.innerWidth / 2)), (window.innerHeight - 75), 50);
var r, g, b;
var isPaused = true;
var isStart = true;
var holes = [];

function move(e) {
  y = Math.floor(map(e.gamma, -10, 10, -1, 1, true));
  x = Math.floor(map(e.beta, -10, 10, -1, 1, true));
  switch (x) {
    case 1:
      xSpeed = maxSpeed;
      break;
    case 0:
      xSpeed = 0.0;
      break;
    case -1:
      xSpeed = -maxSpeed;
      break;
    default:
      xSpeed = 0.0;
  }

  switch (y) {
    case 1:
      ySpeed = maxSpeed;
      break;
    case 0:
      ySpeed = 0.0;
      break;
    case -1:
      ySpeed = -maxSpeed;
      break;
    default:
      ySpeed = 0.0;
  }
};

function setup() {
  changeColor();
  let cnv = createCanvas(window.innerWidth, window.innerHeight);
  cnv.parent('canvas');
  addHole();
};

function mousePressed() {
  console.log(mouseX);
  console.log(mouseY);
  if (mouseX > (window.innerWidth / 2) - 125 &&
    mouseX < (window.innerWidth / 2) + 125 &&
    mouseY > (window.innerHeight / 2) + 125 &&
    mouseY < (window.innerHeight / 2) + 200) {
    if (isPaused) {
      isPaused = false;
      isStart = false;
      holes = [];
      maxSpeed = 1.0;
      ball.reset();
      addHole();
      changeColor();
    }
  }
}

function draw() {
  background(r, g, b);
  fill(255, 35, 255);
  goal.draw();
  if (!isPaused)
    ball.move((1 * xSpeed), (1 * ySpeed));
  ball.draw();
  displayScore();

  for (let hole of holes) {
    stroke(b, r, g);
    hole.draw();
    if (ball.intersects(hole)) {
      isPaused = true;
    }
  }

  if (ball.intersects(goal)) {
    ball.reset();
    maxSpeed += 0.1;
    addHole();
    changeColor();
  }
  if (isStart) {
    interact('Get the green ball\n to the pink box\n without touching the\n black balls', 'START');
  } else if (isPaused) {
    interact(`Your score is ${holes.length}!`, 'TRY AGAIN')
  }

};

function Ball() {
  this.x = 50;
  this.y = (window.innerWidth / 2);
  this.r = 25;

  this.draw = function () {
    fill(80, 148, 99);
    stroke(g, b, r);
    strokeWeight(10);
    ellipse(this.y, this.x, this.r * 2);
  };

  this.reset = function () {
    this.x = 50;
    this.y = (window.innerWidth / 2);
  }

  this.move = function (moveX, moveY) {
    if (this.x >= 25)
      this.x += moveX;
    else
      this.x = 25;
    if (this.x <= (window.innerHeight - 25))
      this.x += moveX;
    else
      this.x = window.innerHeight - 25;

    if (this.y >= 25)
      this.y += moveY;
    else
      this.y = 25;
    if (this.y <= (window.innerWidth - 25))
      this.y += moveY;
    else
      this.y = window.innerWidth - 25;
  };

  this.intersects = function (obj) {
    let dis = dist(this.y, this.x, obj.x, obj.y);
    return (dis < this.r + obj.r);
  }
}

function Hole(x, y, r) {
  this.x = x;
  this.y = y;
  this.r = r;

  this.draw = function () {
    fill(0, 0, 0);
    ellipse(this.x, this.y, this.r * 2);
  };
}

function Goal(x, y, w) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.r = w / 2;

  this.draw = function () {
    stroke(255, 255, 255);
    strokeWeight(5)
    fill(255, 35, 255);
    rect(this.x - this.r, this.y - this.r / 2, this.w, this.w, 10);
  }

}

function addHole() {
  let y = Math.floor(Math.random() * Math.floor(window.innerHeight));
  let x = Math.floor(Math.random() * Math.floor(window.innerWidth));
  if (y < 120)
    y = 120;
  if (y > window.innerHeight - 120)
    y = window.innerHeight - 120
  let hole = new Hole(x, y, 25);
  holes.push(hole);
}

function changeColor() {
  r = random(255);
  g = random(255);
  b = random(255);
}

function displayScore() {
  let score = holes.length;
  push();
  textSize(32);
  stroke(255, 35, 255);
  fill(148, 0, 211);
  strokeWeight(3);
  translate(50, 50);
  text(score, 0, 0);
  pop();
}

function interact(infoText, btnText) {
  let wPadding = 50;
  let hPadding = 100;

  let btn = new Button(btnText);

  push();
  stroke(0, 0, 0);
  strokeWeight(10);
  fill(255, 255, 255);
  rect(wPadding, hPadding, (window.innerWidth - (wPadding * 2)), (window.innerHeight - (hPadding * 2)), 30);
  pop();

  push();
  noStroke();
  fill(0, 0, 0);
  textSize(28);
  textAlign(CENTER, CENTER);
  text(infoText, window.innerWidth / 2, (window.innerHeight / 2) - 100);
  pop();

  push();
  btn.draw();
  pop();
}

function Button(btnText) {
  this.w = 250;
  this.h = 75;
  this.x = window.innerWidth / 2 - 125;
  this.y = (window.innerHeight / 2) + 125;

  this.draw = function () {
    fill(148, 0, 211);
    stroke(255, 35, 255);
    strokeWeight(3);
    rect(this.x, this.y, this.w, this.h, this.w);
    push();
    noStroke();
    fill(255);
    textSize(28);
    textAlign(CENTER, CENTER);
    text(btnText, window.innerWidth / 2, (window.innerHeight / 2) + 162);
    pop();
  }
}
