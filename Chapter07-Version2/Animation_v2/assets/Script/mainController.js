const Emitter = require('mEmitter');
const eventCode = require('eventCode');
cc.Class({
    extends: cc.Component,

    properties: {
        spineBoy: sp.Skeleton,
        ground: cc.Node,
        fence: cc.Node,
        gate: cc.Node,
        monster: cc.Node,
        _isRight: false,
        _isLeft: true,
        _isJump: true,
        __flag: false,

    },

    // use this for initialization
    onLoad() {
        Emitter.instance = new Emitter();
        this.playGame();
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },
    playGame() {
        this.spineBoy.node.active = true;
        this.fence.active = true;
        this.monster.active = true;
        this.gate.active = true;
    },

    onKeyUp(event) {

        switch (event.keyCode) {
            case cc.macro.KEY.space:
                {
                    Emitter.instance.emit("shoot", this._flag);
                    break;
                }
            case cc.macro.KEY.left:
                {
                    Emitter.instance.emit("dontMove", 'left');
                    break;
                }
            case cc.macro.KEY.up:
                {
                    Emitter.instance.emit("dontJump", this._flag);
                    break;
                }
            case cc.macro.KEY.right:
                {
                    Emitter.instance.emit("dontMove", 'right');
                    break;
                }
            default:
                break;
        }

    },

    onKeyDown(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.left:
                {
                    if (this.spineBoy.node.x <= -818.802) {
                        break;
                    }
                    this._flag = false;
                    Emitter.instance.emit("move", 'left');
                    cc.log(event.keyCode);
                    break;
                }
            case cc.macro.KEY.up:
                {
                    this._flag = false;
                    Emitter.instance.emit("jump", this._flag);
                    break;
                }
            case cc.macro.KEY.right:
                {
                    if (this.spineBoy.node.x >= 936.73) {
                        break;
                    }
                    this._flag = false;
                    Emitter.instance.emit("move", 'right');
                    break;
                }
            case cc.macro.KEY.space:
                {
                    Emitter.instance.emit("shoot", this._flag);
                    break;
                }
            default:
                break;
        }
    },
    update: function (dt) {

    },
    onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }
});
