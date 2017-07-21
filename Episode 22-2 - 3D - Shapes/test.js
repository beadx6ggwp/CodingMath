window.onload = function(){
    var canvas = document.getElementById('myCanvas'),
        ctx = canvas.getContext('2d'),
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight - canvas.offsetTop;
    
    var fl = 300;
    var size = 100;
    var shape = {
        x:100,
        y:-100,
        z:300
    };

    ctx.translate(width/2,height/2);
    

    update();
    function update(){
        ctx.fillStyle = "#EEE";
        ctx.fillRect(-width/2,-height/2,width,height);

        var per = fl / (fl+shape.z);
        
        ctx.save();
        ctx.translate(shape.x*per,shape.y*per);
        ctx.scale(per,per);
        ctx.fillStyle = "#000";
        ctx.fillRect(-size/2,-size/2,size,size);
        ctx.restore();

        console.log("X:"+Math.round(shape.x*per),
                    "Y:"+Math.round(shape.y*per),
                    "Z:"+shape.z);
        console.log("Size:"+Math.round(size*per));

        shape.z-=5;
        if(shape.z<0){
            shape.z = 1000;
        }
        requestAnimationFrame(update);
    }
}
function random(max,min){
	return Math.round(Math.random()*(max-min)+min);
}