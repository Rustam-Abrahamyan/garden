function Bloom(p, r, c, pc, garden) {
    this.p = p;
    this.r = r;
    this.c = c;
    this.pc = pc;
    this.petals = [];
    this.garden = garden;
    this.init();
    this.garden.addBloom(this);
}

Bloom.prototype = {
    draw: function () {
        let p = null;
        let isFinished = true;

        this.garden.ctx.save();
        this.garden.ctx.translate(this.p.x, this.p.y);

        for (let i = 0; i < this.petals.length; i++) {
            p = this.petals[i];
            p.render();
            isFinished *= p.isFinished;
        }

        this.garden.ctx.restore();

        if (isFinished === true) {
            this.garden.removeBloom(this);
        }
    },
    init: function () {
        let angle = 360 / this.pc;
        let startAngle = Garden.randomInt(0, 90);

        for (let i = 0; i < this.pc; i++) {
            this.petals.push(new Petal(Garden.random(Garden.options.petalStretch.min, Garden.options.petalStretch.max), Garden.random(Garden.options.petalStretch.min, Garden.options.petalStretch.max), startAngle + i * angle, angle, Garden.random(Garden.options.growFactor.min, Garden.options.growFactor.max), this));
        }
    }
};