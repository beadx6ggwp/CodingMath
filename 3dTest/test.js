
var canvas = document.getElementById('myCanvas'),
    ctx = canvas.getContext('2d'),
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight - canvas.offsetTop;

var cube, cube2, cube3;
var objects = [];

main();

function main(){
    cube = new Cube(new Vertex(0, 0, 0), 200);
    cube2 = new Cube(new Vertex(0, 0, 0),150);
    cube3 = new Cube(new Vertex(0, 0, 0),100);
    objects = [cube,cube2,cube3];

    for(var i = 0;i < objects.length;i++){        
        rotateY(objects[i],Math.PI/4);
        rotateX(objects[i],Math.PI/4);
    }

    render(objects, ctx, width/2,height/2);
}

function render(objects, ctx, dx, dy) {    
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fillStyle = 'rgba(0, 150, 255, 0.3)';

    // For each object
    for (var i = 0, n_obj = this.objects.length; i < n_obj; i++) {
        // For each face
        for (var j = 0, n_faces = this.objects[i].faces.length; j < n_faces; j++) {
            // Current face
            var face = this.objects[i].faces[j];

            // Draw the first vertex
            var P = project(face[0]);
            this.ctx.beginPath();
            this.ctx.moveTo(P.x + dx, -P.y + dy);

            // Draw the other vertices
            for (var k = 1, n_vertices = face.length; k < n_vertices; k++) {
                P = project(face[k]);
                this.ctx.lineTo(P.x + dx, -P.y + dy);
            }

            // Close the path and draw the face
            this.ctx.closePath();
            this.ctx.stroke();
            this.ctx.fill();
        }
    }
}

function Vertex(x, y, z){
    this.x = x;
    this.y = y;
    this.z = z;
}

function Vertex2D(x, y) {
    this.x = parseFloat(x);
    this.y = parseFloat(y);
}

function project(M) {
    console.log(M);
    return new Vertex2D(M.x, M.y);
}

function rotateX(c,angle){
    var sin = Math.sin(angle);
    var cos = Math.cos(angle);
    for(var i = 0;i<c.vertices.length;i++){
        var p = c.vertices[i];
        var y = p.y*cos - p.z*sin;
        var z = p.z*cos + p.y*sin;

        p.y = y;
        p.z = z;
    }
}

function rotateY(c,angle){
    var sin = Math.sin(angle);
    var cos = Math.cos(angle);
    for(var i = 0;i < c.vertices.length;i++){
        var p = c.vertices[i];
        var x = p.x*cos - p.z*sin;
        var z = p.z*cos + p.x*sin;

        p.x = x;
        p.z = z;
    }
}


function Cube(center, size) {
    // Generate the vertices
    var d = size / 2;

    this.vertices = [
        new Vertex(center.x - d, center.y - d, center.z + d),
        new Vertex(center.x - d, center.y - d, center.z - d),
        new Vertex(center.x + d, center.y - d, center.z - d),
        new Vertex(center.x + d, center.y - d, center.z + d),
        new Vertex(center.x + d, center.y + d, center.z + d),
        new Vertex(center.x + d, center.y + d, center.z - d),
        new Vertex(center.x - d, center.y + d, center.z - d),
        new Vertex(center.x - d, center.y + d, center.z + d)
    ];

    // Generate the faces
    this.faces = [
        [this.vertices[0], this.vertices[1], this.vertices[2], this.vertices[3]],
        [this.vertices[3], this.vertices[2], this.vertices[5], this.vertices[4]],
        [this.vertices[4], this.vertices[5], this.vertices[6], this.vertices[7]],
        [this.vertices[7], this.vertices[6], this.vertices[1], this.vertices[0]],
        [this.vertices[7], this.vertices[0], this.vertices[3], this.vertices[4]],
        [this.vertices[1], this.vertices[6], this.vertices[5], this.vertices[2]]
    ];
}
