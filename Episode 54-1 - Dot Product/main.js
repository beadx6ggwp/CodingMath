var cnavas,
    ctx,
    width,
    height;
var ctx_font = "Consolas",
    ctx_fontsize = 10,
    ctx_backColor = "#777";

window.onload = function () {
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

    document.addEventListener("mousedown", mousedown, false);
    document.addEventListener("mouseup", mouseup, false);
    document.addEventListener("mousemove", mousemove, false);
    main();
}

var isDown = false;
var dragPoint;
var p_size = 15;

var p0, p1, p2, offSet;

function main() {
    console.log("Start");
    p0 = { x: width / 3, y: height / 3 };
    p1 = { x: p0.x + 200, y: p0.y };
    p2 = { x: p0.x, y: p0.y + 200 };
    draw();
}
function draw() {
    ctx.fillStyle = ctx_backColor = "#777";
    ctx.fillRect(0, 0, width, height);

    drawPoint(p0);
    drawPoint(p1);
    drawPoint(p2);
    drawLine();

    let v1 = vec(p0, p1),
        v2 = vec(p0, p2);
    let str = "Angle: " + angleBetween(v1, v2) * 180 / Math.PI + "";

    let result = dotProduct(normalize(v1), normalize(v2));
    /*
    result相當於cos(theta)
    a dot b = |a||b|cos(theta) = a.x * b.x + a.y * b.y;
    因為normalize正規化，所以a,b長度皆為1，所以得到:
    cos(theta) = a.x * b.x + a.y * b.y;
    本質上跟angleBetween是一樣的
    */
    drawString(ctx, str, 10, 10, "#FFF", 20, "consolas");
    drawString(ctx, result+"", 10, 30, "#FFF", 20, "consolas");
}

function drawPoint(p) {
    ctx.strokeStyle = "orange";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p_size, 0, Math.PI * 2);
    ctx.stroke();
}
function drawLine() {
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#FFF";
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p0.x, p0.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
}

function findDragPoint(x, y) {
    if (isHit(x, y, p0)) return p0;
    if (isHit(x, y, p1)) return p1;
    if (isHit(x, y, p2)) return p2;
    return null;
}
function isHit(x, y, p) {
    let dx = p.x - x,
        dy = p.y - y;
    return dx * dx + dy * dy <= p_size * p_size;
}

function mousedown(e) {
    let mouse = { x: e.clientX, y: e.clientY };
    dragPoint = findDragPoint(mouse.x, mouse.y);
    if (dragPoint) {
        isDown = true;
        offSet = {
            x: mouse.x - dragPoint.x,
            y: mouse.y - dragPoint.y
        };
    }
}
function mouseup(e) {
    isDown = false;
}
function mousemove(e) {
    let mouse = { x: e.clientX, y: e.clientY };
    if (isDown) {
        //update
        dragPoint.x = mouse.x - offSet.x;
        dragPoint.y = mouse.y - offSet.y;
        draw();
    }
}

function angleBetween(v1, v2) {
    let dot = dotProduct(v1, v2);
    let v1_v2_length = mag(v1) * mag(v2);
    return Math.acos(dot / v1_v2_length);
}
function vec(p1, p2) {
    return {
        x: p2.x - p1.x,
        y: p2.y - p1.y
    };
}
function dotProduct(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y;
}
function mag(v1) {
    return Math.sqrt(v1.x * v1.x + v1.y * v1.y);
}
function normalize(v) {
    let m = mag(v);
    return {
        x: v.x / m,
        y: v.y / m
    };
}