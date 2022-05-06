
cc.Class({
    extends: cc.Component,

    properties: {
        registerLabel: cc.RichText,
        registerForm: cc.Layout,
        listView: cc.Layout,
        edbUsername: cc.EditBox,
        edbEmail: cc.EditBox,
        edbPassword: cc.EditBox,
        edbPhone: cc.EditBox,
        lblCheckUser: cc.Label,
        lblCheckEMail: cc.Label,
        lblCheckPassword: cc.Label,
        lblCheckPhone: cc.Label,
        lblResult: cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    ClickRegister() {
        this.registerForm.node.active = true;
        this.registerLabel.node.active = false;
        this.listView.node.active = false;
        this.edbUsername.string = "";
        this.edbEmail.string = "";
        this.edbPassword.string = "";
        this.edbPhone.string = "";
        this.lblCheckUser.string = "";
        this.lblCheckEMail.string = "";
        this.lblCheckPassword.string = "";
        this.lblCheckPhone.string = "";
        this.lblResult.string = "";

    },
    start() {

    },

    // update (dt) {},
});
