<template>
    <div class="app-goodslist">
        <div class="goods-item" v-for="item in list " :key="item.id">
            <img :src="item.img_url" @click="getDetail(item.id)" class="image">
            <p class="title">{{item.title}}</p>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{item.now}}</span>
                    <span class="old">￥{{item.old}}</span>
                </p>
                <p class="sell">
                    <span>已售出 {{item.q}}</span>
                    <span>&nbsp;&nbsp;</span>
                    <span><img src="http://127.0.0.1:3000/img/tj.png"></span>
                </p>
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
            getDetail(id){
                //console.log(id);
                this.$router.push("/home/goodsinfo/"+id);
            },
            getGoodslist(){
                 var url="http://127.0.0.1:3000/goodslist"
                 this.$http.get(url).then(result=>{
                     this.list=result.body;
                 })
            }
        },
        created(){
		   this. getGoodslist();
	   }
    }
</script>
<style>
    .mint-header{
        background-color:#666 !important; 
    }
    .app-goodslist{
        display:flex;                       /*最外层设置弹性布局 */
        flex-wrap:wrap;                     /*子元素换行 */
        justify-content:space-between;      /*两端对齐 */
        padding:7px;                        /*设置内边距 */
    }
    .app-goodslist .goods-item{
        width:49%;                           /*元素宽度 */
        border:1px solid #ccc;               /*边框 */
        box-shadow:0 0 8px #ccc;             /*阴影 */
        margin:2px 0;                   
        padding:2px;
        display:flex;                        /*弹性布局 */
        flex-direction:column;               /*垂直布局 */
        justify-content:space-between;       /*两端对齐 */
        min-height:293px;                    /*最小高度 */
    }
    .app-goodslist .goods-item p{
        color:rgb(141,111,103);
    }
    .app-goodslist .goods-item .title{
        font-size:14px;
    }
    .app-goodslist .goods-item .image{
        width:100%;
    }
    .app-goodslist .goods-item .now{
        color:rgb(141,111,103);
        font-weight:bold;
        font-size:16px;
    }
    .app-goodslist .goods-item .old{
        font-size:12px;
        text-decoration:line-through;
        margin-left:5px;
    }
</style>