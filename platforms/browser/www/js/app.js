if (window.DeviceOrientationEvent) {
  window.addEventListener('deviceorientation', move);
} else {
  alert('Your device does not support this feature');
};

var x, y, z;
var ball = new Ball();
var xSpeed = 0.0;
var ySpeed = 0.0;
var maxSpeed = 2.0;

var hole = new Hole();
var holeCoord = [];


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
  $('#alpha').html(z);
  $('#beta').html(y);
  $('#gamma').html(x);

};

function setup() {
  let cnv = createCanvas(window.innerWidth, window.innerHeight);
  cnv.parent('canvas');

};

function draw() {
  background(255, 255, 255);
  fill(255, 35, 255)
  rect(((window.innerWidth / 2) - 25), (window.innerHeight - 75), 50, 50);
  ball.move((1 * xSpeed), (1 * ySpeed));
  ball.draw();
  // addHole();
  for (let i = 0; i < holeCoord.length; i++) {
    hole.draw(holeCoord[i].x, holeCoord[i].y)
  }

};

function Ball() {
  this.ballX = 50;
  this.ballY = (window.innerWidth / 2);
  this.rx = 50;
  this.ry = 50;


  this.draw = function() {
    fill(80, 148, 99);
    ellipse(this.ballY, this.ballX, this.rx, this.ry);
  };

  this.move = function(moveX, moveY) {
    if (this.ballX >= 25)
      this.ballX += moveX;
    else
      this.ballX = 25;
    if (this.ballX <= (window.innerHeight - 25))
      this.ballX += moveX;
    else 
      this.ballX = window.innerHeight - 25;

    if (this.ballY >= 25)
      this.ballY += moveY;
    else
      this.ballY = 25;
    if (this.ballY <= (window.innerWidth - 25))
      this.ballY += moveY;
    else
      this.ballY = window.innerWidth - 25;
  };

  // this.intersects(obj) {
  //   let dis = dist(this.x)
  // }
}

function Hole(hx, hy) {
  this.draw = function() {
    fill(0, 0, 0);
    ellipse(hx, hy, 60, 60);
  };
}

function addHole() {
  let y1 = Math.floor(Math.random() * Math.floor(window.innerHeight));
  let x1 = Math.floor(Math.random() * Math.floor(window.innerWidth));
  // let x1 = 200;
  if (y1 < 120)
    y1 = 120;
  if (y1 > window.innerHeight - 120)
    y1 = window.innerHeight - 120
  let coord = {};
  coord['x'] = x1;
  coord['y'] = y1;
  holeCoord.push(coord);
  
}
