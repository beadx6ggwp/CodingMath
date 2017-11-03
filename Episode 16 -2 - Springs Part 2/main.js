var ctx,
    width,
    height;
var animation,
    lastTime = 0,
    Timesub = 0,
    DeltaTime = 0,
    loop = true;
var ctx_font = "Consolas",
    ctx_fontsize = 10,
    ctx_backColor = "#777";

var keys = {}, mousePos = { x: 0, y: 0 };

window.onload = function () {
    ctx = CreateDisplay("myCanvas", 800, 600);
    width = ctx.canvas.width;
    height = ctx.canvas.height;


    document.addEventListener("keydown", keydown, false);
    document.addEventListener("keyup", keyup, false);
    document.addEventListener("mousedown", mousedown, false);
    document.addEventListener("mouseup", mouseup, false);
    document.addEventListener("mousemove", mousemove, false);

    main();

}

// ----------------------------------------------------------

var particleA, particleB, particleC;
var k = 0.01;
var separation = 100;

function main() {
    console.log("Start");

    particleA = particle.create(random(0, width), random(0, height),
        random(0, 50), random(0, Math.PI * 2), 0.2);
    particleB = particle.create(random(0, width), random(0, height),
        random(0, 50), random(0, Math.PI * 2), 0.2);
    particleC = particle.create(random(0, width), random(0, height),
        random(0, 50), random(0, Math.PI * 2), 0.2);

    particleA.friction = 0.9;
    particleA.radius = 20;

    particleB.friction = 0.9;
    particleB.radius = 20;

    particleC.friction = 0.9;
    particleC.radius = 20;

    window.requestAnimationFrame(mainLoop);
    //mainLoop();
}

function update(dt) {
    spring(particleA, particleB, separation);
    spring(particleB, particleC, separation);
    spring(particleC, particleA, separation);

    particleA.update();
    particleB.update();
    particleC.update();


    checkEdges(particleA);
    checkEdges(particleB);
    checkEdges(particleC);
}

function draw(ctx) {

    // drawline
    ctx.beginPath();
    ctx.moveTo(particleA.pos.x, particleA.pos.y);
    ctx.lineTo(particleB.pos.x, particleB.pos.y);
    ctx.lineTo(particleC.pos.x, particleC.pos.y);
    ctx.lineTo(particleA.pos.x, particleA.pos.y);
    ctx.stroke();

    ctx.fillStyle = "#FFF";
    drawCircle(particleA.pos.x, particleA.pos.y, particleA.radius, 1);
    drawCircle(particleB.pos.x, particleB.pos.y, particleB.radius, 1);
    drawCircle(particleC.pos.x, particleC.pos.y, particleC.radius, 1);
}

function spring(p0, p1, separation) {
    var distance = p0.pos.subtract(p1.pos);
    distance.setLength(distance.getLength() - separation);

    var springForce = distance.multiply(k);

    p1.vel.addTo(springForce);
    p0.vel.subtractFrom(springForce);
}

function checkEdges(p) {
    if (p.pos.y + p.radius > height) {
        p.pos.y = (height - p.radius);
        p.vel.y = (p.vel.y * -0.95);
    }
}

function mainLoop(timestamp) {
    Timesub = timestamp - lastTime;// get sleep
    DeltaTime = Timesub / 1000;
    lastTime = timestamp;
    //Clear
    ctx.fillStyle = ctx_backColor;
    ctx.fillRect(0, 0, width, height);
    //--------Begin-----------

    update(DeltaTime);
    draw(ctx);

    //--------End---------------
    let str1 = "Fps: " + 1000 / Timesub, str2 = "Timesub: " + Timesub, str3 = "DeltaTime: " + DeltaTime;
    drawString(ctx, str1 + "\n" + str2 + "\n" + str3,
        0, height - 31,
        "#FFF", 10, "consolas",
        0, 0, 0);
    if (loop) {
        animation = window.requestAnimationFrame(mainLoop);
    } else {
        // over
    }
}
//---evnt---
function keydown(e) {
    keys[e.keyCode] = true;
}

function keyup(e) {
    delete keys[e.keyCode];
}

function mousedown(e) {

}

function mouseup(e) {

}

function mousemove(e) {
    mousePos.x = e.clientX - ctx.canvas.offsetLeft;
    mousePos.y = e.clientY - ctx.canvas.offsetTop;
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

//---------------------
function CreateDisplay(id, width, height) {
    let canvas = document.createElement("canvas");
    canvas.id = id;
    canvas.width = width;
    canvas.height = height;
    canvas.style.cssText = [
        "display: block;",
        "margin: 0 auto;",
        "background: #FFF;",
        "border:1px solid #000;"
    ].join("");
    document.body.appendChild(canvas);

    return canvas.getContext("2d");
}