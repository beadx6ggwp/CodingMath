window.onload = function(){
    var canvas = document.getElementById('myCanvas'),
        ctx = canvas.getContext('2d'),
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight - canvas.offsetTop;
    

    var tileW = 60,
        tileH = 30;

    var map = [ [1,1,1,1,1,1,1],
                [1,0,0,0,0,0,1],
                [1,0,3,3,3,0,1],
                [1,0,3,0,3,0,1],
                [1,0,3,3,3,0,1],
                [1,0,0,0,0,0,1],
                [1,3,3,4,3,3,1],];

    ctx.translate(width/2,200);

    var img = new Image();
    img.src = "tile.png";
	img.addEventListener("load", function() {
        //tileW = img.width/16;
		//draw();
    });

    draw();

	function draw() {
        for(var x = 0; x < 7; x++) {
			for(var y = 0; y < 7; y++) {
                //drawImageTile(x, y, Math.floor(Math.random()*16));
                drawBlock(x,y,map[y][x]);
			}
		}
    }
    
    function drawImageTile(x,y,index){
        var tx = (x-y)*tileW/2,
            ty = (x+y)*tileH/2 + (index<4?5:0);
        ctx.save();
        ctx.translate(tx,ty);

        ctx.drawImage(img, index*tileW, 0, tileW, img.height,
                    -tileW/2, 0, tileW, img.height);
        console.log(tx,ty);
        ctx.restore();
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