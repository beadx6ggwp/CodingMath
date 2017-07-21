window.onload = function () {
    var canvas = document.getElementById('myCanvas'),
        ctx = canvas.getContext('2d'),
        width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight - canvas.offsetTop;
    var PI = Math.PI;

    var fl = 300;

    var centerZ = 2000;
    var r = 1000;
    var angleSp = 0.005;

    var ySp = 2, Yrange = 300;

    var size = 100;
    var shapes = [], num = 200;

    for (var i = 0; i < num; i++) {
        var card = {
            x: 0,
            y: 0,
            z: 0,
            angle: 0.2 * i
        };
        card.x = Math.cos(card.angle) * r;
        card.z = Math.sin(card.angle) * r + centerZ;
        card.y = 4000 / num * i - 2000 + random(0, 500);
        console.log((card.angle * 180 / PI) % 360);
        shapes.push(card);
    }

    ctx.translate(width / 2, height / 2);



    update();
    function update() {
        ctx.fillStyle = "#EEE";
        ctx.fillRect(-width / 2, -height / 2, width, height);

        ctx.beginPath();
        for (var i = 0; i < num; i++) {
            var per = fl / (fl + shapes[i].z);

            ctx.save();
            ctx.translate(shapes[i].x * per, shapes[i].y * per);
            ctx.scale(per, per);
            if (i == 0) {
                ctx.moveTo(0, 0);
            } else {
                ctx.lineTo(0, 0);
            }
            ctx.restore();

            shapes[i].angle += angleSp;
            shapes[i].x = Math.cos(shapes[i].angle) * r;
            shapes[i].z = Math.sin(shapes[i].angle) * r + centerZ;
        }
        ctx.stroke();
        requestAnimationFrame(update);
    }
}
function random(max, min) {
    return Math.round(Math.random() * (max - min) + min);
}