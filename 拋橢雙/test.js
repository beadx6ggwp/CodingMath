var canvas, ctx,
    width, height,
    PI = Math.PI;

var max = 100, a = 0, n = 0, b = 0;
var center = new Point(0, 0);
var points = [];

window.onload = function () {
    main();
}
function main() {
    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext('2d');
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight - canvas.offsetTop;

    max = 1000;
    console.log(width,height);

    ctx.translate(width / 2, height / 2);
}
function loop() {
    update();
    render();

    //requestAnimationFrame(loop);
}

function update() {
    for (var x = -max; x < max; x += 0.01) {
        var y = a * Math.pow(x, n) + b;
        points.push(new Point(x, -y));
    }
}

function render() {
    ctx.fillStyle = "#EEE";
    ctx.fillRect(-width / 2, -height / 2, width, height);
    ctx.fillStyle = "rgba(0,0,0,0.3)";
    ctx.fillRect(-width / 2, 0, width, 1);
    ctx.fillRect(0, -height / 2, 1, height);
    //----------------------------------------------------------

    ctx.fillStyle = "#000";
    center.drawPoint();

    points.forEach(function (p) {
        p.drawPoint(1);
    });
}
btn.onclick = function () {
    a = parseFloat(document.getElementById('a').value);
    n = parseFloat(document.getElementById('n').value);
    b = parseFloat(document.getElementById('b').value);
    loop();
}

//---------------------------------------------

function drawLine(p1, p2) {
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.lineWidth = 2;
    ctx.stroke();
}
function toRadio(angle) {
    return angle * PI / 180;
}

function Point(x, y) {
    this.x = x;
    this.y = y;

    this.drawPoint = function (size) {
        size = size ? size : 4;
        ctx.fillRect(this.x - size / 2, this.y - size / 2, size, size);
    }
    this.rotate = function (angle) {
        this.x *= Math.cos(angle);
        this.y *= Math.sin(angle);
    }
    this.rotateTo = function (angle) {
        var rx = this.x * Math.cos(angle) - this.y * Math.sin(angle),
            ry = this.y * Math.cos(angle) + this.x * Math.sin(angle);
        this.x = rx;
        this.y = ry;
    }
}