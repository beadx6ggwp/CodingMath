window.onload = function(){
    var canvas = document.getElementById('myCanvas'),
        ctx = canvas.getContext('2d'),
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight - canvas.offsetTop,
        PI = Math.PI;
    
    ctx.translate(width/2,height/2);
    //-----------------------------------------    
    var angle = 0,Rangle = 0,size = Math.min(width/3,height/3);

    draw();

    function draw(){
        ctx.fillStyle = "#EEE";
        ctx.fillRect(-width/2,-height/2,width,height);
        ctx.fillStyle = "rgba(0,0,0,0.3)";
        ctx.fillRect(-width/2,0,width,1);
        ctx.fillRect(0,-height/2,1,height);

        angle = parseInt(document.getElementById('a').value);
        Rangle = parseInt(document.getElementById('b').value);

        var p1 = new Point(0,0),
        p2 = new Point(size,size);        
        p2.rotate(toRadio(angle));

        var p3 = new Point(p2.x,p2.y);
        p3.rotateTo(toRadio(Rangle));

        //draw Line
        ctx.strokeStyle = "#000";
        drawLine(p1,p2);
        drawLine(p1,p3);

        //draw Point
        ctx.fillStyle = "#000";
        p1.drawPoint();
        p2.drawPoint();
        p3.drawPoint();

        //draw circle
        ctx.beginPath();
        ctx.arc(0,0,30,0,toRadio(angle));
        ctx.strokeStyle = "#F00";
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0,0,50,toRadio(angle),toRadio(angle+Rangle));
        ctx.strokeStyle = "rgb(0,100,255)";
        ctx.stroke();

        //draw Text
        ctx.font="20px consolas";
        ctx.fillStyle = "#F00";
        ctx.fillText(angle,p2.x+10,p2.y+10);
        ctx.fillStyle = "#00F";
        ctx.fillText(Rangle+angle,p3.x+25,p3.y+25);

        requestAnimationFrame(draw);
    }
    btn.onclick = function(){
        document.getElementById('a').value = (document.getElementById('Source').value);
        document.getElementById('b').value = (document.getElementById('Rotate').value);
    }
    a.onchange = function(){
        document.getElementById('Source').value = document.getElementById('a').value;
    }
    b.onchange = function(){
        document.getElementById('Rotate').value = document.getElementById('b').value;
    }

    //---------------------------------------------

    function drawLine(p1, p2){
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.lineWidth = 2;
        ctx.stroke();
    }
    function toRadio(angle){
        return angle* PI/180;
    }
    
    function Point(x,y){
        this.x = x;
        this.y = y;
        
        this.drawPoint = function(){
            ctx.fillRect(this.x-3, this.y-3, 6, 6);
        }
        this.rotate = function(angle){
            this.x*=Math.cos(angle);
            this.y*=Math.sin(angle);
        }
        this.rotateTo = function(angle){
            var rx = this.x*Math.cos(angle) - this.y*Math.sin(angle),
                ry = this.y*Math.cos(angle) + this.x*Math.sin(angle);
            this.x = rx;
            this.y = ry;
        }
    }
}