if (window.DeviceOrientationEvent) {
  window.addEventListener('deviceorientation', move);
} else {
  alert('Your device does not support this feature');
};

var x, y, z;
var ball = new Ball();


function move(e) {
  // z = e.alpha;
  // x = e.beta;
  // y = e.gamma;
  x = Math.floor(map(e.gamma, -20, 20, -5, 5, true));
  y = Math.floor(map(e.beta, -20, 20, -5, 5, true));
  // z = e.alpha.toFixed(2);
  // x = e.beta.toFixed(2);
  // y = e.gamma.toFixed(2);
  $('#alpha').html(z);
  $('#beta').html(x);
  $('#gamma').html(y);

};

function setup() {
  let cnv = createCanvas(window.innerWidth, window.innerHeight);
  cnv.parent('canvas');
};

function draw() {
  background(255, 255, 255);
  // ball.move(x,y);
  console.log(typeof(x));
  ball.ballX += Number(x);
  console.log(Number(ball.ballX));
  ball.draw();
};

function Ball() {
  this.rx = 50;
  this.ry = 50;
  this.ballX = 50;
  this.ballY = 100;

  this.draw = function() {
    ellipse(this.ballY, this.ballX, this.rx, this.ry);
  };

  this.move = function(moveX, moveY) {
    this.ballX += moveX;
    this.ballY += moveY;
  }
}
