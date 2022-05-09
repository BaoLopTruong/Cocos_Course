const Emitter = require('mEmitter');
const eventCode =require('eventCode');
cc.Class({
    extends: cc.Component,

    properties: {
        items: cc.Prefab,
    },
    onLoad() {
        Emitter.instance = new Emitter();
        Emitter.instance.registerEvent(eventCode.REGISTER, this.addListUser);
        this.check();
    },
    emitFunction(){
        Emitter.instance = new Emitter();
        Emitter.instance.registerEvent(eventCode.REGISTER, this.addListUser);
    },
    onRegister(data){
        for(let index =0; index<data.length;index++){
            cc.log(data[index].username)
        }
       
    },
    check(){
        cc.log(this.node);
        cc.log(this.items)
    },
    addListUser(data) {
       cc.log(data)
       // this.content.node.removeAllChildren();
        // for (let index = 0; index < listUsers.length; index++) {
        //     let item = cc.instantiate(this.items);
        //     item.parent = this.content.node;
        //     item.children[1].getComponent('cc.Label').string = listUsers[index].username;
        // }
    },
    start () {

    },

    update (dt) {
        // this.node.on('mousedown', this.emitFunction ,this);
    },

});
