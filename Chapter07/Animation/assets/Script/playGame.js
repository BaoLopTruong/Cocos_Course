const Emitter = require('mEmitter');
const eventCode = require('eventCode');
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
      
    },

    start () {

    },
    onplay(){
        Emitter.instance.emit(eventCode.PLAY, "play game");
    }

    // update (dt) {},
});
