const Emitter = require('mEmitter');
const eventCode = require('eventCode');

cc.Class({
    extends: cc.Component,
    properties: {
        avatar: sp.Skeleton,
        bullet: cc.Prefab,
        _flag: true,
        jumpAudio: {
            default: null,
            type: cc.AudioClip
        },
        _action: "",
    },
    onCollisionEnter(otherCollider, seftCollider) {
        if (otherCollider.tag == 1) {
            Emitter.instance.emit(eventCode.DEATH, true);
        }
        if (otherCollider.tag == 2) {
            Emitter.instance.emit(eventCode.DEATH, true);
        }
    },
    onLoad() {
        this._runBack = this.runBack.bind(this);
        this._runTo = this.runTo.bind(this);
        this._jumpTo = this.jumpTo.bind(this);
        this._jumpBack = this.jumpBack.bind(this);
        this._shoot = this.shoot.bind(this);
        this._gameover = this.gameover.bind(this);
        Emitter.instance.registerEvent(eventCode.RUNBACK, this._runBack);
        Emitter.instance.registerEvent(eventCode.RUN, this._runTo);
        Emitter.instance.registerEvent(eventCode.JUMP, this._jumpTo);
        Emitter.instance.registerEvent(eventCode.JUMPBACK, this._jumpBack);
        Emitter.instance.registerEvent(eventCode.SHOOT, this._shoot);
        Emitter.instance.registerEvent(eventCode.GAMEOVER, this._gameover);
        //collider
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;

    },

    playJumpSound: function () {
        cc.audioEngine.playEffect(this.jumpAudio, false);
    },
    goStraight() {
        this.avatar.setAnimation(0, "walk", false);
        let action = cc.spawn(
            cc.flipX(),
            cc.moveTo(0.9, cc.v2(this.avatar.node.x + 50, this.avatar.node.y))
        );
        this._action = this.avatar.node.runAction(action);
        this.resetPose();
    },
    goBack() {
        this.avatar.setAnimation(0, "walk", false);
        let action = cc.spawn(
            cc.flipX(-1),
            cc.moveTo(0.9, cc.v2(this.avatar.node.x - 50, this.avatar.node.y))
        );
        this._action = this.avatar.node.runAction(action);
        this.resetPose();
    },
    runTo(data) {
        if (data) {
            this.avatar.clearTracks();
            this.avatar.setAnimation(0, "run", false);
            let action = cc.spawn(
                cc.flipX(),
                cc.moveBy(0.9, 100, 0)
            );
            this._action = this.avatar.node.runAction(action);
            this.resetPose();
        } else {
            this.goStraight();
        }
    },
    runBack(data) {
        if (data) {
            this.avatar.setAnimation(0, "run", false);
            let action = cc.spawn(
                cc.flipX(-1),
                cc.moveBy(0.9, cc.v2(-100, 0))
            );
            this._action = this.avatar.node.runAction(action);
            this.resetPose();
        } else {
            this.goBack();
        }
    },
    jumpTo(data) {
        if (data) {
            this.avatar.setAnimation(0, "jump", false);
            let callback = cc.callFunc(this.playJumpSound, this);
            let move = cc.moveBy(0.8, 100, 0);
            let jumpUp = cc.moveBy(0.4, cc.v2(0, 50)).easing(cc.easeCubicActionOut());
            let jumpDown = cc.moveBy(0.4, cc.v2(0, -50)).easing(cc.easeCubicActionIn());
            let action = cc.spawn(cc.flipX(),
                move,
                cc.sequence(jumpUp, jumpDown),
                callback
            );
            this._action = this.avatar.node.runAction(action);
            this.resetPose();
        }
    },
    jumpBack(data) {
        if (data) {
            this.avatar.setAnimation(0, "jump", false);
            let callback = cc.callFunc(this.playJumpSound, this);
            let move = cc.moveBy(0.8, -100, 0);
            let jumpUp = cc.moveBy(0.4, cc.v2(0, 50)).easing(cc.easeCubicActionOut());
            let jumpDown = cc.moveBy(0.4, cc.v2(0, -50)).easing(cc.easeCubicActionIn());
            let action = cc.spawn(cc.flipX(-1),
                move,
                cc.sequence(jumpUp, jumpDown),
                callback);
            this._action = this.avatar.node.runAction(action);
            this.resetPose();
        }
    },
    shoot(data) {
        if (data) {
            this.avatar.setAnimation(0, 'aim', false);
            this.avatar.setAnimation(1, 'shoot', false);
            this.createBullet();
            this.resetPose();
        }
    },
    resetPose() {
        this.avatar.setCompleteListener(() => {
            this.avatar.clearTracks();
            this.avatar.setToSetupPose();
            this.avatar.setAnimation(0, "idle", true);
        });
    },
    gameover() {
        // this.avatar.node.stopAction(this._action);
    },
    createBullet() {
        let newBullet = cc.instantiate(this.bullet);
        if (this.avatar.node.scaleX > 0) {
            newBullet.parent = this.node.parent;
            newBullet.x = this.avatar.node.x + 80;
            newBullet.y = this.avatar.node.y + 50;
            let action = cc.moveBy(0.2, cc.v2(2000, 0));
            let destruction = cc.callFunc(() => {
                newBullet.destroy();
            }, this);
            let sequence = cc.sequence(action, destruction);
            newBullet.runAction(sequence);
        } else {
            newBullet.parent = this.node.parent;
            newBullet.x = this.avatar.node.x - 180;
            newBullet.y = this.avatar.node.y + 50;
            let action = cc.spawn(cc.flipX(), cc.moveBy(0.2, cc.v2(-2000, 0)));
            let destruction = cc.callFunc(() => {
                newBullet.destroy();
            }, this);
            let sequence = cc.sequence(action, destruction);
            newBullet.runAction(sequence);
        }

    }

});
