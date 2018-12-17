<template>
    <div class="app-list">
        <h1>用户列表</h1>
        <ul>
            <li v-for="item in list">
                {{item.id}}:{{item.name}}:{{item.age}}
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                list:[
                    {id:1,name:"tom",age:24},
                    {id:2,name:"john",age:20}
                ]
            }
        }
    }
</script>
<style>
    
</style>