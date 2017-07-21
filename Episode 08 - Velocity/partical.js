var particle = {
	pos: null,
	vel: null,

	create: function (x, y, speed, direction) {
		var obj = Object.create(this);
		obj.pos = vector.create(x, y);
		obj.vel = vector.create(0, 0);
		obj.vel.setLength(speed);
		obj.vel.setAngle(direction);
		return obj;
	},

	update: function () {
		this.pos.addTo(this.vel);
	}
};