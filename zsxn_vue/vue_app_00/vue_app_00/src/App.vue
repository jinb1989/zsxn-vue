<template>
<div class="app-container">
    <!--1顶部导航栏-->
    <mt-header fixed title="钻石新娘"></mt-header>
    <!--2容器显示不同组件-->
    <router-view>
    </router-view>
    <!--3底部导航栏-->
        <nav class="mui-bar mui-bar-tab nav-box" >
            <!-- 导航列表 -->
            <ul>
                <li class="nav-item" v-for="(item, index) in nav"  @click="routerLink(index, item.path)" :key="index">
                    <!-- 判断高亮表 -->
                    <!--<p :class="navIndex === index ? 'item-en item-en-active' : 'item-en'"><img :src="item.icon" /></p>-->
                    <p> <img :src="item.icon" /></p>
                     <!-- 判断高亮表 -->
                    <p :class=" navIndex === index ? 'item-cn item-cn-active' : 'item-cn'">{{ item.title }}</p>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
   export default {
      data() {
        return {
            nav: [
            {title: '首页', icon:'http://127.0.0.1:3000/img2/home2.jpg', path: '/'},
            {title: '会员', icon:'http://127.0.0.1:3000/img2/my1.jpg', path: '/home/login'},
            {title: '购物车', icon:'http://127.0.0.1:3000/img2/cart2.jpg', path: '/shop'},
            ],
            navIndex: 0,
            }
       },
	   methods:{
        /**
 * 路由跳转
 * @param index
 * @param link
*/
routerLink(index, path) {
 // 点击哪个路由就赋值给自定义的下下标
 this.navIndex = index;
 // 路由跳转
 this.$router.push(path)
},
 
/**
 * 检索当前路径
 * @param path
*/
checkRouterLocal(path) {
 // 查找当前路由下标高亮
 this.navIndex = this.nav.findIndex(item => item.path === path);
}
	   },
	  watch: {
 "$route"() {
 // 获取当前路径
 let path = this.$route.path;
 // 检索当前路径
 this.checkRouterLocal(path);
 }
},
   }
</script>

<style>
.app-container{
     padding-top:40px;
     padding-bottom:50px;
     overflow-x:hidden;
   }
  .nav-box {
    display: flex;
}
.nav-item {
    text-align: center;
    padding: 0 46px;
    position: relative;
    display: inline-block;
    line-height: 25px;
    font-size:11px;
    overflow:hidden;
    text-overflow:ellipsis;
}
 
/*导航普通状态*/
.item-cn {
 color: rgb(141,111,103);
 font-weight: 800;
}
 
/*导航普通状态*/
.item-en {
 color: #666;
 font-size: 12px;
}
 
/*导航高亮*/
.item-cn-active {
 color: #2d8cf0;
}
 
/*导航高亮*/
.item-en-active {
 color: #5cadff;
}
 
.app-container .mui-bar .nav-item:hover .item-cn {
 color: #2d8cf0;
}
 
.nav-item:hover .item-en {
 color: #5cadff;
}
 
.nav-item:after {
 position: absolute;
 right: 0;
 top: 20px;
 content: '';
 width: 1px;
 height: 16px;
 background-color: #f8f8f8;
}
 
.nav-item:after:last-child {
 width: 0;
}
ul{
    padding:0;
    margin:0;
    background:white;
}
.app-container .mui-bar .nav-item p{
    margin-bottom:0;
}
.app-container .mui-bar .nav-item p img{
    width:25px;
    height:25px;
    margin-top:5px

}
</style>
