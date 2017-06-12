
function drawClock(ctx: CanvasRenderingContext2D, steps: number, radius: number) {
  drawFace(ctx, radius);
  drawNumbers(ctx, steps, radius);
  drawTicks(ctx, steps, radius);
  drawRandomAngle(ctx, steps, radius);
}

function drawFace(ctx: CanvasRenderingContext2D, radius: number) {
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2 * Math.PI);
  ctx.fillStyle = 'white';
  ctx.fill();

  ctx.fillStyle = '#333';
}

function drawNumbers(ctx: CanvasRenderingContext2D, steps: number, radius: number) {
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

function drawRandomAngle(ctx: CanvasRenderingContext2D, steps: number, radius: number) {
  var ang = Math.floor((Math.random() * steps))
  ang = (ang * Math.PI / (steps / 2))
  drawHand(ctx, ang, radius * 0.9, radius * 0.02);
}

function drawTicks(ctx: CanvasRenderingContext2D, steps: number, radius: number) {
  var length = radius * 0.9;
  var width = radius * 0.02;

  for (var num = 0; num < steps; num++) {
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

function drawHand(ctx: CanvasRenderingContext2D, pos: number, length: number, width: number) {
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.moveTo(0, 0);
  ctx.rotate(pos);
  ctx.lineTo(0, length);
  ctx.lineTo(0, -length)
  ctx.stroke();
  ctx.rotate(-pos);
}

function main() {

  var canvas = <HTMLCanvasElement>document.getElementById("canvas");
  if (canvas == null) {
    return
  }
  var ctx = canvas.getContext("2d");
  if (ctx == null) {
    return
  }
  var radius = canvas.height / 2;
  var steps: number = 32

  ctx.translate(radius, radius);
  drawClock(ctx, steps, radius * 0.90);
}

main()
