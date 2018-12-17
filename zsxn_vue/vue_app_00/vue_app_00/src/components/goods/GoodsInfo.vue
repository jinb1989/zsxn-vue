<template>
    <div class="app-goodsinfo">
        <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner" v-for="item in info" :key="item.id">
                        <img :src="item.img_url">
                        <p class="title">{{item.title}}</p>
                        <p class="price">
                        市场价：<del>￥{{item.old}}</del>
                        销售价：<span class="now">￥{{item.now}}</span>
                        </p>
                         <p>
                        购买数量：
                        <div class="mui-numbox">
                            <button class="mui-btn mui-btn-numbox-minus" type="button" @click="goodSub">-</button>
                            <input class="mui-input-numbox" type="number" value="1" v-model="val">
                            <button class="mui-btn mui-btn-numbox-plus" type="button" @click="goodAdd">+</button>
				        </div>
                    </p>
                    <div class="mui-card-content-inner">
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addCartTo()">加入购物车</mt-button>
                    </p>
				</div>
				    </div>
				</div>
			</div>
        <!--商品购买区域-->
        <div class="mui-card">
            <dl id="product_proexstyle" class="hide productService product_detail" number="1">
		        <div class="detailparam">
					<div class="name">详细参数</div>
					<div class="extend"  v-for="item in desc" :key="item.id">
						<ul>
							<li>
								<em>商品名称:</em>
								<span>{{item.title}}</span>
							</li>
							<li>
								<em>商品编号:</em>
								<span>{{item.pid}}</span>
							</li>
							<li>
								<em>商品材质:</em>
								<span>{{item.cz}}</span>
							</li>
							<li>
								<em>商品证书:</em>
								<span>国检</span>
							</li>
							<li>
								<em>主钻重量:</em>
								<span>{{item.ct}}</span>
							</li>
							<li>
								<em>主钻颜色:</em>
								<span>{{item.color}}</span>
							</li>
						</ul>
					</div>
				</div>
			</dl>            
			<div class="mui-card-content">
				
			</div>
		</div>
        <!--商品参数区域-->
       <div class="mui-card">
			<div class="mui-card-footer">
                <div class="goodsinfo-item" v-for="item in imglist1 " :key="item.id">
                    <img :src="item.img_url" class="desc_image">
                </div>
            </div>
		</div>
    </div>
</template>
<script>

 //引入子组件
 import swiper from '../sub/swiper.vue';
 //引入组件
 import {Toast} from 'mint-ui';
    export default {
        data(){
            return {
                imglist1:[],
                val:1,
                info:[],
                desc:[]
            }
        },
        methods:{
            getGoodInfo(){
                //商品列表将商品id传递商品详情
                var id=Number(this.$route.params.id);
                this.$http.get("goodsinfo").then(result=>{
                    this.info.push(result.body[id-1]);
                   // this.imglist1.push(result.body[id-1]);
                })
            },
             getDesc(){
                //商品列表将商品id传递商品详情
                var id=Number(this.$route.params.id);
                this.$http.get("prodesc").then(result=>{
                    this.desc.push(result.body[id-1]);
                   // this.imglist1.push(result.body[id-1]);
                })
            },
            goodAdd(){
                if(this.val<=998){
                this.val++;
                }
            },
            goodSub(){
                if(this.val>1){
                this.val--;
                }
            },
            //服务器数据：返回模拟数据[id,title,now,old,商号]
            //参数：id
            getImageList(){
                var id=Number(this.$route.params.id);
               // console.log(typeof(id))
              // console.log(id);
                this.$http.get("imagelist1").then(result=>{
                    //console.log(result.body)
                    this.imglist1.push(result.body[id-1]);
                    //console.log( this.imglist1.img_url);
                })
            },
            addCartTo(){
                //console.log("添加至购物车");
                //1.将商品编号和数量保存服务器
                    //1.1:获取商品编号
                    var id=this.$route.params.id;//var id=this.$route.params.id;
                    //1.2:获取商品数量
                    var count=this.val;//var count=this.val;
                    //1.3:发送请求
                    this.$http.get("addCart?pid="+id+"&count="+count).then(result=>{
                        if(result.body.code==1){
                            //1.4更新购物车中商品数量
                            //修改Vuex共享数据
                            this.$store.commit("increment",count);
                            Toast(result.body.msg);
                        }else{
                            Toast(result.body.msg);
                        }
                    });
                //2.更新app.vue组件购物车数量

            }
        },
        created(){
            this.getImageList();
            this.getGoodInfo();
            this.getDesc();
            //console.log(this.$route.query.id);
             //console.log(this.$route.params.id);//以/传参时接收参数的写法
        },components:{//注册
            "swiper-box":swiper
        }
    }
</script>
<style>
.mui-card-content-inner{
    padding:15px !important;
}
 .mui-card-content-inner img{
    width:100%;
}
 .goodsinfo-item{
    height:100%;
}
 .desc_image{
    width:100%;
    height:auto;
}
    .detailcontent {
    width: 100%;
    height: auto !important;
    height: 400px;
    overflow: visible;
    margin: 0px auto;
}
.detailparam {
    width: 100%;
    height: auto;
    overflow: hidden;
    margin: 0px auto;
}
.detailparam .name {
    width: 100%;
    overflow: hidden;
    text-indent: 28px;
    font-family: "Microsoft YaHei" !important;
    font-size: 18px;
    color: #333;
}
.detailparam .extend {
    width: 100%;
    overflow: hidden;
    background: #fafafa;
    padding-left: 15px;
}
.detailparam .extend ul {
   /* margin-top: 20px;*/
    list-style: none;
}
.detailparam .extend ul li {
    float: left;
    width: 223px;
    height: 50px;
    overflow: hidden;
    line-height: 50px;
    border-bottom: 1px dashed #e0e0e0;
}
.detailparam .extend ul li em{
    font-size:14px;
	font-family: "Microsoft YaHei" !important;
	color:#333;
	font-style:normal;
}
.detailparam .extend ul li span{
	font-size:12px;
	color:#000;
}
.mui-card-content-inner .title{
    font-size:20px;
    color:rgb(141,111,103);
}
.mui-card-content-inner .price .now{
    font-size:16px;
    color:rgb(141,111,103);
}
</style>