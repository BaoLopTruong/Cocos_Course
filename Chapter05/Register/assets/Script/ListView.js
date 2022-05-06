let data = JSON.parse(cc.sys.localStorage.getItem("users"))
cc.Class({
    extends: cc.Component,

    properties: {
    },


    changeFontSize(){
       cc.log(this)
    },
    onLoad () {
        this.node.active = false;
        // cc.log(data)
        // if(data != null) {
        //     data.forEach(u => cc.log(u.userName));
        // }
        
    },

    start () {
        
    

    },

    // update (dt) {},
});
