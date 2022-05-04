cc.Class({
    extends: cc.Component,
    editor: {
        executionOrder: -1
    },

    properties: {
        _distance:100,
        grayRabbit: {
            default: null,
            type: cc.Component
        }
    },

    onLoad() {
        this.node.active = false;
    },

    start() {
        cc.log("RabbitBrown: Hello, Im Brownie");
        this.moveLimit = this.node.x + this._distance;
    },

    update(dt = 1) {
        if (this.node.x <=  this.moveLimit) {
            this.node.x += (dt * 20);
            this.node.angle += (-dt * 500);
        } else {
            this.node.angle = 0;
            this.grayRabbit.node.active = true;
        }
    },
});
