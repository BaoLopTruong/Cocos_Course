
cc.Class({
    extends: cc.Component,

    properties: {
    },

    onResetGame(){
        Emitter.instance.emit(eventCode.RESETGAME, true);
    },

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
