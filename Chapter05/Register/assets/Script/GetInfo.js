const InfoUser = cc.Class({ 
    userName: "", email: "", passWord: "", phone: "",
    ctor() {
        this.userName = "";
        this.email = "";
        this.passWord = "";
        this.phone = "";
    }
});
const data = JSON.parse(cc.sys.localStorage.getItem("users"));
let Users= [];
cc.Class({
    extends: cc.Component,

    properties: {
        edbUsername: cc.EditBox,
        edbEmail: cc.EditBox,
        edbPassword: cc.EditBox,
        edbPhone: cc.EditBox,
        btnSubmit: cc.Button,
        txtSuccess: cc.RichText,
        lblCheckEMail: cc.Label,
        lblCheckPhone: cc.Label,
        lblCheckPassword: cc.Label,
        lblCheckUser: cc.Label,
        lblResult: cc.Label,
        content: cc.Node,
        items: cc.Prefab,
        _flag: false,
     


    },


    onLoad() {
        if(data != null) {
        Users = data;
        }
    },

    CheckUser() {
        let validRegex = /^[a-zA-Z0-9]{3,6}$/;
        if (this.edbUsername.string.match(validRegex)) {
            this.lblCheckUser.node.color = new cc.Color(0, 255, 0, 0);
            this.lblCheckUser.string = "Valid Username successfully!";
        } else {
            this.lblCheckUser.node.color = new cc.Color(255, 0, 0, 0);
            this.lblCheckUser.string = "Username from 3 to 6 characters";

        }

    },
    CheckEmail() {
        let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (this.edbEmail.string.match(validRegex)) {
            this.lblCheckEMail.node.color = new cc.Color(0, 255, 0, 0);
            this.lblCheckEMail.string = "Valid email address!";
        } else {
            this.lblCheckEMail.node.color = new cc.Color(255, 0, 0, 0);
            this.lblCheckEMail.string = "Invalid email address!";

        }
    },
    CheckPassWord(){
        let validRegex = /^[a-zA-Z0-9]{8,16}$/;
        if (this.edbPassword.string.match(validRegex)) {
            this.lblCheckPassword.node.color = new cc.Color(0, 255, 0, 0);
            this.lblCheckPassword.string = "Valid password successfully!";
        } else {
            this.lblCheckPassword.node.color = new cc.Color(255, 0, 0, 0);
            this.lblCheckPassword.string = "Password from 8 to 16 characters,";

        }
    },
    CheckPhone() {
        let validRegex = /[0-9]/;
        if (this.edbPhone.string.length == 10 && this.edbPhone.string.match(validRegex)) {
            this.lblCheckPhone.node.color = new cc.Color(0, 255, 0, 0);
            this.lblCheckPhone.string = "Valid phone number!"
        } else {
            this.lblCheckPhone.node.color = new cc.Color(255, 0, 0, 0);
            this.lblCheckPhone.string = "Invalid phone number!"

        }
    },
    Submit() {
        if(this.edbUsername.string == "" ||this.edbEmail.string == "" || this.edbPassword.string == "" ||this.edbPhone.string == "" ){
            this.lblResult.node.color = new cc.Color(255, 0, 0, 0);
            this.lblResult.string = "Please fill out the form";
        }else{
            let user = new InfoUser;
            user.userName = this.edbUsername.string;
            user.passWord = this.edbPassword.string;
            user.email = this.edbEmail.string;
            user.phone = this.edbPhone.string;
            Users.push(user);
            cc.sys.localStorage.setItem("users", JSON.stringify(Users));
            this.txtSuccess.node.active = true;
            this.node.parent.active = false;
            
        }

    },
    renderUser(){

        // for(let i=0;i<Users.length;i++){
        //     let item = cc.instantiate(this.items);
        //     item.parent = this.content;
        //     item.getChildByName("item").getComponent(cc.Label).string = Users[i].username;
           
        // }
    },

    start() {

    },

    // update (dt) {},
});
