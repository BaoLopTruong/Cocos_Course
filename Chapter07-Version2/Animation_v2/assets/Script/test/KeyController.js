const Emitter = require('mEmitter');
cc.Class({
    extends: cc.Component,

    properties: {
        _flag:false,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        // add key down and key up event
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },
    onKeyDown: function (event) {
        switch (event.keyCode) {
            case cc.macro.KEY.up:
                if(!this._flag){
                    this._flag=true;
                    console.log('Press Up');
                    Emitter.instance.emit('keyup_down',true);
                }
                break;
            case cc.macro.KEY.down:
                console.log('Press Down');
                break;
            case cc.macro.KEY.left:
                if(!this._flag){
                    this._flag=true;
                    console.log('Press Left');
                    Emitter.instance.emit('keyleft_down',true);
                }
                break;
            case cc.macro.KEY.right:
                if(!this._flag){
                    this._flag = true;
                    console.log('Press Right');
                    Emitter.instance.emit('keyright_down',true);
                }
                break;
            case cc.macro.KEY.space:
                if(!this._flag){
                    this._flag = true;
                    console.log('Press Space');
                    Emitter.instance.emit('keyspace_down',true);
                }
                break;
        }
    },
    onKeyUp: function (event) {
        switch (event.keyCode) {
            case cc.macro.KEY.up:
                this._flag = false;
                console.log('Release Up');
                Emitter.instance.emit('keyup_up',false);
                break;
            case cc.macro.KEY.down:
                console.log('Release Down');
                Emitter.instance.emit('keydown_up',true);
                break;
            case cc.macro.KEY.left:
                this._flag = false;
                console.log('Release Left');
                Emitter.instance.emit('keyleft_up',false);
                break;
            case cc.macro.KEY.right:
                this._flag = false;
                console.log('Release Right');
                Emitter.instance.emit('keyright_up',false);
                break;
            case cc.macro.KEY.space:
                this._flag = false;
                console.log('Release Space');
                Emitter.instance.emit('keyspace_up',false);
                break;
        }
    },
    start() {

    },

    // update (dt) {},
});
