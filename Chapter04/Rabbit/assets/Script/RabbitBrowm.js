cc.Class({
    extends: cc.Component,
    editor: {
        executionOrder: -1
    },

    properties: {
        grayRabit: {
            default: null,
            type: cc.Component
        }
    },

    onLoad() {
        this.node.active = false;
    },

    start() {
        cc.log("RabbitBrown: Hello, Im Brownie");
    },

    update(dt = 1) {
        if (this.node.x <= 100) {
            this.node.x += (dt * 100);
            this.node.angle += (-dt * 200);
        } else {
            this.node.angle = 0;
            this.grayRabit.node.active = true;
        }
    },
});
