var canvas, ctx,
    width, height;


var sin = Math.sin,
    cos = Math.cos,
    tan = Math.tan,
    cot = Math.cot,
    sec = Math.sec,
    csc = Math.csc,
    ceil = Math.ceil,
    exp = Math.exp,
    floor = Math.floor,
    log = Math.log,
    max = Math.max,
    min = Math.min,
    pow = Math.pow,
    random = Math.random,
    round = Math.round,
    sqrt = Math.sqrt,
    PI = Math.PI;

window.onload = function () {
    main();
}
function main() {
    canvas = document.getElementById('myCanvas');
    canvas.style = "border:1px solid #000000";
    ctx = canvas.getContext('2d');
    width = canvas.width = window.innerWidth - 2;
    height = canvas.height = window.innerHeight - canvas.offsetTop - 2;

    drawBackground();
    console.log("W:" + width, "H:" + height);
    btn.onclick();
}
function render(start, end, step, list) {
    var g = new Graph(start, end, step);
    g.create(list);
    g.render(ctx);
    //console.log(g);

    //requestAnimationFrame(loop);
}

btn.onclick = function () {
    var start = parseFloat(document.getElementById('start').value);
    var end = parseFloat(document.getElementById('end').value);
    var step = parseFloat(document.getElementById('step').value);
    var textarea = document.getElementById('textarea').value.split('\n');
    for(var i = 0;i < textarea.length;i++){
        if(textarea[i] == ""){
            textarea.splice(i,1);
            i--;
        }
    }
    console.log(start, end, step, textarea);
    drawBackground();
    render(start, end, step, textarea);
}

function drawBackground() {
    ctx.save();
    ctx.fillStyle = "#333";
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = "rgba(255,255,255,0.5)";
    drawLine(new Point(0, height / 2), new Point(width, height / 2), 1);
    drawLine(new Point(width / 2, 0), new Point(width / 2, height), 1);

    var center = new Point(width / 2, height / 2);
    ctx.fillStyle = "#FFF";
    center.drawPointR(2);

    ctx.restore();
}

//---------------------------------------------

function toRadio(angle) {
    return angle * PI / 180;
}

function drawLine(p1, p2, w) {
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.lineWidth = w;
    ctx.stroke();
}
function Point(x, y) {
    this.x = x;
    this.y = y;

    this.multiply = function (m) {
        this.x *= m;
        this.y *= m
    }
    this.drawPointR = function (size) {
        size = size ? size : 4;
        ctx.fillRect(this.x - size / 2, this.y - size / 2, size, size);
    }
    this.drawPointC = function (size) {
        size = size ? size : 4;
        ctx.beginPath();
        ctx.arc(this.x - size / 2, this.y - size / 2, size, 0, PI * 2);
        ctx.fill();
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

function Graph(start, end, step) {
    this.start = start;
    this.end = end;
    this.step = step;
    this.graphics = [];
    this.color = ["RGB(255,0,0)", "RGB(255,128,0)", "RGB(255,255,0)", "RGB(128,255,0)",
        "RGB(0,255,0)", "RGB(0,255,128)", "RGB(0,255,255)", "RGB(0,128,255)"];

    this.makeLine = function (code) {
        var points = [];
        for (var x = this.start; x < this.end; x += this.step) {
            points.push(new Point(x, eval(code)));
        }
        return points;
    }
    this.create = function (list) {
        for (var i = 0; i < list.length; i++) {
            var arr = this.makeLine(list[i]);
            this.graphics.push(arr);
        }
    }
    this.render = function (ctx) {
        ctx.save();
        ctx.translate(width / 2, height / 2);
        ctx.scale(1,-1);
        //走遍所有公式
        for (var i = 0, g_list = this.graphics; i < g_list.length; i++) {            
            var scale_X = width / (this.end - this.start);
            var scale_Y = scale_X;
            ctx.strokeStyle = this.color[i % this.color.length];
            //走遍所有函數點
            console.log("-----Graph" + i + "-----");
            for (var j = 0, points = g_list[i]; j < points.length; j++) {
                var p = points[j];
                console.log(p.x.toFixed(3), p.y.toFixed(3));
                p.x *= scale_X;
                p.y *= scale_Y;
                if (j > 0) {
                    drawLine(points[j - 1], p, 2);
                }
            }
        }
        ctx.restore();
    }

    this.getArrY = function(n){
        var arr = [];
        for(var i =0 ;i<this.graphics[n].length;i++){
            arr.push(this.graphics[n][i].y);
        }
        return arr;
    }
    this.getArrX = function(){
        var arr = [];
        for(var i =0 ;i<this.graphics[n].length;i++){
            arr.push(this.graphics[n][i].x);
        }
        return arr;
    }
}