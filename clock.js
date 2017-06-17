function drawFace(ctx, radius) {
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.fillStyle = '#333';
}
function drawNumbers(ctx, steps, radius) {
    ctx.font = radius * 0.15 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    var stepEvery = 0;
    if (steps == 60) {
        stepEvery = 5;
    }
    else {
        stepEvery = steps / 8;
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
function drawLine(ctx, pos, width, f) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    f();
    ctx.stroke();
    ctx.rotate(-pos);
}
function drawRandomAngle(ctx, steps, radius) {
    var ang = Math.floor((Math.random() * steps));
    ang = (ang * Math.PI / (steps / 2));
    drawHand(ctx, ang, radius * 0.9, radius * 0.02);
}
function drawTicks(ctx, steps, radius) {
    var length = radius * 0.9;
    var width = radius * 0.02;
    for (var num = 0; num < steps; num++) {
        var pos = num * Math.PI / (steps / 2);
        drawLine(ctx, pos, width, function () {
            ctx.moveTo(0, length);
            ctx.lineTo(0, radius);
        });
    }
}
function drawHand(ctx, pos, length, width) {
    drawLine(ctx, pos, width, function () {
        ctx.lineTo(0, length);
        ctx.lineTo(0, -length);
    });
}
var env = null;
function getEnvironment() {
    var form = document.getElementById("stepsForm");
    var steps = form.elements["steps"].value;
    if (env != null) {
        if (env.steps != steps) {
            env.hasTicks = null;
        }
        env.steps = steps;
        return env;
    }
    var canvas = document.getElementById("canvas");
    if (canvas == null) {
        return;
    }
    var ctx = canvas.getContext("2d");
    if (ctx == null) {
        return;
    }
    var radius = canvas.height / 2;
    env = {
        ctx: ctx,
        radius: radius,
        steps: steps,
        hasTicks: null
    };
    return env;
}
function next() {
    var env = getEnvironment();
    env.ctx.translate(env.radius, env.radius);
    if (env.hasTicks == null || env.hasTicks) {
        drawFace(env.ctx, env.radius * 0.9);
        drawRandomAngle(env.ctx, env.steps, env.radius * 0.9);
        env.hasTicks = false;
    }
    else {
        drawNumbers(env.ctx, env.steps, env.radius * 0.9);
        drawTicks(env.ctx, env.steps, env.radius * 0.9);
        env.hasTicks = true;
    }
    env.ctx.translate(-env.radius, -env.radius);
}
next();
