
cc.Class({
    extends: cc.Component,

    properties: {
        _accMonster:""
    },

    // LIFE-CYCLE CALLBACKS:

    onCollisionEnter(otherCollider, seftCollider) {
     //cc.log(otherCollider, seftCollider);
     if(otherCollider.tag == 0){
         this.node.stopAction(this._accMonster);
     }
    },
    onLoad () {
        this.moveMonster();
        let manager =cc.director.getCollisionManager();
        manager.enabled = true;
    },
    
    moveMonster() {
        let moveTo = cc.moveBy(0.8, cc.v2(50, 0));
        let moveBack = cc.moveBy(0.8, cc.v2(-50, 0));
        this._accMonster = cc.repeatForever(cc.sequence(moveTo, moveBack))
        this.node.runAction( this._accMonster);
    },
    start () {

    },

    // update (dt) {},
});
