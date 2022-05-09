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

    submitForm() {
        if(!this.userName.string || !this.email.string || !this.phone.string || !this.password.string){
            alert("Please fill out the form!");
        }else{
            let newInfoUser = new infoUser;
            newInfoUser.username = this.userName.string;
            newInfoUser.email = this.email.string;
            newInfoUser.phone = this.phone.string;
            newInfoUser.password = this.password.string;
            newInfoUser.items = this.items;
            newInfoUser.content = this.content;
            listUsers.push(newInfoUser);
            this.emitterListView();
            this.registerForm.node.active = false;
            this.richText.node.active = true;
        }
 
    },
    emitterListView(){
        this.ListView.node.active = true;
        Emitter.instance.emit(eventCode.REGISTER,listUsers);
        this.ListView.node.active = false;
    },

    start() {

    },

    update(dt) {
    },
});
