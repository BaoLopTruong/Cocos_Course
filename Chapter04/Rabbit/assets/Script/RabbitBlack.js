cc.Class({
    extends: cc.Component,

    properties: {
        _distance:100,
        _flag: true,
        _moveBack: false,
        _positionX: 0,

    },
    onLoad: function () {
        this.node.active = false;
    },

    start() {
        cc.log("RabbitBlack: Hello");
        this._positionX = this.node.x;
        this.node.scale = this.node.scale * 3;
        this.moveLimit = this.node.x + this._distance;
    },

    moveTo(dt) {
        this.node.x += dt * 100;
    },

    moveBack(dt) {
        this.node.x -= dt * 100;
    },

    flipRabbit() {
        this.node.scaleX = -(this.node.scaleX);
    },

    update(dt = 1) {

        if (this._moveBack) {
            this.moveBack(dt);
            if (this.node.x < this._positionX) {
                this.node.scaleX = 1.5;
            } else {
                return;
            }
        }
        if (this.node.x > this.moveLimit && this._moveBack == false) {
            this.node.scaleX = - this.node.scaleX;
            this.moveBack(dt);
            this._moveBack = true;
        } else {
            this.moveTo(dt);
        }

    },
});
