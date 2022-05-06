
cc.Class({
    extends: cc.Component,

    properties: {
        item: cc.Prefab,
    
    },

    start () {
        cc.log(this.item.data)
    },


});
