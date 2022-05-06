
cc.Class({
    extends: cc.Component,

    properties: {
        content: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        cc.log(content)
    },

    // update (dt) {},
});
