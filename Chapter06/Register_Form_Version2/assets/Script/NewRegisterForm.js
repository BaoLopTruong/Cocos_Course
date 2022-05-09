
cc.Class({
    extends: cc.Component,

    properties: {
        registerForm: cc.Layout,
        listView: cc.Layout,
        edbUsername: cc.EditBox,
        edbEmail: cc.EditBox,
        edbPhone: cc.EditBox,
        edbPassword: cc.EditBox,
        lblCheckUser: cc.Label,
        lblCheckEMail: cc.Label,
        lblCheckPhone: cc.Label,
        lblCheckPassword: cc.Label,
    },

    newRegisterForm(){
        this.listView.node.active = false;
        this.registerForm.node.active = true;
        this.edbUsername.string ="";
        this.lblCheckUser.string ="";
        this.edbEmail.string ="";
        this.lblCheckEMail.string ="";
        this.edbPhone.string ="";
        this.lblCheckPhone.string ="";
        this.edbPassword.string ="";
        this.lblCheckPassword.string ="";
    },
    start () {

    },

});
