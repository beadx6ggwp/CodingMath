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
    ctx = CreateDisplay("myCanvas", 800, 800);
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

var nodes = [], spring = [];
var clothW = 16, clothH = 16;
var len = 15;
var structK = 0.6, structL = len;//結構
var shearK = structK / 2, shearL = structL * Math.sqrt(2);//剪切
var bendK = structK, bendL = structL * 2;

var showStruct = 0;

var dragNode, isDown;

function main() {
    console.log("Start");


    let offset = new Vector(width * 0.25, height * 0.1)
    let size = 80;
    for (let y = 0; y < clothH; y++) {
        for (let x = 0; x < clothW; x++) {
            let n = new ClothNode(x * size + offset.x, y * size + offset.y, 6)
            n.show = 0;
            nodes.push(n);
        }
    }
    // 固定兩點
    nodes[0].pos.x = width * 0.25;
    nodes[0].isFixed = 1;
    nodes[0].show = 1;

    nodes[clothW - 1].pos.x = width * 0.75;
    nodes[clothW - 1].isFixed = 1;
    nodes[clothW - 1].show = 1;

    // struct
    for (let y = 0; y < clothH; y++) {
        for (let x = 0; x < clothW; x++) {
            if (x == clothW - 1) continue;
            let s = new MassSpring(
                nodes[y * clothH + x],
                nodes[y * clothH + x + 1],
                structK, structL);
            spring.push(s);
        }
    }
    for (let y = 0; y < clothH; y++) {
        for (let x = 0; x < clothW; x++) {
            if (y == clothH - 1) continue;
            let s = new MassSpring(
                nodes[y * clothH + x],
                nodes[(y + 1) * clothH + x],
                structK, structL);
            spring.push(s);
        }
    }

    //shear
    for (let y = 0; y < clothH; y++) {
        for (let x = 0; x < clothW; x++) {
            if (x == clothW - 1 || y == clothH - 1) continue;
            let s = new MassSpring(
                nodes[y * clothH + x],
                nodes[(y + 1) * clothH + x + 1],
                shearK, shearL);
            s.show = showStruct;
            spring.push(s);
        }
    }
    for (let y = 0; y < clothH; y++) {
        for (let x = 0; x < clothW; x++) {
            if (x == clothW - 1 || y == 0) continue;
            let s = new MassSpring(
                nodes[y * clothH + x],
                nodes[(y - 1) * clothH + x + 1],
                shearK, shearL);
            s.show = showStruct;
            spring.push(s);
        }
    }

    // bend
    for (let y = 0; y < clothH; y++) {
        for (let x = 0; x < clothW; x++) {
            if (x >= clothW - 2) continue;
            let s = new MassSpring(
                nodes[y * clothH + x],
                nodes[y * clothH + x + 2],
                shearK, shearL);
            s.show = showStruct;
            spring.push(s);
        }
    }

    for (let y = 0; y < clothH; y++) {
        for (let x = 0; x < clothW; x++) {
            if (y >= clothH - 2) continue;
            let s = new MassSpring(
                nodes[y * clothH + x],
                nodes[(y + 2) * clothH + x],
                shearK, shearL);
            s.show = showStruct;
            spring.push(s);
        }
    }


    window.requestAnimationFrame(mainLoop);
    //mainLoop();
}

function update(dt) {
    for (const s of spring) {
        // n.applyForce(new Vector(0,9.8));
        s.flex();
    }


    for (const n of nodes) {
        n.applyForce(new Vector(0, 3));
        n.update(dt);
    }
}

function draw(ctx) {
    for (const s of spring) {
        s.render(ctx);
    }
    for (const n of nodes) {
        n.render(ctx);
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
    isDown = 1;
    for (let n of nodes) {
        if (n.intersects(mousePos)) {
            dragNode = n;
            console.log(dragNode);
            break;
        }
    }
}

function mouseup(e) {
    isDown = 0;
    dragNode = null;

}

function mousemove(e) {
    mousePos.x = e.clientX - ctx.canvas.offsetLeft;
    mousePos.y = e.clientY - ctx.canvas.offsetTop;

    if (isDown && dragNode) {
        dragNode.pos.x = mousePos.x;
        dragNode.pos.y = mousePos.y;
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