const Emitter = require('mEmitter');
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this._resetGame =this.resetGame.bind(this);
        Emitter.instance.registerEvent('reset-game', this._resetGame)
    },

    resetGame(){
        cc.game.restart();
    },
    start () {

    },

    // update (dt) {},
});
