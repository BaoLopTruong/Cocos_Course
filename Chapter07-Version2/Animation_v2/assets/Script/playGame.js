const Emitter = require('mEmitter');
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // this._onPlay =this.onPlay.bind(this);
        // Emitter.instance.registerEvent('play-game', this._onPlay)
    },

    onPlay(){
        Emitter.instance.emit('play-game', true)
    },
    start () {

    },

    // update (dt) {},
});
