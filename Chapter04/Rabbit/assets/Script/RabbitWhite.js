
cc.Class({
    extends: cc.Component,
    editor: {
        executionOrder: -1
    },

    properties: {
        _distance:100,
        brownRabbit:{
            default:null,
            type:cc.Component
        }
    },
    start () {
        cc.log("RabbitWhite: Hello");
        this.moveLimit = this.node.x + this._distance;
    },
    
    update (dt=1) {
        if(this.node.x <= this.moveLimit){
            this.node.x += (dt*20);
        }
        else{
            this.brownRabbit.node.active = true;
        }
    },
});
