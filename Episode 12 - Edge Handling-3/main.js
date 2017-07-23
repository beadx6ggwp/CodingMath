var cnavas,
    ctx,
    width,
    height;
var animation,
    lastTime = 0,
    Timesub = 0,
    loop = true;
var ctx_font = "Consolas",
    ctx_fontsize = 10,
    ctx_backColor = "#777";

window.onload = function () {
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

    main();
}

var p;

function main() {
    console.log("Start");

    p = particle.create(width / 2, height / 2, 5, random(0, Math.PI * 2), 0.1);
    p.radius = 40;
    p.bounce = -0.9;

    mainLoop();
}

function update() {
    p.update();

    if (p.pos.x + p.radius > width) {
        p.pos.setX(width - p.radius);
        p.vel.setX(p.vel.getX() * p.bounce);
    }
    if (p.pos.x - p.radius < 0) {
        p.pos.setX(p.radius);
        p.vel.setX(p.vel.getX() * p.bounce);
    }

    if (p.pos.y + p.radius > height) {
        p.pos.setY(height - p.radius);
        p.vel.setY(p.vel.getY() * p.bounce);
    }
    if (p.pos.y - p.radius < 0) {
        p.pos.setY(p.radius);
        p.vel.setY(p.vel.getY() * p.bounce);
    }
}

function draw() {
    ctx.fillStyle = "#FFF";
    drawCircle(p.pos.x, p.pos.y, p.radius, 1);
}


function mainLoop(timestamp) {
    Timesub = timestamp - lastTime;// get sleep
    lastTime = timestamp;
    //Clear
    ctx.fillStyle = ctx_backColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    //--------Begin-----------

    update();
    draw();

    //--------End---------------
    let str1 = "Fps:" + 1000 / Timesub, str2 = "Sleep: " + Timesub;
    drawString(ctx, str1 + "\n" + str2,
        0, height - 21,
        "#FFF", 10, "consolas",
        0, 0, 0);
    if (loop) {
        animation = window.requestAnimationFrame(mainLoop);
    } else {
        // over
    }
}


//----tool-------
function drawCircle(x, y, r, side) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.lineWidth = 1;
    if (side) ctx.stroke();
}
function toRadio(angle) {
    return angle * Math.PI / 180;
}
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function random(min, max) {
    return Math.random() * (max - min) + min;
}