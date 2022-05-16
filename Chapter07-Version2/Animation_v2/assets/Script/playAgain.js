const Emitter = require('mEmitter');
cc.Class({
    extends: cc.Component,

    properties: {
   
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this._playAgain =this.playAgain.bind(this);
        Emitter.instance.registerEvent('play-game', this._playAgain)
    },
    playAgain(){
        cc.game.restart();
    },
    start () {

    },

    // update (dt) {},
});
