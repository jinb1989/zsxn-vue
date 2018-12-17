import Vue from 'vue'
import Router from 'vue-router'
import HelloContainer from "./components/HelloWorld.vue"
// 1：引入自定义组件
import TestContainer from "./components/testContainer.vue";
import listContainer from "./components/listContainer.vue";
import HomeContainer from "./components/tabbar/HomeContainer.vue";
import newsListContainer from "./components/news/newsListContainer.vue";
import newInfoContainer from "./components/news/newInfoContainer.vue";
import ShopContainer from "./components/tabbar/ShopContainer.vue";
import goodsList from "./components/goods/GoodsList.vue";
import goodsInfo from "./components/goods/GoodsInfo.vue";
import photoContainer from './components/photo/PhotoContainer.vue';
import loginContainer from './components/home/LoginContainer.vue';
import mineContainer from './components/home/mine.vue'
Vue.use(Router)

//2：配置访问自定义组件路径
//{path 访问路径 component  组件名称}
export default new Router({
  routes: [
    {path:'/',redirect:"/home"},  //重定向到home
    {path:"/home/mine",component:mineContainer},
    {path:"/test",component:TestContainer},
    {path:"/list",component:listContainer},
    {path:"/home",component:HomeContainer},
    {path:"/home/newslist",component:newsListContainer},
    {path:"/home/newsinfo",component:newInfoContainer},
    {path:"/shop",component:ShopContainer},
    //{path:"/home/shop",component:ShopContainer}
    {path:"/home/goodslist",component:goodsList},
    {path:"/home/goodsinfo/:id",component:goodsInfo},
    {path:"/home/photo",component:photoContainer},
    {path:"/home/login",component:loginContainer}
  ]
})
