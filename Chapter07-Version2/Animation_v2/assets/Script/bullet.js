const Emitter = require('mEmitter');
const eventCode = require('eventCode');
cc.Class({
    extends: cc.Component,

    properties: {
    },

    onCollisionEnter(otherCollider, seftCollider) {
        cc.log(otherCollider, seftCollider);
        if(otherCollider.node.name == "PurpleMonster"){
            this.node.destroy();
            cc.log(otherCollider.node);
            otherCollider.node.runAction(cc.blink(2,100));
            setTimeout(()=>{
                otherCollider.node.active = false;
            },2000)
        }
       },
    onLoad () {
        let manager =cc.director.getCollisionManager();
        manager.enabled = true;
        cc.log(this.node)
        
    },

    start () {

    },

    // update (dt) {},
});
