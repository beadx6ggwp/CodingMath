window.onload = function () {
    var canvas = document.getElementById('myCanvas'),
        ctx = canvas.getContext('2d'),
        width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight - canvas.offsetTop;

    var fl = 300;
    var cards = [], num = 200;
    var size = 100;

    ctx.translate(width / 2, height / 2);

    for (var i = 0; i < num; i++) {
        var card = {
            x: random(-width, width),
            y: random(-height, height),
            z: random(0, 10000),
            img: document.createElement("img")
        };
        card.img.src = "image/" + (i % 14) + ".jpg";
        cards.push(card);
    }

    update();

    function update() {
        ctx.fillStyle = "rgb(255,185,219)";
        ctx.fillRect(-width / 2, -height / 2, width, height);

        //the smaller Z priority
        cards.sort(function (a, b) {
            return b.z - a.z;
        });
        for (var i = 0; i < cards.length; i++) {
            var card = cards[i];

            var perspective = fl / (fl + card.z);

            ctx.save();

            ctx.translate(card.x * perspective, card.y * perspective);
            ctx.scale(perspective, perspective);

            ctx.fillStyle = "#000";
            ctx.fillRect(-size / 2, -size / 2, size, size);
            //ctx.drawImage(card.img,0,0);
            ctx.drawImage(card.img, -card.img.width / 2, -card.img.height / 2);
            ctx.restore();

            card.z -= 3;
            if (cards[i].z < 0) {
                card.z = 10000;
                card.x = random(-width, width);
                card.y = random(-height, height);
            }
        }

        requestAnimationFrame(update);
    }
}
function random(max, min) {
    return Math.round(Math.random() * (max - min) + min);
}