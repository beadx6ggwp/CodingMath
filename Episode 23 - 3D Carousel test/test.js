window.onload = function(){
    var canvas = document.getElementById('myCanvas'),
        ctx = canvas.getContext('2d'),
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight - canvas.offsetTop;
    
    var PI = Math.PI;
    var fl = 300;
    var shapes = [],num = 300;
    var size = 100;
    var Rz = 1000;
    var centerZ = 1000;
    var angle = 0;
    var angleSp = 0;

    ctx.translate(width/2,height/2);

    for(var i = 0;i < num;i++){
        var shape = {
            angle:0.2*i,
            r:random(Rz/5,Rz),
            light:0,
            x:0,
            y:0,
            z:0
        };
        shape.x = Math.cos(shape.angle) * shape.r;
        shape.z = 1000 + Math.sin(shape.angle) * shape.r;
        shape.y = 4000/num*i-2000 + random(0,300);
        shape.light = Ratio(shape.y, -2000, 4000, 0, 1.5);
        shapes.push(shape);
    }  

    update();

    function update(){
        ctx.fillStyle = "rgb(0,0,0)";
        ctx.fillRect(-width/2,-height/2,width,height);

        angle+=angleSp;

        //the smaller Z priority        
        shapes.sort(function(a,b){
            return b.z - a.z;
        });

        for(var i = 0;i < shapes.length;i++){
            var shape = shapes[i];

            var perspective = fl / (fl+shape.z);
            
            ctx.save();

            ctx.translate(shape.x*perspective, shape.y*perspective);
            ctx.scale(perspective, perspective);

            ctx.beginPath();
            ctx.fillStyle = "rgba(255,255,255,"+shape.light+")";            
            ctx.arc(0,0,40,0,PI*2);
            ctx.fill();
            ctx.restore();

            shape.x = Math.cos(shape.angle + angle)*shape.r + 0;
            shape.z = Math.sin(shape.angle + angle)*shape.r + centerZ;
            shape.y -= 7;
            shape.light = Ratio(shape.y, -2000, 4000, 0, 1);
            if(shape.y<-2000){
                shape.y = 2000;
                shape.light = 1.5;
            }
        }

        requestAnimationFrame(update);
    }    

    document.addEventListener("mousemove",function(e){
        var mouseX = e.clientX - canvas.offsetLeft;
        var mouseY = e.clientY - canvas.offsetTop;
        angleSp = (mouseX - width/2)*0.00005;
    });

}
function random(max,min){
	return Math.round(Math.random()*(max-min)+min);
}
function Ratio(v, n1, n2, m1, m2){
    if (v < n1 || v > n2) return 0;//V 不在n1~n2中
    var x = 0;
    x = (v * (m2 - m1) - n1 * m2 + n2 * m1) / (n2 - n1);
    return x;
}