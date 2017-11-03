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

var springPoint,
    springLength = 50,
    weight,
    k = 0.1;
var springPoint2,
    springLength2 = 100,
    weight2,
    k2 = 0.1;

function main() {
    console.log("Start");

    springPoint = vector.create(width / 2, height / 2);
    weight = particle.create(Math.random() * width, Math.random() * height,
        50, Math.random() * Math.PI * 2);
    weight.radius = 20;
    weight.friction = 0.9;

    springPoint2 = vector.create(width / 2, height / 2);
    weight2 = particle.create(Math.random() * width, Math.random() * height,
        50, Math.random() * Math.PI * 2, 0.5);
    weight2.radius = 20;
    weight2.friction = 0.9;

    window.requestAnimationFrame(mainLoop);
    //mainLoop();
}

function update(dt) {

    var distance = springPoint.subtract(weight.pos);
    distance.setLength(distance.getLength() - springLength);
    var springForce = distance.multiply(k);

    weight.vel.addTo(springForce);
    weight.update();


    var distance2 = springPoint2.subtract(weight2.pos);
    distance2.setLength(distance2.getLength() - springLength2);
    var springForce2 = distance2.multiply(k2);

    weight2.vel.addTo(springForce2);
    weight2.update();
}

function draw(ctx) {

    ctx.beginPath();
    ctx.moveTo(weight.pos.x, weight.pos.y);
    ctx.lineTo(springPoint.x, springPoint.y);
    ctx.stroke();

    ctx.fillStyle = "#FFF";
    drawCircle(springPoint.x, springPoint.y, 4, 1);
    drawCircle(weight.pos.x, weight.pos.y, weight.radius, 1);


    ctx.beginPath();
    ctx.moveTo(weight2.pos.x, weight2.pos.y);
    ctx.lineTo(springPoint2.x, springPoint2.y);
    ctx.stroke();

    ctx.fillStyle = "#FFF";
    drawCircle(springPoint2.x, springPoint2.y, 4, 1);
    drawCircle(weight2.pos.x, weight2.pos.y, weight2.radius, 1);
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

    springPoint2.x = mousePos.x;
    springPoint2.y = mousePos.y;
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