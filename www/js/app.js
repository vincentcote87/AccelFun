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

// var hole = new Hole();
var holes = [];


function move(e) {
  y = Math.floor(map(e.gamma, -10, 10, -1, 1, true));
  x = Math.floor(map(e.beta, -10, 10, -1, 1, true));
  switch (x) {
    case 1: xSpeed = maxSpeed; break;
    case 0: xSpeed = 0.0; break;
    case -1: xSpeed = -maxSpeed; break;
    default: xSpeed = 0.0;
  }

  switch (y) {
    case 1: ySpeed = maxSpeed; break;
    case 0: ySpeed = 0.0; break;
    case -1: ySpeed = -maxSpeed; break;
    default: ySpeed = 0.0;
  }
  // $('#alpha').html(z);
  // $('#beta').html(y);
  // $('#gamma').html(x);

};

function setup() {
  changeColor();
  let cnv = createCanvas(window.innerWidth, window.innerHeight);
  cnv.parent('canvas');
  addHole();
};

function draw() {
  background(r, g, b);
  fill(255, 35, 255);
  goal.draw();
  // rect(((window.innerWidth / 2) - 25), (window.innerHeight - 75), 50, 50);
  ball.move((1 * xSpeed), (1 * ySpeed));
  ball.draw();
  
  for (let hole of holes) {
    stroke(b,r,g);
    hole.draw();
    // console.log(ball.intersects(hole));
    if (ball.intersects(hole)) {
      holes = [];
      maxSpeed = 1.0;
      ball.reset();
      addHole();
      changeColor();
    }
      // console.log("intersect");
  }

  if (ball.intersects(goal)) {
    // ball.x = 50;
    // ball.y = (window.innerWidth / 2);
    ball.reset();
    maxSpeed += 0.1;
    addHole();
    changeColor();
  }

};

function Ball() {
  this.x = 50;
  this.y = (window.innerWidth / 2);
  this.r = 25;

  this.draw = function() {
    fill(80, 148, 99);
    stroke(g, b, r);
    strokeWeight(10);
    ellipse(this.y, this.x, this.r * 2);
  };

  this.reset = function() {
    this.x = 50;
    this.y = (window.innerWidth / 2);
  }

  this.move = function(moveX, moveY) {
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

  this.intersects = function(obj) {
    // console.log(this.x);
    let dis = dist(this.y, this.x, obj.x, obj.y);
    // console.log(dis);
    return (dis < this.r + obj.r);
  }
}

function Hole(x, y, r) {
  this.x = x;
  this.y = y;
  this.r = r;

  this.draw = function() {
    fill(0, 0, 0);
    ellipse(this.x, this.y, this.r * 2);
  };
}

function Goal(x,y,w) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.r = w / 2;

  this.draw = function() {
    noStroke();
    fill(255, 35, 255);
    rect(this.x - this.r, this.y - this.r / 2, this.w, this.w);
  }

}

function addHole() {
  let y = Math.floor(Math.random() * Math.floor(window.innerHeight));
  let x = Math.floor(Math.random() * Math.floor(window.innerWidth));
  // let x1 = 200;
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

