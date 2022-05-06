
let data = JSON.parse(cc.sys.localStorage.getItem("users"))

cc.Class({
    extends: cc.Component,

    properties: {
        item: cc.Prefab,
        scrollView: cc.ScrollView,

    },

    onLoad() {
        data = JSON.parse(cc.sys.localStorage.getItem("users"))

    },
    getUserName(userName) {
        data = JSON.parse(cc.sys.localStorage.getItem("users"))

        let item = cc.instantiate(this.item);
        item.parent = this.node;
        item.children[1].getComponent('cc.Label').string = userName;
        return item;
    },
    ShowUser() {
        data.forEach(user =>
            this.getUserName(user.userName)
        );

    },
    start() {
        data = JSON.parse(cc.sys.localStorage.getItem("users"));

        if (data != null) {
            this.ShowUser();
        }
    },

    update(dt) {
        data = JSON.parse(cc.sys.localStorage.getItem("users"));

    },
});
