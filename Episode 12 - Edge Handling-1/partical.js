var particle = {
	pos: null,
	vel: null,
	radius: 10,
	gravity: null,

	create: function (x, y, speed, direction, grav) {
		var obj = Object.create(this);
		obj.pos = vector.create(x, y);
		obj.vel = vector.create(0, 0);
		obj.gravity = vector.create(0, grav || 0);
		obj.vel.setLength(speed);
		obj.vel.setAngle(direction);
		return obj;
	},

	setPos: function (x, y) {
		this.pos.x = x;
		this.pos.y = y;
	},

	getPos: function () {
		return { x: this.pos.x, y: this.pos.y };
	},

	accel: function (acc) {
		this.vel.addTo(acc);
	},

	update: function () {
		this.vel.addTo(this.gravity);
		this.pos.addTo(this.vel);
	}
};