var utils = {
    distance: function (p1, p2) {
        var dx = p2.x - p1.x,
            dy = p2.y - p1.y;
        return Math.sqrt(dx * dx + dy * dy);
    },

    distanceXY: function (x1, y1, x2, y2) {
        let dx = x1 - x2,
            dy = y1 - y2;
        return Math.sqrt(dx * dx + dy * dy);
    },

    CircleCollision: function (c1, c2) {
        return utils.distance(c1, c2) <= c1.radius + c2.radius;
    },

    CirclePointCollision: function (x, y, circle) {
        return utils.distanceXY(x, y, circle.x, circle.y) <= circle.radius;
    }
};