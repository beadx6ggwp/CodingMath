class ClothNode {
    constructor(x, y, r, grav) {
        this.pos = new Vector(x, y);
        this.vel = new Vector();
        this.acc = new Vector();
        this.r = r || 5;

        this.color = "#FFF";
        this.show = 1;

        this.isFixed = 0;
    }
    applyForce(force) {
        this.acc.add(force);
    }
    update(dt) {
        if (this.isFixed) return;

        this.vel.multiplyScalar(0.987);//摩擦力
        this.vel.add(this.acc);
        this.pos.add(this.vel.clone().multiplyScalar(dt));

        // reset acc
        this.acc.x = 0;
        this.acc.y = 0;
        if ((this.pos.x - this.r < 0 && this.vel.x < 0) ||
            (this.pos.x + this.r >= width && this.vel.x > 0)) this.vel.x *= -0.95
        if ((this.pos.y - this.r < 0 && this.vel.y < 0) ||
            (this.pos.y + this.r >= height) && this.vel.y > 0) this.vel.y *= -0.95
    }
    render(ctx) {
        if (!this.show) return;

        ctx.save();
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
    intersects(p) {
        let dx = this.pos.x - p.x;
        let dy = this.pos.y - p.y;
        return Math.sqrt(dx * dx + dy * dy) < this.r;
    }
}

class MassSpring {
    constructor(nodeA, nodeB, k, l) {
        this.nodeA = nodeA;
        this.nodeB = nodeB;
        this.k = k;// 係數
        this.l = l;// 自然長度

        this.fillStyle = "#F77";
        this.show = 1;
    }
    flex() {
        let vAB = this.nodeB.pos.clone().subtract(this.nodeA.pos);// dist a -> b
        let len = vAB.clone().length();
        let dirAB = vAB.clone().normalize();
        let f = dirAB.clone().multiplyScalar(this.k * (len - this.l));

        this.nodeA.applyForce(f);
        this.nodeB.applyForce(f.multiplyScalar(-1));

        // bug
        // let vel_diff = this.nodeB.vel.clone().subtract(this.nodeA.vel);
        // let f_mass = this.k * dirAB.clone().dot(vel_diff);
        // console.log(f_mass);

        // this.nodeA.applyForce(dirAB.clone().multiplyScalar(f_mass));
        // this.nodeB.applyForce(dirAB.clone().multiplyScalar(-f_mass));
    }
    render(ctx) {
        if (!this.show) return;

        ctx.save();
        ctx.fillStyle = this.fillStyle;
        ctx.beginPath();
        ctx.moveTo(this.nodeA.pos.x, this.nodeA.pos.y);
        ctx.lineTo(this.nodeB.pos.x, this.nodeB.pos.y);
        ctx.stroke();
        ctx.restore();
    }
}