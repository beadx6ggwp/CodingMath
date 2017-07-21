var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var PI = Math.PI;

window.onload = function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - canvas.offsetTop;

    ctx.translate(0, canvas.height/2);
    ctx.scale(1,-1);//x,y y軸反轉

    for(var angle = 0;angle < PI*2;angle += 0.01){
        var size = 100;
        var x = angle*size, y = Math.sin(angle)*size;
        ctx.fillStyle = "#000";
        ctx.fillRect(x,y,3,3);
    }
}