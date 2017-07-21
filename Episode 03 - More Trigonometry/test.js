window.onload = function(){
    var canvas = document.getElementById('myCanvas'),
        ctx = canvas.getContext('2d'),
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight - canvas.offsetTop;
    
    var centerX = width/2, 
        centerY = height/2,
        speed = 0.1,
        radius = 25,
        angle = 0,
        offSet = height * 0.5,
        bestAlpta = 1/2;
        PI = Math.PI;

    render();

    function render(){
        ctx.fillStyle = "#EEE";
        ctx.fillRect(0,0,width,height);

        // 1
        //maxY = height, minY = 0
        var y = centerY + Math.sin(angle)* offSet;
        ctx.beginPath();
        ctx.fillStyle = "#000";
        ctx.arc(centerX/4, y, 50, 0,PI*2);
        ctx.fill();

        // 2
        //maxR = 2*radius, minR = 0
        var r = radius + Math.sin(angle) * radius;
        ctx.beginPath();
        ctx.fillStyle = "#000";
        ctx.arc(centerX, centerY, r, 0,PI*2);
        ctx.fill();

        // 3
        //max = 1, min = 0
        var alpha =bestAlpta + Math.sin(angle) * bestAlpta;
        ctx.beginPath();
        ctx.fillStyle = "rgba(0,0,0,"+alpha+")";
        ctx.arc(centerX*7/4, centerY, 50, 0,PI*2);
        ctx.fill();

        angle+=speed;
        //angle = (angle+speed)%(2*PI);
        //console.log(angle);

        requestAnimationFrame(render);
    }
}