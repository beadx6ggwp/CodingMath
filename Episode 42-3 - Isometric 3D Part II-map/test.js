window.onload = function(){
    var canvas = document.getElementById('myCanvas'),
        ctx = canvas.getContext('2d'),
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight - canvas.offsetTop;
    

    var tileW = 60,
        tileH = 30;
    var map = [ [15,15,15,14,11,10, 1, 0, 0, 0],
                [15,15,14,11,10,10, 1, 0, 0, 0],
                [15,14,11,10,10, 1, 0, 0, 0, 0],
                [14,11,10, 9, 7, 1, 0, 0, 0, 0],
                [11,10, 9, 7, 6, 1, 0, 0, 0, 0],
                [11, 9, 7, 6, 3, 1, 0, 0, 0, 0],
                [10, 7, 6, 5, 3, 1, 1, 1, 1, 1],
                [ 9, 6, 5, 5, 3, 3, 3, 3, 3, 3],
                [ 6, 5, 5, 5, 5, 5, 5, 4, 4, 3],
                [ 6, 5, 5, 5, 5, 5, 5, 5, 4, 3]];

    ctx.translate(width/2,100);

    var playerImg = new Image();
    playerImg.src = "fire.gif";


    var mapImg = new Image();
    mapImg.src = "tile.png";
    //tileH = 30;
    tileW = mapImg.width/16;

    var x = 0,y = 5;
    drawmap();
    drawplayer(x,y);

    document.addEventListener("keydown",function(e){
        if(e.keyCode<37 || e.keyCode>40)return;

        ctx.fillStyle = "#FFF";
        ctx.fillRect(-width/2,-100,width,height);

        drawmap();
        switch(e.keyCode){
            case 37://left
                if(canMove(x-1,y)){
                    x--;
                }
                break;
            case 39://right
                if(canMove(x+1,y)){
                    x++;
                }
                break;
            case 38://up
                if(canMove(x,y-1)){
                    y--;
                }
                break;
            case 40://down
                if(canMove(x,y+1)){
                    y++;
                }
                break;
        }
        drawplayer(x,y);

    },false);

    function canMove(x,y){
        if(y<0 || y >= map.length ||
            x<0 || x >= map[y].length){
            return false;
        }
        if(map[y][x]<4)return false;
        if(map[y][x]>14)return false;
        return true;
    }

    function drawplayer(x,y){
        var tx = (x-y)*tileW/2,
            ty = (x+y)*tileH/2;

        ctx.save();
        ctx.translate(tx,ty);

        ctx.drawImage(playerImg,
                        0,0,playerImg.width,playerImg.height,
                        -tileW/2,0,tileW,tileH);
        ctx.restore();        
    }

	function drawmap() {
        for(var y = 0; y < map.length; y++) {
            for(var x = 0; x < map[y].length; x++) {
                drawImageTile(x, y, map[y][x],mapImg);
			}
		}
    }
    
    function drawImageTile(x,y,index,img){
        var tx = (x-y)*tileW/2,
            ty = (x+y)*tileH/2 + (index < 4?5:0);
        ctx.save();
        ctx.translate(tx,ty);

        ctx.drawImage(img, index*tileW, 0, tileW, img.height,
                    -tileW/2, 0, tileW, img.height);
        ctx.restore();
    }
    
    function RandomRGB(){
        var r = Math.floor(Math.random()*255),
            g = Math.floor(Math.random()*255),
            b = Math.floor(Math.random()*255);
        return "rgb(" +r+ "," +g+ "," +b+ ")";
    }
}