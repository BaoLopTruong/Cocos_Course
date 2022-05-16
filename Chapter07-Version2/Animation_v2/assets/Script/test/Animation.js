const Emitter = require('mEmitter');
cc.Class({
    extends: cc.Component,

    properties: {
        Skeleton: sp.Skeleton,
        Bullet: cc.Prefab,
        _jump: null,
        _slide: null,
        _moveLeft: null,
        _moveRight: null,
        _shoot:null,
        _flag: false,
    },

    // LIFE-CYCLE CALLBACKS:
    onCollisionEnter: function (other, self) {
        cc.log(self);
        cc.log(other);
        this.Skeleton.setAnimation(0,'death',false);
        this.node.stopActionByTag(0);
    },
    onLoad() {
        let manager =cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = true;
        manager.enabledDrawBoundingBox =true;

        this._jump = this.jump.bind(this);
        this._slide = this.slide.bind(this);
        this._moveRight = this.moveRight.bind(this);
        this._moveLeft = this.moveLeft.bind(this);
        this._shoot = this.shoot.bind(this);

        Emitter.instance = new Emitter();
        Emitter.instance.registerEvent("keyup_down", this._jump);

        Emitter.instance.registerEvent("keydown_up", this._slide);

        Emitter.instance.registerEvent("keyright_down", this._moveRight);
        Emitter.instance.registerEvent("keyright_up", this._moveRight);

        Emitter.instance.registerEvent("keyleft_down", this._moveLeft);
        Emitter.instance.registerEvent("keyleft_up", this._moveLeft);

        Emitter.instance.registerEvent("keyspace_down", this._shoot);
        // Emitter.instance.registerEvent("keyspace_up", this._shoot);
    },
    shoot(value){
        cc.log(value);
        let bullet = cc.instantiate(this.Bullet);
        if(!this._flag){
            // this._flag = true;
            bullet.parent = this.node;
            bullet.runAction(cc.sequence(cc.moveBy(0.1,5000,0),cc.callFunc(this.removeBullet,this)));
            this.Skeleton.setAnimation(0,"idle-shoot",false);
            this.Skeleton.addAnimation(0,"idle",true);
        }
    },
    removeBullet(){
        for(let i=0;i<this.node._children.length;i++){
            this.node._children[i].destroy();
        }
    },
    jump(value) {
        cc.log(value);
        if (!this._flag) {
            let jumpUp = cc.moveBy(0.4, cc.v2(0, 200));
            let jumpDown = cc.moveBy(0.4, cc.v2(0, -200));
            let jump = cc.sequence(jumpUp,cc.delayTime(0.1),jumpDown);
            this.node.getComponent(cc.BoxCollider).node.runAction(jump);
            this._flag = true;
            this.Skeleton.setAnimation(0, "jump", false);
            this.Skeleton.addAnimation(0, "idle-turn", false);
            this.Skeleton.addAnimation(0, "idle", true);
            this.Skeleton.setEventListener((entry, event) => {
                if (entry.animationEnd != 0) {
                    this._flag = false;
                }
            });
        }
    },
    slide(value) {
        cc.log(value);
        if (!this._flag) {
            this._flag = true;
            this.Skeleton.setAnimation(0, "hoverboard", true);
            this.Skeleton.setEventListener((entry, event) => {
                if (entry.animationEnd != 0) this._flag = false;
            });
        }
    },
    moveLeft(value) {
        cc.log(value);
        let move = cc.sequence(cc.moveBy(5,-1000,0),cc.moveBy(5,-3000,0));
        if (!this._flag && (value)) {
            this._flag = true;
            this.node.runAction(cc.flipX(true));
            this.node.runAction(move);
            move.setTag(0);
            this.Skeleton.setAnimation(0, "walk", false);
            this.Skeleton.addAnimation(0, "run", true);
        }else if(!this._flag || (!value)){
            this._flag = false;
            this.node.stopActionByTag(0);
            this.Skeleton.setAnimation(0,"run-to-idle",false);
            this.Skeleton.addAnimation(0,"idle",true);
        }
    },
    moveRight(value) {
        cc.log(value);
        let move = cc.sequence(cc.moveBy(5,1000,0),cc.moveBy(5,3000,0));
        if (!this._flag && (value)) {
            this._flag = true;
            this.node.runAction(cc.flipX(false));
            this.node.runAction(move);
            move.setTag(0);
            this.Skeleton.setAnimation(0, "walk", false);
            this.Skeleton.addAnimation(0, "run", true);
        }else if(!this._flag || (!value)){
            this._flag = false;
            this.node.stopActionByTag(0);
            this.Skeleton.setAnimation(0,"run-to-idle",false);
            this.Skeleton.addAnimation(0,"idle",true);
        }
    },
    start() {
        this.Skeleton.addAnimation(0, "portal", false);
        this.Skeleton.addAnimation(0, "idle", true);
        // this.Skeleton.setCompleteListener(this.Skeleton.setToSetupPose());
        // this.Skeleton.setEventListener((entry,event)=>{cc.log(entry)});
        // this.Skeleton.setToSetupPose();
    },

    // update (dt) {},
});
