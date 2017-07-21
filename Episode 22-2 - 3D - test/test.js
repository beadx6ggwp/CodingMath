window.onload = function () {
    var canvas = document.getElementById('myCanvas'),
        ctx = canvas.getContext('2d'),
        width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight - canvas.offsetTop;
    var PI = Math.PI;

    var fl = 300;

    var centerZ = 1000;
    var r = 1000;
    var angleSp = 0.005;

    var ySp = 2, Yrange = 300;

    var size = 100;
    var shapes = [], num = 10;

    for (var i = 0; i < num; i++) {
        var card = {
            x: 0,
            y: 0,
            z: 0,
            angle: PI * 2 / num * i
        };
        card.x = Math.cos(card.angle) * r;
        card.z = Math.sin(card.angle) * r + centerZ;
        shapes.push(card);
    }

    ctx.translate(width / 2, height / 2);



    update();
    function update() {
        ctx.fillStyle = "#EEE";
        ctx.fillRect(-width / 2, -height / 2, width, height);

        for (var i = 0; i < num; i++) {
            var per = fl / (fl + shapes[i].z);

            ctx.save();
            ctx.translate(shapes[i].x * per, shapes[i].y * per);
            ctx.scale(per, per);
            ctx.fillStyle = "#000";
            ctx.fillRect(-size / 2, -size / 2, size, size);
            ctx.restore();

            shapes[i].angle += angleSp;
            shapes[i].x = Math.cos(shapes[i].angle) * r;
            shapes[i].z = Math.sin(shapes[i].angle) * r + centerZ;
            shapes[i].y += ySp;
            if (shapes[i].y > Yrange || shapes[i].y < -Yrange) {
                ySp *= -1;
            }
        }
        console.log(shapes[0].y);
        requestAnimationFrame(update);
    }
}
function random(max, min) {
    return Math.round(Math.random() * (max - min) + min);
}