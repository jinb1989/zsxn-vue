<template >
    <div class="app-shop">
        <!--图片轮播-->
        <div class="mui-card">
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
                    <swiper-box :list="imglist"></swiper-box><!--调用子组件-->
				</div>
			</div>
		</div>
        <!--商品列表-->
         <div class="mui-card">
			<div class="mui-card-header">商品列表</div>
			  <div class="mui-card-content">
				<div class="mui-card-content-inner">
                    <ul class="mui-table-view">
                        <li class="mui-table-view-cell mui-media" v-for="item in cartlist" :key="item.id">
                            <a href="javascript:;">
                                <img class="mui-media-object mui-pull-left" src="">
                                <div class="mui-media-body">
                                    {{item.title}}
                                    <p class='mui-ellipsis'>
                                        <span class="price">￥{{item.price}}</span>
                                        <span class="count">
                                             <div class="mui-numbox">
                                                <button class="mui-btn mui-btn-numbox-minus" type="button" @click="goodSub(item.id)">-</button>
                                                <input class="mui-input-numbox" type="number" :value="item.count">
                                                <button class="mui-btn mui-btn-numbox-plus" type="button" @click="goodAdd(item.id)">+</button>
				                             </div>
                                        </span>
                                    </p>
                                </div>
                            </a>
                        </li>
                    </ul> 
                    <div>
                        合计：{{getSubTotal}}
                    </div>  
				</div>
			</div>
		</div>
    </div>
</template>
<script>
//引入轮播子组件
import swiper from '../sub/swiper.vue';
    export default {
        data(){
            return {
                imglist:[],
                cartlist:[],
            }
        },
        methods:{
            getGoodInfo(){
                //商品列表将商品id传递商品详情
                var id=this.$route.params.id;//var id=this.$route.params.id
                this.$http.get("goodsinfo?id="+id).then(result=>{
                this.info= result.body;
                })
            },
            getCartList(){
                this.$http.get("shopCart").then(result=>{
                this.cartlist= result.body;
                })
            },
            goodAdd(id){
                //1.获取数中每一个元素
                for(var  item of this.cartlist){
                    //2.判断参数中id与当前元素id是否相同
                    if(item.id==id){
                        //3.当前元素++
                        if(item.count<10)
                        item.count++;
                        break;
                    }
                }
            },
            goodSub(id){
                for(var item of this.cartlist){
                    if(item.id==id){
                        if(item.count>1)
                        item.count--;
                        break;
                    }
                }
            },
            getImageList(){
                this.$http.get("imagelist").then(result=>{
                this.imglist = result.body;
            })
            },
            
        },
        created(){
            this.getGoodInfo();
            this.getImageList();
            this.getCartList();
        },
        components:{//注册当前组件
            "swiper-box":swiper
        },
        computed:{
                getSubTotal:function(){
                    //计算商品累加和并返回
                    //1.创建临时变量
                    var sum=0;
                    //2.创建循环
                    for(var item of this.cartlist){
                        //3.计算累加和
                        sum+= item.price*item.count;
                    }
                    //4.返回累加和
                    return sum;
                }
            }
    }
</script>
<style>
    .mui-card-content-inner{
        padding:0px !important;
    }
     .app-subswipe {
        height:200px;
         
    }
    .app-subswipe .mint-swipe img{
        width:100%;
        height:100%;
    }
</style>