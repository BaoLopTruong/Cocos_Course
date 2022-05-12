const Emitter = require('mEmitter');
const eventCode = require('eventCode');
cc.Class({
    extends: cc.Component,

    properties: {
        monster: cc.Node,
        fence: cc.Node,
        avatar: sp.Skeleton,
        gate: cc.Node,
        btnPlay: cc.Button,
        btnResetGame: cc.Button,
        winText: cc.RichText,
        scoreText: cc.Label,
        _flag: true,
        _posPlayer: "",
        _accMonster: ""
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad() {
        cc.log("controller")
        this.node.on('mousedown', this.registerPlay, this);
        this._btnPlayGame = this.playGame.bind(this);
        this._gameOver = this.gameOver.bind(this);
        this._gameWin = this.gameWin.bind(this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        Emitter.instance.registerEvent(eventCode.DEATH, this._gameOver);
    },
    registerPlay() {
        Emitter.instance.registerEvent(eventCode.PLAY, this._btnPlayGame);
    },

    playGame() {
        this.monster.active = true;
        this.fence.active = true;
        this.gate.active = true;
        this.avatar.node.active = true;
        this.btnPlay.node.active = false;
        this.scoreText.node.active = true;
        this.moveMonster();
        this.score = 0;
    },
    onKeyDown(event) {
        switch (event.keyCode) {
            case 37:
                if (!this._flag) {
                    this._flag = true;
                    Emitter.instance.emit(eventCode.RUNBACK, true);
                }
                break;
            case 39:
                if (!this._flag) {
                    this._flag = true;
                    Emitter.instance.emit(eventCode.RUN, true);
                }
                break;
            case 38:
                if (!this._flag) {
                    this._flag = true;
                    Emitter.instance.emit(eventCode.JUMP, true);
                }
                break;
            case 40:
                if (!this._flag) {
                    this._flag = true;
                    Emitter.instance.emit(eventCode.JUMPBACK, true);
                }
                break;
            case 32:
                if (!this._flag) {
                    this._flag = true;
                    Emitter.instance.emit(eventCode.SHOOT, true);
                }
                break;
        }
    },

    onKeyUp(event) {
        switch (event.keyCode) {
            case 37:
                this._flag = false;
                Emitter.instance.emit(eventCode.RUNBACK, false);
                break;
            case 39:
                this._flag = false;
                Emitter.instance.emit(eventCode.RUN, false);
                break;
            case 38:
                this._flag = false;
                Emitter.instance.emit(eventCode.JUMP, false);
                break;
            case 40:
                this._flag = false;
                Emitter.instance.emit(eventCode.JUMPBACK, false);
                break;
            case 32:
                this._flag = false;
                Emitter.instance.emit(eventCode.SHOOT, false);
                break;
        }
    },
    moveMonster() {
        let moveTo = cc.moveBy(0.8, cc.v2(50, 0));
        let moveBack = cc.moveBy(0.8, cc.v2(-50, 0));
        this._accMonster = cc.repeatForever(cc.sequence(moveTo, moveBack))
        this.monster.runAction(this._accMonster);
    },
    gameOver() {
        this.avatar.setAnimation(0, "death", true);
        this.avatar.setCompleteListener(() => {
            this.avatar.clearTracks();
            this.avatar.setToSetupPose();
        });
        Emitter.instance.emit(eventCode.GAMEOVER, true);
        this.avatar.node.destroy();
        this.gate.destroy();
        this.fence.destroy();
        this.monster.destroy();
    },
    gameWin() {
        this.avatar.setAnimation(0, 'hoverboard', true);
        this.avatar.setCompleteListener(() => {
            this.avatar.clearTracks();
            this.avatar.setToSetupPose();
            this.avatar.setAnimation(0, 'hoverboard', true);
        });
        this.winText.node.active = true;
    },
    checkWin() {
        let playerPos = this.avatar.node.getPosition();
        let dist = this.gate.position.sub(playerPos).mag();
        return dist;
    },
    update(dt) {
        if (this.checkWin() < 130) {
            this.gameWin();
            return;
        }
        this.gainScore(dt);
    },
    gainScore(dt) {
        if (this._flag == true) {
            this.score = this.score + dt;
            this.scoreText.string = 'Score:' + this.score;
        }
        else {
            this.scoreText.string = 'Score:' + this.score;
        }

    },
    onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }
});

