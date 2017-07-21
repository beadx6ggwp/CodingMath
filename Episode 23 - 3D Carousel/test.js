window.onload = function(){
    var canvas = document.getElementById('myCanvas'),
        ctx = canvas.getContext('2d'),
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight - canvas.offsetTop;
    
    var PI = Math.PI;
    var fl = 300;
    var cards = [],num = 10;
    var size = 100;
    var Rz = 1000;
    var centerZ = 1000;
    var angle = 0;
    var angleSp = 0;

    ctx.translate(width/2,height/2);

    for(var i = 0;i < num;i++){
        var card = {
            x:0,
            y:0,
            z:0,
            angle:PI*2/num *i,
            img:document.createElement("img")
        };
        card.img.src = "image/"+(i%14) +".jpg";
        card.x = Math.cos(card.angle) * Rz;
        card.z = 1000 + Math.sin(card.angle) * Rz;
        cards.push(card);
    }  

    update();

    function update(){
        ctx.fillStyle = "rgb(255,185,219)";
        ctx.fillRect(-width/2,-height/2,width,height);

        angle+=angleSp;

        //the smaller Z priority
        cards.sort(function(a,b){
            return b.z - a.z;
        });
        for(var i = 0;i < cards.length;i++){
            var card = cards[i];

            var perspective = fl / (fl+card.z);
            
            ctx.save();

            ctx.translate(card.x*perspective, card.y*perspective);
            ctx.scale(perspective, perspective);

            ctx.fillStyle = "#000";
            ctx.fillRect(-size/2,-size/2,size,size);
            //ctx.drawImage(card.img,0,0);
            ctx.drawImage(card.img, -card.img.width/2, -card.img.height/2);
            ctx.restore();

            card.x = Math.cos(card.angle + angle)*Rz + 0;
            card.z = Math.sin(card.angle + angle)*Rz + centerZ;
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