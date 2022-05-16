cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.node.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.5,0.4,0.35),cc.scaleTo(0.5,0.4,0.4))));
    },
    // update (dt) {},
});
