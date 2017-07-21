window.onload = function(){
    var canvas = document.getElementById('myCanvas'),
        ctx = canvas.getContext('2d'),
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight - canvas.offsetTop;
    
    var fl = 300;
    var shapes = [],num = 100;
    var size = 100;

    ctx.translate(width/2,height/2);

    for(var i = 0;i < num;i++){
        var card = {
            x:random(-width,width),
            y:random(-height,height),
            z:random(0,10000)
        };
        shapes.push(card);
    }

    console.log(shapes[0]);

   


    update();

    function update(){
        ctx.fillStyle = "#EEE";
        ctx.fillRect(-width/2,-height/2,width,height);

        for(var i = 0;i < shapes.length;i++){
            var perspective = fl / (fl+shapes[i].z);
            
            ctx.save();
            ctx.translate(shapes[i].x*perspective, shapes[i].y*perspective);
            ctx.scale(perspective, perspective);
            ctx.fillStyle = "#000";
            ctx.fillRect(-size/2,-size/2,size,size);
            ctx.restore();

            shapes[i].z-=5;
            if(shapes[i].z<0){
                shapes[i].z = 10000;
                shapes[i].x = random(-width,width);
                shapes[i].y = random(-height,height);
            }
        }

        requestAnimationFrame(update);
    }
}
function random(max,min){
	return Math.round(Math.random()*(max-min)+min);
}