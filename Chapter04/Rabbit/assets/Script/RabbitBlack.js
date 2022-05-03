cc.Class({
    extends: cc.Component,
    editor: {
        executionOrder: 1
    },

    properties: {
        _flag: true,
        _moveBack: false,
        _positionX: 0,
        _active: true

    },
    onLoad: function () {
        this.node.active = false;
    },

    start() {
        cc.log("RabbitBlack: Hello");
        this._positionX = this.node.x;
        this.node.scale = this.node.scale * 1.5;
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
                this.node.scaleX = 0.75;
            } else {
                return;
            }
        }
        if (this.node.x > 100 && this._moveBack == false) {
            this.node.scaleX = - 0.75;
            this.moveBack(dt);
            this._moveBack = true;
        } else {
            this.moveTo(dt);
        }

    },
});
