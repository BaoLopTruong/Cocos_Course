const Emitter = require('mEmitter');
const eventCode = require('eventCode');
const { runInThisContext } = require('vm');
cc.Class({
    extends: cc.Component,

    properties: {
        spineBoy: sp.Skeleton,
        bullet: cc.Prefab,
        gameOVer: cc.Node,
        resetGame: cc.Node,
        coin: cc.Node,
        score: cc.RichText,
        lblGameOver: cc.RichText,
        lblWin: cc.RichText,
        _flag: false,
        _isMove: false,
        _isJump: false,
        _checkDeath: false,
        _checkWin: false,
        _handleMove: null,
        _handleDontMove: null,
        _handleJump: null,
        _handleDontJump: null,
        _handleShoot: null,
        _action: "",
        _changeScore: 100,
        jumpAudio: {
            default: null,
            type: cc.AudioClip
        },
        shootAudio: {
            default: null,
            type: cc.AudioClip
        },
        _scaleX: 0,
        _currentX: null,
        _currentY: null
    },

    onCollisionEnter(otherCollider, seftCollider) {
        if (otherCollider.tag == 1) {
            cc.log("cham dat");
        } else if (otherCollider.tag == 2) {
            cc.log(" fence killed character");
            this._checkDeath = true;
            this._isMove = true;
            this._isJump = true;
            this.spineBoy.setAnimation(0, 'death', false);
            this.node.stopAllActions();
            Emitter.instance.emit('play-game', true);
            setTimeout(() => {
                this.gameOVer.active = true;
                this.LoseScore(this._changeScore);
                this._changeScore = 100;
            }, 3000)

        } else if (otherCollider.tag == 3) {
            cc.log(" monster killed character");
            this._checkDeath = true;
            this._isMove = true;
            this._isJump = true;
            this.spineBoy.setAnimation(0, 'death', false);
            this.node.stopAllActions();

            Emitter.instance.emit('play-game', true);
            setTimeout(() => {
                this.gameOVer.active = true;
                this.LoseScore(this._changeScore);
                this._changeScore = 100;
            }, 3000)
        } else if (otherCollider.tag == 4) {
            cc.log("win");
            this._checkWin = true;
            this._isMove = true;
            this._isJump = true;
            this.spineBoy.setAnimation(0, 'hoverboard', true);
            this.node.stopAllActions();
            Emitter.instance.emit('reset-game', true);
            this.coin.active = true;
            setTimeout(() => {
                this.resetGame.active = true;
                this.WinScore(this._changeScore);
                this._changeScore = 100;
            }, 3000)

        }
    },
    onLoad() {
        this._scaleX = this.node.scaleX;
        this.init();
        this._handleMove = this.handleMove.bind(this);
        this._handleShoot = this.handleShoot.bind(this);
        this._handleDontJump = this.handleDontJump.bind(this);
        this._handleJump = this.handleJump.bind(this);
        this._handleDontMove = this.handleDontMove.bind(this);
        this._shoot = this.shoot.bind(this);

        Emitter.instance.registerEvent("move", this._handleMove);

        Emitter.instance.registerEvent("dontMove", this._handleDontMove);

        Emitter.instance.registerEvent("jump", this._handleJump);

        Emitter.instance.registerEvent("dontJump", this._handleDontJump);

        Emitter.instance.registerEvent("shoot", this._shoot);

        let manager = cc.director.getCollisionManager();
        manager.enabled = true;

    },
    init() {
        this.spineBoy.setAnimation(0, 'portal', false);
        this.spineBoy.setCompleteListener((entry) => {
            if (entry.animationEnd >= 3.59) {
                this._isJump = false;
                this._isMove = false;
                this.updateScore();
            }
        });
        this.spineBoy.setMix('run', "idle", 0.3);
        this.spineBoy.setMix('portal', "run", 0.3);
        this.spineBoy.setMix('run', "jump", 0.1);
        this.spineBoy.setMix('jump', "idle", 0.1);
        this.spineBoy.setMix('idle', "jump", 0.1);
        this.spineBoy.setMix('jump', "run", 0.1);
        this.spineBoy.setMix('jump', "shoot", 0.1);
    },
    updateScore() {
        let action = [cc.callFunc(() => {
            if (this._checkDeath) return;
            if (this._checkWin) return;
            this._changeScore -= 1;
        }),
        cc.delayTime(1),
        cc.callFunc(() => {
            this.score.string = `<color=#00ff00>Score:${this._changeScore}</c>`
        })];
        this.score.node.runAction(cc.repeat(cc.sequence(action), 99));
    },
    LoseScore(score) {
        let countScore = 0
        let actions = [cc.callFunc(() => { countScore += 1 }),
        cc.delayTime(0.01),
        cc.callFunc(() => { this.lblGameOver.string = `<color=#00ff00>YOU </c><color=#0fffff>LOSE</color>\n<color=#CD5555>SCORE:</c> <color=#FFCC33>${countScore}</color>` })]
        this.lblGameOver.node.runAction(cc.repeat(cc.sequence(actions), score))
    },
    WinScore(score) {
        let countScore = 0
        let actions = [cc.callFunc(() => { countScore += 1 }),
        cc.delayTime(0.01),
        cc.callFunc(() => { this.lblWin.string = `<color=#00ff00>YOU </c><color=#0fffff>WIN</color>\n<color=#CD5555>SCORE:</c> <color=#FFCC33>${countScore}</color>` })]
        this.lblWin.node.runAction(cc.repeat(cc.sequence(actions), score))
    },
    playJumpSound: function () {
        cc.audioEngine.playEffect(this.jumpAudio, false);
    },
    playShootSound: function () {
        cc.audioEngine.playEffect(this.shootAudio, false);
    },
    handleShoot() {
        this.spineBoy.setAnimation(0, 'shoot', false);
    },
    shoot(data) {
        this.spineBoy.setAnimation(1, 'shoot', false);
        let action = cc.callFunc(this.playShootSound, this);
        this.spineBoy.node.runAction(action);
        this.createBullet();

    },
    resetPose() {
        this.spineBoy.setCompleteListener(() => {
            this.spineBoy.clearTracks();
            this.spineBoy.setToSetupPose();
            this.spineBoy.setAnimation(0, "idle", true);
        });
    },
    createBullet() {
        let newBullet = cc.instantiate(this.bullet);
        if (this.spineBoy.node.scaleX > 0) {
            newBullet.parent = this.node.parent;
            newBullet.x = this.spineBoy.node.x + 80;
            newBullet.y = this.spineBoy.node.y + 60;
            let action = cc.moveBy(5, cc.v2(2000, 0));
            let destruction = cc.callFunc(() => {
                //newBullet.destroy();
            }, this);
            let sequence = cc.sequence(action, destruction);
            newBullet.runAction(sequence);
        } else {
            newBullet.parent = this.node.parent;
            newBullet.x = this.spineBoy.node.x - 100;
            newBullet.y = this.spineBoy.node.y + 60;
            let action = cc.spawn(cc.flipX(), cc.moveBy(5, cc.v2(-2000, 0)));
            let destruction = cc.callFunc(() => {
                // newBullet.destroy();
            }, this);
            let sequence = cc.sequence(action, destruction);
            newBullet.runAction(sequence);
        }
    },
    handleDontJump() {
        this.spineBoy.setEventListener((vl1) => {
            if (vl1.animationEnd >= 1.3) {
                this._isJump = false;
                if (this._isMove == true) {
                    this.spineBoy.setAnimation(0, 'run', true);
                } else {
                    this.spineBoy.setToSetupPose();
                    this.spineBoy.setAnimation(0, 'idle', false);
                    this.node.stopAllActions();
                }
            }
        });
    },
    handleJump() {
        if (this._isJump == true) return;
        this._isJump = true;
        this.spineBoy.setAnimation(0, 'jump', true);
        let action = cc.callFunc(this.playJumpSound, this);
        this.spineBoy.node.runAction(action);
    },

    handleDontMove() {
        if (this._isJump == true) {
            this._isMove = false;
            this.spineBoy.setEventListener((entry) => {
                if (entry.animationEnd >= 1.3) {
                    this.spineBoy.setToSetupPose();
                    this.spineBoy.setAnimation(0, 'idle', false);
                    this._isJump = false;
                    this.node.stopAllActions();
                }
            })
        }
        else {
            this.spineBoy.setToSetupPose();
            this.spineBoy.setAnimation(0, 'idle', false);
            this._isMove = false;
            this._isJump = false;
            this.node.stopAllActions();
        }
    },

    spineBoyTurn(data) {
        cc.log(data)
        var direction = 1;
        if (data == "right") {
            this.node.scaleX = this._scaleX;
        }
        else {
            this.node.scaleX = -this._scaleX;
            direction = -1;
        }
        return direction;
    },

    handleMove(data) {
        cc.log(this.spineBoy.node.scaleX)
        if (this._isJump) return;
        if (this._isMove == true) return;
        this._isMove = true;
        this.spineBoy.setAnimation(0, 'run', true);
        let turn = this.spineBoyTurn(data);
        this._action = cc.moveBy(0.8, cc.v2(turn * 300, 0)).repeatForever();
        this.node.runAction(this._action);
    },


    update(dt) {
        this.node.getComponent(cc.BoxCollider).offset = cc.v2(this.spineBoy.findBone("torso3").worldX, this.spineBoy.findBone("torso3").worldY);
        this._currentX = this.spineBoy.findBone("torso3").worldX;
        this._currentY = this.spineBoy.findBone("torso3").worldY;
        // cc.log(this.spineBoy.findBone("torso3"))

    }
});
