<template>
   <div class="app=testContainer">
    <h1>testContainer.vue</h1>
    <h1>生命周期</h1>
    <h1>当前vue实例创建后自动触发事件</h1>
    <h1>事件调用一些函数(钩子函数)</h1>
     <input type="button" value="修改" @click="msg='ok'">
     <p id="h3">{{msg}}</p>

   </div>
</template>
<script>
    export default {
        data(){
            return {
                msg:"脚手架"
            }
        },
        methods:{
            show(){
                console.log("执行 show 方法")
            }
        },
        beforeCreate(){
            //生命周期第一个函数，实例被创建'之前'，会执行
            //注意：在执行函数的时候，data和methods还没有初始化，不能调用函数
            //console.log(this.msg);  //undefined
            //this.show();//报错
        },
        created(){
            //生命周期第二个函数，实例被创建'之后'
            //注意：执行函数的时候，data和methods已经初始化好了
            //最早要来操作data和methods 就在此函数内
            //console.log(this.msg);
            //this.show();
        },
        beforeMount(){
            //生命周期第三个函数，模板已经在内存中编辑完成，但是尚未把模板渲染整个页面
            //var h3=document.getElementById("h3");
            // console.log(h3);   //报错
            // console.log(h3.innerText)  //报错
        },
        mounted(){
             //生命周期第四个函数，模板已经在内存中编辑完成，而且已经把模板渲染整个页面
             //mounted 实例创建最后一个生命周期函数，
             //当执行完mounted表示实例已经完全创建好了
             //如果没有其他操作，静静躺在内存中一动不动
             // var h3=document.getElementById("h3");
             //console.log("4:"+h3.innerText)
        },
        beforeUpdate(){
            //当执行beforeUpdate 页面中显示数据旧
            //此时                    data数据新
            console.log("5:内存中DATA变量："+this.msg);
            var h3=document.getElementById("h3");
            console.log("5:模板中数据："+h3.innerText);
        },
        updated(){
            console.log("6:内存中DATA变量："+this.msg);
            var h3=document.getElementById("h3");
            console.log("6:模板中数据："+h3.innerText);
        }
    }
</script>
<style>
    
</style>