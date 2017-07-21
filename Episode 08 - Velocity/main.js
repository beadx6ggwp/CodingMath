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
var particles = [];
var num = 10;

window.onload = function () {
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

    main();
}

function main() {
    console.log("Start");
    for (var i = 0; i < num; i++) {
        particles.push(particle.create(width / 2, height / 2, random(1, 5), toRadio(random(0,360)) ));
    }

    mainLoop();
}

function update() {
    for (var i = 0; i < num; i++) {
        particles[i].update();
    }

}
function draw() {
    ctx.fillStyle = "#FFF";
    for (var i = 0; i < num; i++) {
        drawCircle(particles[i].pos.x, particles[i].pos.y, 10, 1);
    }
}

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
function toRadio(angle) {
    return angle * Math.PI / 180;
}
function drawCircle(x, y, r, side) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.lineWidth = 1;
    if (side) ctx.stroke();
}
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}