window.onload = function(){
    var canvas = document.getElementById('myCanvas'),
        ctx = canvas.getContext('2d'),
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight - canvas.offsetTop;
    
    var centerX = width/2,
        centerY = height/2,
        PI = Math.PI,
        size = 8,
        radiusX = 300,
        radiusY = 300,
        angleX = 0,
        angleY = 0,
        speedX = 0.03,
        speedY = 0.03*0.9,
        x,y,c = false;

        //0.03,0.03*0.9

    render();
    console.log(new Date().getTime());
    function render(){
        //ctx.fillStyle = "#EEE";
        //ctx.fillRect(0,0,width,height);

        //x = centerX + Math.cos(angleX)*radiusX;
        //y = centerY + Math.sin(angleY)*radiusY;
        var x = centerX + Math.cos( angleX ) * radiusX;
        var y = centerY + Math.sin( angleY ) * radiusY;
        console.log("cos:"+Math.floor(angleX*180 / PI % 360),
                    "sin:"+Math.floor(angleY*180 / PI % 360));

        ctx.fillStyle = "#000";
        ctx.beginPath();
        ctx.arc(centerX,centerY,1,0,2*PI);
        ctx.fill();

        c=!c;
        ctx.fillStyle = c ? "#F00":"#FF0";
        ctx.beginPath();
        ctx.arc(x, y, size, 0, 2*PI);
        ctx.fill();
        
        angleX += speedX;
        angleY += speedY;

        requestAnimationFrame(render);
    }
}