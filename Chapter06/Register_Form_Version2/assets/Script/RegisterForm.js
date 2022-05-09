
cc.Class({
    extends: cc.Component,

    properties: {
        registerForm: cc.Layout,
        listView: cc.Layout,
    },

    register(){
        this.registerForm.node.active = true;
        this.node.active = false;
    },
    newRegisterForm(){
        this.registerForm.node.active = true;
        this.listView.node.active = false;
    },
    start () {
    },

});
