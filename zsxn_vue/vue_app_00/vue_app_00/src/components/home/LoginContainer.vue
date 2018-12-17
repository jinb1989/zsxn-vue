<template>
    <div class="container">
    <div class="app-login">
       <div class="wellogin">
        <img src="http://127.0.0.1:3000/img/logo2018.png">
       </div>
		<input type="text" name="uname" value class="nickname" id="login_nickname" placeholder="请输入用户名"  v-model="unameval"><a id="icon-person"><span class="mui-icon mui-icon-person"></span></a>
		<input type="password" name="upwd" value class="password" id="login_password" placeholder="请输入密码" v-model="upwdval"><a><span class="mui-icon mui-icon-locked"></span></a>
		<input type="button" value="注册" class="regist">
		 <router-link to="/home/mine"><input type="button" value="登录" class="login" @click="btnSubmit"></router-link>
		<div class="rememberpass">
			<input type="checkbox" value name="rememberpass">记住密码
		</div>
    </div>
    </div>
</template>
<script>
import {Toast} from 'mint-ui'
    export default {
        data(){
            return {
                unameval:"",
                upwdval:""
            }
        },
        methods:{
            btnSubmit(){
                var u=this.unameval;
                var p=this.upwdval;
                this.$http.get("login?uname="+u+"&upwd="+p).then(result=>{
                    if(result.body.code==1){
                        Toast(result.body.msg);
                       // this.$router.push("/");
                    }else{
                        Toast(result.body.msg);
                    }
                })
            }
        }
    }
</script>
<style>
    .container{
        height:575px;
        background:url(../../img/bg.jpg) repeat;
        margin:0;
        padding:0;
    }
    .mint-header{
        background-color:#666 !important; 
    }
   	.app-login {
        position: relative;
        right: -17px;
        /*display: inline-block;*/
        overflow: hidden;
        width: 100%;
        height: 450px;
        vertical-align: middle;
    }
    .app-login  .wellogin {
        position: absolute;
        top: 33px;
        right: 33px;
        overflow: hidden;
        height: 200px;
    }
    .app-login  .wellogin img{
        width:100%;
    }
    .app-login  .nickname {
        position: absolute;
        top: 185px;
        right: 45px;
        overflow: hidden;
        width: 311px;
        height: 40px;
        border: 1px solid #ccc;
        border-radius:3px;
        color: rgb(141,111,103);
        line-height: 30px;
        outline: none;
    }
    .app-login .mui-icon-locked{
        position:absolute;
        top:246px;
        right:80px;
    }
    .app-login  .password {
        position: absolute;
        border: 1px solid #ccc;
        border-radius:3px;
        top: 239px;
        right: 45px;
        overflow: hidden;
        width: 311px;
        height: 40px;
        color: rgb(141,111,103);
        line-height: 30px;
        outline: none;
    }
    .app-login .mui-icon-person{
        position:absolute;
        top:190px;
        right:80px;
    }
    .app-login .regist {
        position: absolute;
        top: 346px;
        right: 230px;
        overflow: hidden;
        margin: 0;
        padding: 0;
        width: 136px;
        height: 36px;
        border: 1px solid #ccc;
        cursor: pointer;
        outline: none;
        background:rgba(208,186,150,.8);
        color:#fff;
    }
    .app-login  .login {
        position: absolute;
        top: 346px;
        right: 46px;
        overflow: hidden;
        margin: 0;
        padding: 0;
        width: 136px;
        height: 36px;
        border:  1px solid #ccc;
        cursor: pointer;
        outline: none;
        background:rgba(208,186,150,.8);
        color:#fff;
    }
    .app-login  .rememberpass {
        position: absolute;
        top: 296px;
        right: 280px;
        outline: none;
        color:#666;
        font-size:14px;
    } 
</style>