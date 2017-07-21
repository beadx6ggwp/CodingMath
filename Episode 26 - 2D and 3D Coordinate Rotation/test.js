window.onload = function(){
    var canvas = document.getElementById('myCanvas'),
        ctx = canvas.getContext('2d'),
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight - canvas.offsetTop;
    var PI = Math.PI;
    var fl = 300,
        points = [],
        centerZ = 1500;
    var key = {};
    var mouseDown = false,
        mx,my;

    ctx.translate(width/2,height/2);

    points[0] = {x:-500, y:-500, z:500};
    points[1] = {x: 500, y:-500, z:500};
    points[2] = {x: 500, y: 500, z:500};
    points[3] = {x:-500, y: 500, z:500};

    points[4] = {x:-500, y:-500, z:-500};
    points[5] = {x: 500, y:-500, z:-500};
    points[6] = {x: 500, y: 500, z:-500};
    points[7] = {x:-500, y: 500, z:-500};

    update();

    document.addEventListener("mousedown",function(e){
        var x = e.clientX - canvas.offsetLeft;
        var y = e.clientY - canvas.offsetTop;
        mx = x;
        my = y;
        mouseDown = true;
    },false);
    document.addEventListener("mouseup",function(e){
        mouseDown = false;
    },false);
    document.addEventListener("mousemove",function(e){
        if(!mouseDown) return;

        var x = e.clientX - canvas.offsetLeft;
        var y = e.clientY - canvas.offsetTop;

        var dx = x - mx;
        var dy = y - my;
        mx = x;
        my = y;
        rotateY(dx*0.005);
        rotateX(dy*0.005);
    },false);

    document.addEventListener("keydown",function(e){
        key[e.keyCode] = true;
    },false);

    document.addEventListener("keyup", function (e) {
        delete key[e.keyCode];
    }, false);

    function update(){
        ctx.fillStyle = "#EEE";
        ctx.fillRect(-width/2,-height/2,width,height);
        //37:left, 38:up, 39:right, 40:down, 16:shift, 17:ctrl
        if(key[38]){
            if(key[16]) translate(0, 0, 20);
            else if(key[17]) rotateX(-0.05);
            else translate(0, -20, 0);
        }
            
        if(key[40]){
            if(key[16]) translate(0, 0, -20);
            else if(key[17]) rotateX(0.05);
            else translate(0, 20, 0);
        }
        if(key[37]){
            if(key[17]) rotateY(0.05);
            else translate(-20,0,0);
        }
        if(key[39]){ 
            if(key[17]) rotateY(-0.05);
            else translate(20,0,0);
        }

        //drawXY();

        project();//display

        ctx.beginPath();
        drawLine(0,1,2,3,0);
        drawLine(4,5,6,7,4);
        drawLine(0,4);
        drawLine(1,5);
        drawLine(2,6);
        drawLine(3,7);
        ctx.strokeStyle = "#000";
        ctx.stroke();


        requestAnimationFrame(update);
    }

    function drawXY(){
        ctx.strokeStyle = "rgba(0,0,0,0.1)";
        ctx.beginPath();
        ctx.moveTo(-width/2,0);
        ctx.lineTo(width,0);
        ctx.closePath();
        ctx.stroke();
    }

    function project(){
        for(var i = 0;i<points.length;i++){
            var p = points[i];//call by value
            var per = fl / (fl + p.z + centerZ);
            
            p.sx = p.x * per;
            p.sy = p.y * per;
        }
        ctx.stroke();
        
    }

    function drawLine(){
        //arguments: get function parameter
        var p = points[arguments[0]];
        ctx.moveTo(p.sx,p.sy);
        for(var i = 1;i<arguments.length;i++){
            p = points[arguments[i]];
            ctx.lineTo(p.sx,p.sy);
        }
    }

    function translate(x,y,z){
        for(var i = 0;i<points.length;i++){
            points[i].x += x;
            points[i].y += y;
            points[i].z += z;
        }
    }

    function rotateX(angle){
        var sin = Math.sin(angle);
        var cos = Math.cos(angle);
        for(var i = 0;i<points.length;i++){
            var p = points[i];
            var y = p.y*cos - p.z*sin;
            var z = p.z*cos + p.y*sin;

            p.y = y;
            p.z = z;
        }
    }
    function rotateY(angle){
        var sin = Math.sin(angle);
        var cos = Math.cos(angle);
        for(var i = 0;i<points.length;i++){
            var p = points[i];
            var x = p.x*cos - p.z*sin;
            var z = p.z*cos + p.x*sin;

            p.x = x;
            p.z = z;
        }
    }
    function rotateZ(angle){
        var sin = Math.sin(angle);
        var cos = Math.cos(angle);
        for(var i = 0;i<points.length;i++){
            var p = points[i];
            var x = p.x*cos - p.y*sin;
            var y = p.y*cos + p.x*sin;

            p.x = x;
            p.y = y;
        }
    }
}