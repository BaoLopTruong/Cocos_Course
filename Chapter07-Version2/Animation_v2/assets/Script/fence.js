
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:
    onCollisionEnter(otherCollider, seftCollider) {
        cc.log(otherCollider, seftCollider);

       },
    onLoad () {
        let manager =cc.director.getCollisionManager();
        manager.enabled = true;
    },

    start () {

    },

    // update (dt) {},
});
