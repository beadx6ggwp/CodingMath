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

var sun,
    sunR = 20,
    sunMass = 5000,
    planet,
    planetR = 10,
    planetAcc = 5,
    dist = 200,
    press = 0,
    offx = 0,
    offy = 0;

function main() {
    console.log("Start");
    sun = particle.create(width / 2, height / 2, 0, 0);
    sun.mass = sunMass;
    planet = particle.create(width / 2 + dist, height / 2, planetAcc, toRadio(-90));

    mainLoop();
}

function update() {
    planet.gravitateTo(sun);
    planet.update();

    let d = sun.distTo(planet) - 1000;
    if (d > width || dist > height) {
        planet = particle.create(sun.pos.x + dist, sun.pos.y, planetAcc, toRadio(-90));
    }
}
function draw() {
    ctx.fillStyle = "#FF0";
    drawCircle(sun.pos.x, sun.pos.y, sunR, 1);

    ctx.fillStyle = "#0FF";
    drawCircle(planet.pos.x, planet.pos.y, planetR, 1);
}

document.addEventListener("mousedown", function (e) {
    let mx = e.clientX - canvas.offsetLeft,
        my = e.clientY - canvas.offsetTop;
    let dx = sun.pos.x - mx,
        dy = sun.pos.y - my;
    offx = mx - sun.pos.x;
    offy = my - sun.pos.y;
    if (dx * dx + dy * dy < sunR * sunR) {
        press = 1;
    }
}, false);
document.addEventListener("mouseup", function (e) {
    press = 0;
}, false);
document.addEventListener("mousemove", function (e) {
    let mx = e.clientX,
        my = e.clientY;
    if (press) {
        sun.setPos(mx - offx, my - offy);
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