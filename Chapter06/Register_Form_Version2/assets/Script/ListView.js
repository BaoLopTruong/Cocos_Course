const Emitter = require('mEmitter');
const eventCode = require('eventCode');
let user = cc.Class({ username: "" })
let listUsers = [];
cc.Class({
    extends: cc.Component,

    properties: {
        content: cc.Layout,
        items: cc.Prefab,
    },
    onLoad() {
        Emitter.instance = new Emitter();
        Emitter.instance.registerEvent(eventCode.REGISTER, this.onRegister, this);
        Emitter.instance.registerEvent(eventCode.DELETE, this.removeUSer.bind(this));
    },
    onEnable() {
        this.addListUser();
    },
    onRegister(data) {
        listUsers = data;
    },
    addListUser() {
        this.content.node.removeAllChildren();
        for (let index = 0; index < listUsers.length; index++) {
            let item = cc.instantiate(this.items);
            item.parent = this.content.node;
            item.children[1].getComponent('cc.Label').string = listUsers[index].username;
        }
    },
    removeUSer(data) {
        let itemParent = this.content.node.children;
        for (let index = 0; index < listUsers.length; index++) {
            let item = cc.instantiate(this.items);
            let isChecked = item.children[0].getComponent('cc.Toggle').isChecked;
            cc.log(isChecked);
            if (isChecked) {
                itemParent[index].destroy();
                listUsers.splice(index, 1)
            }else{
                return;
            }
        }
    },
    start() {

    },

    update(dt) {

    },

});
