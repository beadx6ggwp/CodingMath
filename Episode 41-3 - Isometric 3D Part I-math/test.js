window.onload = function(){
    var canvas = document.getElementById('myCanvas'),
        ctx = canvas.getContext('2d'),
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight - canvas.offsetTop;
    
    var W = 100,
        H = 100;

    var tileW = 15,
        tileH = tileW/2;

    ctx.translate(width/2,0.9*H);

    for(var i = 0;i<W;i++){
        for(var j = 0;j<H;j++){
            var x = i - W/2,
                y = j - H/2,
                z = 10*(25 * Math.sin(Math.sqrt(x*x+y*y))) / Math.sqrt(x*x+y*y);
            //(25 * Math.sin(Math.sqrt(x*x+y*y))) / Math.sqrt(x*x+y*y)
            drawBlock(i,j,z);
        }
    }
    
    function RandomRGB(){
        var r = Math.floor(Math.random()*255),
            g = Math.floor(Math.random()*255),
            b = Math.floor(Math.random()*255);
        return "rgb(" +r+ "," +g+ "," +b+ ")";
    }

    function drawTile(x,y,color){
        //var tx = x*tileW/2 - y*tileW/2,ty = y*tileH/2 + x*tileH/2;
        var tx = (x-y)*tileW/2,ty = (x+y)*tileH/2;
        ctx.save();
        ctx.translate(tx,ty);

        ctx.beginPath();
        ctx.moveTo(0,0);//p1
        ctx.lineTo(tileW/2,tileH/2);//p2
        ctx.lineTo(0,tileH);//p3
        ctx.lineTo(-tileW/2,tileH/2);//p4

        ctx.fillStyle = color;
        ctx.fill();

        ctx.restore();
    }

    function drawBlock(x,y,z){
        var top = "#EEE",
            right = "#CCC",
            left = "#999";
        var tx = (x-y)*tileW/2,ty = (x+y)*tileH/2;
        var h = z*tileH;

        ctx.save();
        ctx.translate(tx,ty);
        //Top
        ctx.beginPath();
        ctx.moveTo(0, -h);//p1
        ctx.lineTo(tileW/2, tileH/2 - h);//p2
        ctx.lineTo(0, tileH - h);//p3
        ctx.lineTo(-tileW/2, tileH/2 - h);//p4

        ctx.fillStyle = top;
        ctx.fill();

        //Left
        ctx.beginPath();
        ctx.moveTo(-tileW/2, tileH/2 - h);//p1
        ctx.lineTo(0, tileH - h);//p2
        ctx.lineTo(0,tileH);//p3
        ctx.lineTo(-tileW/2,tileH/2);//p4

        ctx.fillStyle = left;
        ctx.fill();

        //Right
        ctx.beginPath();
        ctx.moveTo(0,tileH - h);//p1
        ctx.lineTo(tileW/2, tileH/2 - h);//p2
        ctx.lineTo(tileW/2, tileH/2);//p3
        ctx.lineTo(0, tileH);//p4

        ctx.fillStyle = right;
        ctx.fill();


        ctx.restore();
    }
}