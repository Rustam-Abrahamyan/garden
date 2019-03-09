function Petal(stretchA, stretchB, startAngle, angle, growFactor, bloom) {
    this.stretchA = stretchA;
    this.stretchB = stretchB;
    this.startAngle = startAngle;
    this.angle = angle;
    this.bloom = bloom;
    this.growFactor = growFactor;
    this.r = 1;
    this.isFinished = false;
}

Petal.prototype = {
    draw: function () {
        let ctx = this.bloom.garden.ctx;
        let v1, v2, v3, v4;

        v1 = new Vector(0, this.r).rotate(Garden.degRad(this.startAngle));
        v2 = v1.clone().rotate(Garden.degRad(this.angle));
        v3 = v1.clone().mult(this.stretchA);
        v4 = v2.clone().mult(this.stretchB);

        ctx.strokeStyle = this.bloom.c;
        ctx.beginPath();
        ctx.moveTo(v1.x, v1.y);
        ctx.bezierCurveTo(v3.x, v3.y, v4.x, v4.y, v2.x, v2.y);
        ctx.stroke();
    },
    render: function () {
        if (this.r <= this.bloom.r) {
            this.r += this.growFactor;
            this.draw();
        } else {
            this.isFinished = true;
        }
    }
};