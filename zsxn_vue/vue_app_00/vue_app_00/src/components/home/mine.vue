<template>
    <div class="app-mine">
			<div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner mine1">
						<img src="http://127.0.0.1:3000/img2/1-1.jpg" />
					</div>
				</div>
			</div>
			<div class="mui-card">
				<div class="mui-card-header mine2">全部订单</div>
				<div class="mui-card-header">我的钱包</div>
			</div>
            <div class="mui-card">
				<div class="mui-card-header">我的收货地址</div>
				<div class="mui-card-header">宝贝收藏</div>
                <div class="mui-card-header">我的购物车</div>
			</div>
            <div class="mui-card">
				<div class="mui-card-header">设置</div>
				<div class="mui-card-header">在线客服</div>
			</div>
    </div>
</template>
<script>
    export default {
        data(){
            return {};
        }
    }
</script>
<style>
  .mine1{
  background:url(../../img/bg.jpg)  repeat;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.mine1 img{
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border:3px solid rgba(0,0,0,.3);
}
.mui-card-header{
    font-size:15px !important;
    color:rgb(141,111,103);
}
</style>