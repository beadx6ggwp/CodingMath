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

function main() {
    console.log("Start");
    ship = particle.create(width / 2, height / 2, 0, 0);

    mainLoop();
}

function update() {
    ship.accel(thrust);
    ship.update();

    if(ship.pos.x < 0) ship.pos.x = width;
    if(ship.pos.x > width) ship.pos.x = 0;
    if(ship.pos.y < 0) ship.pos.y = height;
    if(ship.pos.y > height) ship.pos.y = 0;
}
function draw() {
    ctx.fillStyle = "#FFF";
    drawCircle(ship.pos.x, ship.pos.y, 10, 1);
}

document.addEventListener("keydown", function (e) {
    switch (e.keyCode) {
        case 38://up
            thrust.setPos(0, -0.1);
            break;
        case 40://down
            thrust.setPos(0, 0.1);
            break;
        case 37://left
            thrust.setPos(-0.1, 0);
            break;
        case 39://right
            thrust.setPos(0.1, 0);
            break;
    }
}, false);
document.addEventListener("keyup", function (e) {
    switch (e.keyCode) {
        case 38://up
            thrust.setPos(0, 0);
            break;
        case 40://down
            thrust.setPos(0, 0);
            break;
        case 37://left
            thrust.setPos(0, 0);
            break;
        case 39://right
            thrust.setPos(0, 0);
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