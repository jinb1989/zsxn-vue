<template>
    <div class="app-homeContainer">
    <!--顶部导航条-->
       <mt-header fixed title="钻石新娘" style="background-color:#333333;"></mt-header>
    <!--轮播图-->
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in list" :key="item.id">
                 <img :src="item.img_url">
             </mt-swipe-item>
        </mt-swipe> 
        <!--六宫格-->
         <ul class="mui-table-view mui-grid-view mui-grid-9">
		    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/goodslist">
		            <img src="../../img/menu1.png">
		            <div class="mui-media-body">求婚钻戒</div>
                </router-link>
            </li>
		    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                 <router-link to="/home/goodslist">
		           <img src="../../img/menu2.png">
		             <div class="mui-media-body">结婚对戒</div>
                </router-link>
            </li>
		    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/goodslist">
		            <img src="../../img/menu3.png">
		            <div class="mui-media-body">真爱礼物</div>
                </router-link>
            </li>
		    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/goodslist">
		            <img src="../../img/menu4.png">
		            <div class="mui-media-body">男戒</div>
                </router-link>
            </li>
		    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
                   <img src="../../img/menu5.png">
                    <div class="mui-media-body">真爱体验店</div>
                </a>
            </li>
		    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/goodslist">
                    <img src="../../img/menu6.png">
                    <div class="mui-media-body">全部商品</div>
                </router-link>
            </li>
		</ul> 
        <!--分割线-->
        <div class="divider"><img src="../../img/001.jpg"></div>
        <!--主体列表图片-->
        <ul class="home-list">
            <li class="home-list-item">
                <router-link to="/home/goodslist">
                    <img src="../../img/1list.jpg">
                </router-link>
            </li>
            <hr>
            <li class="home-list-item">
                <router-link to="/home/goodslist">
                    <img src="../../img/2list.jpg">
                </router-link>
            </li>
            <hr>
            <li class="home-list-item">
                <router-link to="/home/goodslist">
                    <img src="../../img/3list.jpg">
                </router-link>
            </li>
            <hr>
            <li class="home-list-item">
                <router-link to="/home/goodslist">
                    <img src="../../img/4list.jpg">
                </router-link>
            </li>
            <hr>
        </ul>
        <div class="divider"><img src="../../img/002.jpg"></div>
        <ul class="home-list">
            <li class="home-list-item">
                <router-link to="/home/goodslist">
                    <img src="../../img/list5.jpg">
                </router-link>
                <p>我们希望传承一个浪漫勇敢的约定：</p>
            </li>
            <li class="home-list-item">
                <router-link to="/home/goodslist">
                    <img src="../../img/list6.jpg">
                </router-link>
            </li>
            <li class="home-list-item last-image" >
                <router-link to="/home/goodslist">
                    <img src="../../img/list7.jpg">
                </router-link>
                <p class="text">【一生信约】期限至60年钻石婚<br>寓意对彼此的爱如钻石真挚、坚定、纯粹<br>穿越一生时光，依然熠熠生辉<br> </p>
                <p class="text">签订者可在每年签约日预约至钻石新娘打卡<br>领取挚爱纪念礼<br>且每十年获得一枚钻石挚爱勋章</p>
            </li>
        </ul>
        <!--底部-->
        <hr>
        <div class="footer">
            <p>FOLLOW US 关注我们</p>
            <p>一个让你相信真爱的地方,给你实用的情感指南,为你的爱情终身服务。</p>
            <a><span class="mui-icon mui-icon-weibo"></span></a>
			<a><span class="mui-icon mui-icon-weixin"></span></a>
            <div class="phone">
                <p><a id="icon-phone"><span class="mui-icon mui-icon-phone"></span></a>028-86667065</p>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                list:[]
            }
        },
        methods:{
            jumpShop(){
               //编程跳转
              // this.$router.push("/home/shop?id=15");
               this.$router.push("/home/shop/19");//以/传参时的写法
            },
            getImage(){
                //发送ajax请求并且获取图片列表并显示
                var url="http://127.0.0.1:3000/imagelist"
                this.$http.get(url).then(result=>{
                    //console.log(result);
                    //获取返回的数据保存再list属性中
                    this.list=result.body;
                })
            }
        },
        created(){
            this.getImage();
        }
    }
   
</script>
<style>
    .app-homeContainer{
        background:#fff;
    }
    .app-homeContainer .mint-swipe{
        height:200px;
    }
    .app-homeContainer .mint-swipe img{
        width:100%;
        height:100%;
    }
    /*调整六宫格*/
    .app-homeContainer .mui-grid-view.mui-grid-9{
        border:0;
        background:#fff;
    }
    .app-homeContainer .mui-grid-view.mui-grid-9 img{
        width:60px;
        height:60px;
    }
    .app-homeContainer .mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body{
         font-size:13px;
         color:rgb(141,111,103);
     }
    .app-homeContainer .home-list {
        list-style:none;
        margin:0;
        padding:0;
    }
    .app-homeContainer .home-list .home-list-item img{
         width:100%;
         height:100%;   
     }
     .app-homeContainer .home-list .home-list-item p{
         text-align:center;
         color:rgb(141,111,103);
         font-size:18px;
         margin-top:10px;
         margin-bottom:20px;
     }
     .app-homeContainer .home-list .home-list-item .text{
         text-align:center;
         color:rgb(141,111,103);
         font-size:14px;
         margin-top:10px;
         margin-bottom:20px;
     }
    .app-homeContainer .home-list .last-image{
        margin-top:20px;
    }
     /**分割线 */
    .app-homeContainer .divider{
        height:50px;
        text-align:center;
        font-size:40px;
        font-family:"STCaiyun";
        color:rgb(141,111,103);
        margin-top:10px;
        margin-bottom:40px;
    }
    .app-homeContainer .divider img{
        width:150px;

    }
    /**底部 */
    .footer{
        text-align:center;
    }
    .footer p{
        /* font-family:"STCaiyun";*/
         font-size:12px;
         color:rgb(141,111,103);
    }
    
    .footer .mui-icon{
        color:rgb(141,111,103);
    }
    .footer .phone{
        margin-top:10px;
        background:#333333;
        height:50px;
        line-height:50px;
    }
    .footer .phone a{
        color:rgb(141,111,103);
    }
    .footer .phone p{
        font-size:18px;
        color:rgb(141,111,103);
    }

</style>