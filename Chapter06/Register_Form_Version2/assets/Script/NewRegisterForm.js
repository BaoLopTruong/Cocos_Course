
cc.Class({
    extends: cc.Component,

    properties: {
        registerForm: cc.Layout,
        listView: cc.Layout,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    newRegisterForm(){
        this.listView.node.active = false;
        this.registerForm.node.active = true;
    },
    start () {

    },

    // update (dt) {},
});
