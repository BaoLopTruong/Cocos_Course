cc.Class({
    extends: cc.Component,
    editor: {
        executionOrder: 1
    },

    properties: {
        _checkJump: 0,
        _count: 0,
        _positionY: 0,
        blackRabbit: {
            default: null,
            type: cc.Component
        }
    },

    onLoad: function () {
        this.node.active = false;
    },

    jumpUpAndDown() {
        if (this.node.y < this._positionY + 50 && this._checkJump < 50) {
            this.node.y += 1;
            this._checkJump += 1;
        }
        if (this._checkJump == 50 && this.node.y != this._positionY) {
            this.node.y -= 1;
            if (this.node.y == this._positionY) {
                this._checkJump = 0;
                this._count++;
            }
        }
    },

    start() {
        cc.log("RabbitGray: Hmmm");
        this.jump = 0;
        this.count = 0;
        this._positionY = this.node.y;
    },

    update: function (dt) {
        if (this._count < 3) {
            this.jumpUpAndDown();
        } else {
            this.blackRabbit.node.active = true;
        }
    },
});
