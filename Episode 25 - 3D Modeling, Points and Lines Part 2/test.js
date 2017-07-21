window.onload = function () {
    var canvas = document.getElementById('myCanvas'),
        ctx = canvas.getContext('2d'),
        width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight - canvas.offsetTop;
    var PI = Math.PI;
    var fl = 300, points = [];
    var key = {};

    ctx.translate(width / 2, height / 2);

    points[0] = { x: -500, y: -500, z: 1000 };
    points[1] = { x: 500, y: -500, z: 1000 };
    points[2] = { x: 500, y: 500, z: 1000 };
    points[3] = { x: -500, y: 500, z: 1000 };

    points[4] = { x: -500, y: -500, z: 500 };
    points[5] = { x: 500, y: -500, z: 500 };
    points[6] = { x: 500, y: 500, z: 500 };
    points[7] = { x: -500, y: 500, z: 500 };

    update();

    document.addEventListener("keydown", function (e) {
        key[e.keyCode] = true;
    }, false);

    document.addEventListener("keyup", function (e) {
        delete key[e.keyCode];
    }, false);

    function update() {
        ctx.fillStyle = "#EEE";
        ctx.fillRect(-width / 2, -height / 2, width, height);
        //37:left, 38:up, 39:right, 40:down, 16:shift 
        if (key[38]) {
            if (key[16]) translate(0, 0, 20);
            else translate(0, -20, 0);
        }

        if (key[40]) {
            if (key[16]) translate(0, 0, -20);
            else translate(0, 20, 0);
        }
        if (key[37]) translate(-20, 0, 0);
        if (key[39]) translate(20, 0, 0);

        project();

        ctx.beginPath();
        drawLine(0, 1, 2, 3, 0);
        drawLine(4, 5, 6, 7, 4);
        drawLine(0, 4);
        drawLine(1, 5);
        drawLine(2, 6);
        drawLine(3, 7);

        requestAnimationFrame(update);
    }

    function project() {
        for (var i = 0; i < points.length; i++) {
            var p = points[i];//call by value
            var per = fl / (fl + p.z);

            p.sx = p.x * per;
            p.sy = p.y * per;
        }
        ctx.stroke();

    }

    function drawLine() {
        //arguments: get function parameter
        var p = points[arguments[0]];
        ctx.moveTo(p.sx, p.sy);
        for (var i = 1; i < arguments.length; i++) {
            p = points[arguments[i]];
            ctx.lineTo(p.sx, p.sy);
        }
    }

    function translate(x, y, z) {
        for (var i = 0; i < points.length; i++) {
            points[i].x += x;
            points[i].y += y;
            points[i].z += z;
        }
    }
}