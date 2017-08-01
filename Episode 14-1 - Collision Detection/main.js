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


    document.addEventListener("mousedown", mousedown, false);
    document.addEventListener("mouseup", mouseup, false);
    document.addEventListener("mousemove", mousemove, false);

    main();
}

var isDown = false;
var dragPoint;
var circles = [];

function main() {
    console.log("Start");

    for (let i = 0; i < 2; i++) {
        let obj = {
            x: randomInt(width / 4, width * 3 / 4),
            y: randomInt(height / 4, height * 3 / 4),
            radius: randomInt(50, 75)
        };
        circles.push(obj);
    }

    mainLoop();
}


function update() {
    if (utils.CircleCollision(circles[0], circles[1])) {
        ctx.fillStyle = "rgba(255,165,165,0.9)";
    }
    else {
        ctx.fillStyle = "rgba(255,255,255,0.9)";
    }
}

function draw() {
    for (let i = 0; i < 2; i++) {
        let obj = circles[i];
        ctx.save();
        if(isDown && obj === dragPoint){
            ctx.shadowColor = "#000";
            ctx.shadowOffsetX = 4;
            ctx.shadowOffsetY = 4;
            ctx.shadowBlur = 8;
        }
        drawCircle(obj.x, obj.y, obj.radius, 1);
        drawString(ctx, i + "",
            obj.x, obj.y,
            "#000", 10, "consolas",
            0, 0, 0);
        ctx.restore();
    }
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

function mousedown(e) {
    let mouse = { x: e.clientX, y: e.clientY };
    dragPoint = findDragPoint(mouse.x, mouse.y);
    if (dragPoint) {
        isDown = true;
        offSet = {
            x: mouse.x - dragPoint.x,
            y: mouse.y - dragPoint.y
        };
        
        let index = circles.indexOf(dragPoint);
        circles.push(circles[index]);
        circles.splice(index, 1);
        // 越後面圖層越上面，所以只要將原位置刪除，並在最後加入，就不會動到其他元素的順序
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
    }
}
function findDragPoint(x, y) {
    for (let i = 0; i < circles.length; i++) {
        if (utils.CirclePointCollision(x, y, circles[i])) {
            return circles[i];
        }
    }
    return null;
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