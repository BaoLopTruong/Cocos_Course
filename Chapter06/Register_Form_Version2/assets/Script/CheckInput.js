
cc.Class({
    extends: cc.Component,

    properties: {
        edbUsername: cc.EditBox,
        edbEmail: cc.EditBox,
        edbPhone: cc.EditBox,
        edbPassword: cc.EditBox,
        lblCheckUser: cc.Label,
        lblCheckEMail: cc.Label,
        lblCheckPhone: cc.Label,
        lblCheckPassword: cc.Label,
    },

    CheckUser() {
        let validRegex = /^[a-zA-Z0-9]{3,6}$/;
        if (this.edbUsername.string.match(validRegex)) {
            this.lblCheckUser.node.color = new cc.Color(0, 255, 0, 0);
            this.lblCheckUser.string = "Valid Username successfully!";
            return true;
        } else {
            this.lblCheckUser.node.color = new cc.Color(255, 0, 0, 0);
            this.lblCheckUser.string = "Username from 3 to 6 characters";
            return false;
        }
    },
    CheckEmail() {
        let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (this.edbEmail.string.match(validRegex)) {
            this.lblCheckEMail.node.color = new cc.Color(0, 255, 0, 0);
            this.lblCheckEMail.string = "Valid email address!";
            return true;
        } else {
            this.lblCheckEMail.node.color = new cc.Color(255, 0, 0, 0);
            this.lblCheckEMail.string = "Invalid email address!";
            return false;
        }
    },
    CheckPassWord() {
        let validRegex = /^[a-zA-Z0-9]{8,16}$/;
        if (this.edbPassword.string.match(validRegex)) {
            this.lblCheckPassword.node.color = new cc.Color(0, 255, 0, 0);
            this.lblCheckPassword.string = "Valid password successfully!";
            return true;
        } else {
            this.lblCheckPassword.node.color = new cc.Color(255, 0, 0, 0);
            this.lblCheckPassword.string = "Password from 8 to 16 characters,";
            return false;
        }
    },
    CheckPhone() {
        let validRegex = /[0-9]{0,10}/;
        if (this.edbPhone.string.length == 10 && this.edbPhone.string.match(validRegex)) {
            this.lblCheckPhone.node.color = new cc.Color(0, 255, 0, 0);
            this.lblCheckPhone.string = "Valid phone number!"
            return true;
        } 
        else if(this.edbPhone.string.length <=10 && !this.edbPhone.string.match(validRegex)){
            this.lblCheckPhone.node.color = new cc.Color(255, 0, 0, 0);
            this.lblCheckPhone.string = "Invalid phone number!"
            return false;
        } 
        else {
            this.lblCheckPhone.node.color = new cc.Color(255, 0, 0, 0);
            this.lblCheckPhone.string = "Invalid phone number!"
            return false;
        }
    },
    start () {

    },

    // update (dt) {},
});
