import Vue from 'vue'
import App from './App.vue'
import router from './router'
//0：引入mint-ui css
import'mint-ui/lib/style.css'


Vue.config.productionTip = false
//0：引入mui css文件 大部分组件都要使用css在main.js引入
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'

//引入组件mintui库header
//引入指定组件
//import {Header,Swipe,SwipeItem,Button,Lazyload} from "mint-ui";
//注册当前项目中<mt-header>
// Vue.component(Header.name,Header);
// Vue.component(Swipe.name,Swipe);
// Vue.component(SwipeItem.name,SwipeItem);
// Vue.component(Button.name,Button);
// Vue.use(Lazyload);

//完整引入
import MintUI from 'mint-ui';
Vue.use(MintUI)

//2.引入vue-resource 发送AJAX
//1.引入vue-resource 库所有组件
import VueResource from "vue-resource";
//将所有组件注册
Vue.use(VueResource);



//3:过滤器
//val  原日期对象
//返回日期格式对象
Vue.filter("datetimeFilter",function(val){
  var date=new Date(val);
  var y=date.getFullYear();
  var m=date.getMonth()+1;
  var d=date.getDate();
  var h=date.getHours();
  var mi=date.getMinutes();
  var s=date.getSeconds();
  m<0&&(m="0"+m);
  d<10&&("0"+d);
  h<10&&(h="0"+h);
  mi<10&&(mi="0"+mi);
  s<10&&(s="0"+s);
  return `${y}-${m}-${d} ${h}:${mi}:${s}`;
});
Vue.filter("dateFilter",function(val){
  var date=new Date(val);
  var y=date.getFullYear();
  var m=date.getMonth()+1;
  var d=date.getDate();
  m<0&&(m="0"+m);
  d<10&&("0"+d);
  return `${y}-${m}-${d}`;
});


//#配置 VueResource 服务器根目录
Vue.http.options.root="http://127.0.0.1:3000/";
//#修改请求头 Post
//Vue.http.options.emulateJSON=true;

//引组件
//注册
//在自己组件使用mintui调用图片轮播

//4.创建vuex实例对象
  //4.1:下载安装vuex npm i vuex -D
  //4.2:引入vuex
  import Vuex from 'vuex'
  //4.3:注册vuex实例
  Vue.use(Vuex)
  //4.4:创建vuex实例对象
  var store = new Vuex.Store({
    state:{count:0},  //购物车中商品数量
    mutations:{
      increment(state,c){state.count+=parseInt(c)},    //修改共享数据的两个方法
      substract(state){state.count--}    //参数共享数据属性
    },  
    getters:{
      optCount:function(state){
        return state.count;  //返回共享数据
      }
    }
  });
//5.将Vuex实例对象注册vue实例

new Vue({
  router,
  render: h => h(App),
  store
}).$mount('#app')
