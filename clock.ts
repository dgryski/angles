var canvas = <HTMLCanvasElement>document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var radius = canvas.height / 2;

var steps = 32

ctx.translate(radius, radius);
radius = radius * 0.90
drawClock(radius);

function drawClock(radius) {
  drawFace(ctx, radius);
  drawNumbers(ctx, radius);
  drawTicks(ctx, radius);
  drawRandomAngle(ctx, radius);
}

function drawFace(ctx, radius) {
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2 * Math.PI);
  ctx.fillStyle = 'white';
  ctx.fill();

  ctx.fillStyle = '#333';
}

function drawNumbers(ctx, radius) {
  ctx.font = radius * 0.15 + "px arial";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";

  var stepEvery = 0;

  if (steps == 60) {
    stepEvery = 5
  } else {
    stepEvery = steps / 8
  }

  for (var num = 0; num < steps; num += stepEvery) {
    var ang = num * Math.PI / (steps / 2);
    ctx.rotate(ang);
    ctx.translate(0, -radius * 0.85);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius * 0.85);
    ctx.rotate(-ang);
  }
}

function drawRandomAngle(ctx, radius) {

  var second = Math.floor((Math.random() * steps))

  console.log(second)

  // second
  second = (second * Math.PI / (steps / 2))
  drawHand(ctx, second, radius * 0.9, radius * 0.02);
}

function drawTicks(ctx, radius) {
  var ang;
  var num;

  var length = radius * 0.9;
  var width = radius * 0.02;

  for (num = 1; num <= steps; num++) {
    var pos = num * Math.PI / (steps / 2)
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.moveTo(0, length)
    ctx.lineTo(0, radius)
    ctx.stroke();
    ctx.rotate(-pos);
  }
}

function drawHand(ctx, pos, length, width) {
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.moveTo(0, 0);
  ctx.rotate(pos);
  ctx.lineTo(0, -length);
  ctx.stroke();
  ctx.rotate(-pos);
}
