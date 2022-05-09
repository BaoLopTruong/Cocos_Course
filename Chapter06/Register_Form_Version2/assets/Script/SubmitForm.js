const infoUser = cc.Class({
    username: "", email: "", phone: "", password: "", items: "", content: ""
});

var listUsers = [];
const Emitter = require('mEmitter');
const eventCode =require('eventCode');
cc.Class({
    extends: cc.Component,

    properties: {
        ListView: cc.Layout,
        registerForm: cc.Layout,
        userName: cc.EditBox,
        email: cc.EditBox,
        phone: cc.EditBox,
        password: cc.EditBox,
        content: cc.Layout,
        items: cc.Prefab,
        richText: cc.RichText
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.registerForm.node.active = false;
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
        let validRegex = /[0-9]/;
        if (this.edbPhone.string.length == 10 && this.edbPhone.string.match(validRegex)) {
            this.lblCheckPhone.node.color = new cc.Color(0, 255, 0, 0);
            this.lblCheckPhone.string = "Valid phone number!"
            return true;
        } else {
            this.lblCheckPhone.node.color = new cc.Color(255, 0, 0, 0);
            this.lblCheckPhone.string = "Invalid phone number!"
            return false;
        }
    },
    submitForm() {
            let newInfoUser = new infoUser;
            newInfoUser.username = this.userName.string;
            newInfoUser.email = this.email.string;
            newInfoUser.phone = this.phone.string;
            newInfoUser.password = this.password.string;
            newInfoUser.items = this.items;
            newInfoUser.content = this.content;
            listUsers.push(newInfoUser);
            cc.log(listUsers);
            //this.addListUser();
            this.emitterListView();
            this.registerForm.node.active = false;
            this.richText.node.active = true;
    },
    emitterListView(){
        this.ListView.node.active = true;
       // cc.log(eventCode.REGISTER)
        Emitter.instance.emit(eventCode.REGISTER,listUsers);
        this.ListView.node.active = false;
    },


    addListUser() {
        this.content.node.removeAllChildren();
        for (let index = 0; index < listUsers.length; index++) {
            let item = cc.instantiate(this.items);
            item.parent = this.content.node;
            item.children[1].getComponent('cc.Label').string = listUsers[index].username;
        }
    },
    removeUser(){
        for (let index = 0; index < listUsers.length; index++) {
            let item = cc.instantiate(this.items);
        cc.log( item.children[0].getComponent('cc.Toggle').isChecked)
        }
    },
    start() {

    },

    update(dt) {
    },
});
