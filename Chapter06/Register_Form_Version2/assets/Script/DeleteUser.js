const Emitter = require('mEmitter');
const eventCode = require('eventCode');
let listUsers = [];
cc.Class({
    extends: cc.Component,

    properties: {
        items: cc.Prefab,
        content: cc.Layout
    },

    onLoad() {
        
    },
    onListUser(data) {
        listUsers = data;
    },
    removeUSer() {
        Emitter.instance.emit(eventCode.DELETE, this.onListUser);
    },
    start() {

    },
});
