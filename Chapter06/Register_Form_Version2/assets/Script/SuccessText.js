
cc.Class({
    extends: cc.Component,

    properties: {
        listView: cc.Layout,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    },

    start () {

    },

    update (dt) {
        setTimeout(()=>{
            this.node.active = false;
            this.listView.node.active = true;
        },1500)
    },
});
