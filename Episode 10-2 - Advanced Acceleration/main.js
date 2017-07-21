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
//-----------------------------------------

window.onload = function () {
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

    main();
}

var ship;
var thrust = vector.create(0, 0);
var angle = 0,
    Rturn = 0,
    Lturn = 0,
    thrusting = 0;

function main() {
    console.log("Start");
    ship = particle.create(width / 2, height / 2, 0, 0);

    mainLoop();
}

function update() {
    if (Rturn) angle += 5;
    if (Lturn) angle -= 5;

    thrust.setAngle(toRadio(angle));

    if (thrusting) thrust.setLength(0.1);
    else thrust.setLength(0);

    ship.accel(thrust);
    ship.update();

    if (ship.pos.x < 0) ship.pos.x = width;
    if (ship.pos.x > width) ship.pos.x = 0;
    if (ship.pos.y < 0) ship.pos.y = height;
    if (ship.pos.y > height) ship.pos.y = 0;
}
function draw() {
    ctx.translate(ship.pos.x, ship.pos.y);
    ctx.rotate(toRadio(angle));
    ctx.strokeStyle = "#FFF";
    ctx.beginPath();
    ctx.moveTo(10, 0);
    ctx.lineTo(-10, -7);
    ctx.lineTo(-10, 7);
    ctx.lineTo(10, 0);
    if (thrusting) {
        ctx.moveTo(-10, 0);
        ctx.lineTo(-18, 0);
    }
    ctx.stroke();
}

document.addEventListener("keydown", function (e) {
    switch (e.keyCode) {
        case 38://up
            thrusting = 1;
            break;
            break;
        case 37://left
            Lturn = 1;
            break;
        case 39://right
            Rturn = 1;
            break;
    }
}, false);
document.addEventListener("keyup", function (e) {
    switch (e.keyCode) {
        case 38://up
            thrusting = 0;
            break;
            break;
        case 37://left
            Lturn = 0;
            break;
        case 39://right
            Rturn = 0;
            break;
    }
}, false);


function mainLoop(timestamp) {
    Timesub = timestamp - lastTime;// get sleep
    lastTime = timestamp;
    //Clear
    ctx.fillStyle = ctx_backColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    //--------Begin-----------

    update();
    draw();

    //--------End---------------
    ctx.restore();
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
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}