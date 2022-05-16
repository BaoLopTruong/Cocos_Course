const Emitter = require('mEmitter');
cc.Class({
    extends: cc.Component,

    properties: {
        _action: null,
        _handleMove: null,
        _handleDontMove: null,
        _handleJump: null,
        _handleDontJump: null,
        _handleShoot: null,
        spinboy: sp.Skeleton,
        _isMove: false,
        _isJump: false,
        _scaleX: 0
    },

    onLoad() {
        this._scaleX = this.node.scaleX;
        this.registerEmitter();
        this.spinboy.setAnimation(0, 'portal', false);

        this.spinboy.setMix('run', "idle", 0.3);
        this.spinboy.setMix('portal', "run", 0.3);
        this.spinboy.setMix('run', "jump", 0.1);
        this.spinboy.setMix('jump', "idle", 0.1);
        this.spinboy.setMix('idle', "jump", 0.1);
        this.spinboy.setMix('jump', "run", 0.1);
        this.spinboy.setMix('jump', "shoot", 0.1);
    },

    registerEmitter() {
        this._handleMove = this.handleMove.bind(this);
        Emitter.instance.registerEvent("move", this._handleMove);

        this._handleDontMove = this.handleDontMove.bind(this);
        Emitter.instance.registerEvent("dontMove", this._handleDontMove);

        this._handleJump = this.handleJump.bind(this);
        Emitter.instance.registerEvent("jump", this._handleJump);

        this._handleDontJump = this.handleDontJump.bind(this);
        Emitter.instance.registerEvent("dontJump", this._handleDontJump);

        this._handleShoot = this.handleShoot.bind(this);
        Emitter.instance.registerEvent("shoot", this._handleShoot);
    },

    handleShoot() {
        this.spinboy.setAnimation(0, 'shoot', false);
    },

    handleDontJump() {
        this.spinboy.setEventListener((vl1) => {
            if (vl1.animationEnd >= 1.3) {
                this._isJump = false;
                if (this._isMove == true) {
                    this.spinboy.setAnimation(0, 'run', true);
                } else {
                    this.spinboy.setToSetupPose();
                    this.spinboy.setAnimation(0, 'idle', false);
                    this.node.stopAllActions();
                }
            }
        });
    },

    handleJump() {
        if (this._isJump == true) return;
        this._isJump = true;
        this.spinboy.setAnimation(0, 'jump', true);
    },

    handleDontMove() {
        if (this._isJump == true) {
            this._isMove = false;
            this.spinboy.setEventListener((vl1) => {
                cc.log(vl1)
                if (vl1.animationEnd >= 1.3) {
                    this.spinboy.setToSetupPose();
                    this.spinboy.setAnimation(0, 'idle', false);
                    this._isJump = false;
                    this.node.stopAllActions();
                }
            })
        }
        else {
            this.spinboy.setToSetupPose();
            this.spinboy.setAnimation(0, 'idle', false);
            this._isMove = false;
            this._isJump = false;
            this.node.stopAllActions();
        }
    },

    spinBoyTurn(act) {
        cc.log(act)
        var direction = 1;
        if (act == "right") {
            this.node.scaleX = this._scaleX;
        }
        else {
            this.node.scaleX = -this._scaleX;
            direction = -1;
        }
        return direction;
    },

    handleMove(act) {
        cc.log(act)
        if (this._isJump) return;
        if (this._isMove == true) return;
        this._isMove = true;
        this.spinboy.setAnimation(0, 'run', true);
        let turn = this.spinBoyTurn(act);
        this._action = cc.moveBy(0.8, cc.v2(turn * 100, 0)).repeatForever();
        this.node.runAction(this._action);
    },

    start() {

    },

    update(dt) {
        cc.log(this._isJump, this._isMove)
    },
});
