const Emitter = require('mEmitter');
const eventCode =require('eventCode');
let listUsers =[];
cc.Class({
    extends: cc.Component,

    properties: {
        items: cc.Prefab,
        content: cc.Layout
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        Emitter.instance = new Emitter();
        Emitter.instance.registerEvent(eventCode.REGISTER, this.onListUser, this);
    },
    onListUser(data){
        listUsers = data;
    },


    start () {

    },

    // update (dt) {},
});
