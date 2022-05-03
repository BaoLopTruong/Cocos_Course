
cc.Class({
    extends: cc.Component,
    editor: {
        executionOrder: -1
    },

    properties: {
        brownRabit:{
            default:null,
            type:cc.Component
        }
    },
    start () {
        cc.log("RabbitWhite: Hello");
    },
    
    update (dt=1) {
        if(this.node.x <=100){
            this.node.x += (dt*100);
        }
        else{
            this.brownRabit.node.active = true;
        }
    },
});
