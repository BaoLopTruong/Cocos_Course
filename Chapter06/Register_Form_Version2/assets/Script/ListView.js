const Emitter = require('mEmitter');
const eventCode =require('eventCode');
let user = cc.Class({username:""})
let listUsers =[];
cc.Class({
    extends: cc.Component,

    properties: {
        content: cc.Layout,
        items: cc.Prefab,
    },
    onLoad() {
        Emitter.instance = new Emitter();
        Emitter.instance.registerEvent(eventCode.REGISTER, this.onRegister, this);
      
    },
    // onEnable(){
      
        
    // },
    onRegister(data){
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
    start () {
        
    },

    update (dt) {
        this.addListUser();
    },

});
