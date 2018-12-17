//app.js
//1:加载模块
const express = require("express");
const pool  = require("./pool");
//2:创建express对象
var app = express();
//服务器node.js 允许跨域访问配置项
//2.1:引入跨域模块   
const cors = require("cors");
//2.2:配置允许哪个程序跨域访问 脚手架   
app.use(cors({
  origin:[
    "http://127.0.0.1:3001","http://localhost:3001"],
  credentials:true
}))

//3:指定静态目录
//服务器指定目录 绝对路径 出错
app.use(express.static(__dirname+"/public"));

//4:绑定监听端口
app.listen(3000);
//功能一:学子商城首页图片轮播
//GET /imagelist   json
app.get("/imagelist",(req,res)=>{
  var obj = [
 {id:1,img_url:"http://127.0.0.1:3000/img/03.jpg"},
 {id:2,img_url:"http://127.0.0.1:3000/img/04.jpg"},
 {id:3,img_url:"http://127.0.0.1:3000/img/05.jpg"},
 {id:4,img_url:"http://127.0.0.1:3000/img/06.jpg"},
];
  res.send(obj)
});


//1.分页显示:新闻分页
app.get("/newslist",(req,res)=>{
  //1:参数  当前页码  页大小(一页显示几行数据)
  var pno = req.query.pno;            //2
  var pageSize = req.query.pageSize;  //5
  //2:sql
  //2.1:查找总记录数->转换总页数  15->3
  var sql = "SELECT count(id) as c FROM xz_news";


  var obj = {};      //保存发送客户端数据
  var progress = 0;  //进度   
  pool.query(sql,(err,result)=>{
      if(err)throw err;
      var c = Math.ceil(result[0].c/pageSize);
      obj.pageCount = c;
      progress+=50;
      if(progress==100){
        res.send(obj);
      }
  });
  //2.2:查找当前页内容           中间5行
  var sql = " SELECT id,title,img_url,ctime,point";
     sql += " FROM xz_news";
     sql += " LIMIT ?,?";
  var offset = parseInt((pno-1)*pageSize);   //计算分页偏移量
  pageSize = parseInt(pageSize)
  pool.query(sql,[offset,pageSize],(err,result)=>{
      if(err)throw err;
      //console.log(result);
      obj.data = result;
      progress+=50;
      if(progress==100){
        res.send(obj);
      }
  })
  //3:结果格式
  //res.send({code:"ok"})
});

//3.发送脚手架新闻
app.get("/newsinfo",(req,res)=>{
  var obj={
    title:"北京房价下降，白菜价",
    content:"16万/平 快买啊啊！！！"
  };
  res.send(obj);
})

//4.用户发表评论
const qs=require("querystring");
app.post("/postcomment",(req,res)=>{
  //为req对象绑定时间data  客户数据发送成功
  //触发事件
  req.on("data",(buf)=>{
    var str=buf.toString();            //将参数转字符串
    var obj=JSON.parse(str);           //将字符串转js对象
    var msg=obj.msg;                     //msg 评论内容
    var nid=parseInt(obj.nid);                       //nid:新闻的编号

    var sql="INSERT INTO xz_comment(content,user_name,ctime,nid) VALUES (?,'匿名',now(),?)";
    pool.query(sql,[msg,nid],(err,result)=>{
      if(err) throw err;
      res.send({code:1,msg:"添加成功"});
    })
  })
})

//5.用户获取指定新闻编号下的所有评论
app.get("/getComment",(req,res)=>{
  var nid=parseInt(req.query.id);   //获取指定新闻的编号

  //1:参数  当前页码  页大小(一页显示几行数据)
  var pno = req.query.pno;            
  var pageSize = req.query.pageSize;  
  //2:sql
  //2.1:查找总记录数->转换总页数
  var sql = " SELECT count(id) as c FROM xz_comment";
      sql+=" WHERE nid = ?";

  var obj = {};      //保存发送客户端数据
  var progress = 0;  //进度   
  pool.query(sql,[nid],(err,result)=>{
      if(err)throw err;
      var c = Math.ceil(result[0].c/pageSize);
      obj.pageCount = c;
      progress+=50;
      if(progress==100){
        res.send(obj);
      }
  });
  //2.2:查找当前页内容           中间5行
  var sql = " SELECT id,content,ctime,user_name";
     sql += " FROM xz_comment";
     sql += " WHERE nid = ? ";
     sql += " ORDER BY id DESC"; //降序排列
     sql += " LIMIT ?,?";
  var offset = parseInt((pno-1)*pageSize);   //计算分页偏移量
  pageSize = parseInt(pageSize)
  pool.query(sql,[nid,offset,pageSize],(err,result)=>{
      if(err)throw err;
      obj.data = result;
      progress+=50;
      if(progress==100){
        res.send(obj);
      }
  })
  //3:结果格式
  //res.send({code:"ok"})
});

//6.返回商品的详细信息
app.get("/goodsinfo",(req,res)=>{
  var id=req.query.id;
  var obj=[
    {id:1,title:"Sky Love / 摩天之恋",img_url:"http://127.0.0.1:3000/img2/1-1.jpg",old:"8200",now:"6780-27800"},
    {id:2,title:"Love Cube / 爱立方",img_url:"http://127.0.0.1:3000/img2/2-1.jpg",old:"53800",now:"28800-56800"},
    {id:3,title:"Heartbeat / 心动",img_url:"http://127.0.0.1:3000/img2/3-1.jpg",old:"4800",now:"3600-16800"},
    {id:4,title:"Stare / 凝望",img_url:"http://127.0.0.1:3000/img2/4-1.jpg",old:"8800",now:"6800-28800"},
    {id:5,title:"Wing / 羽翼",img_url:"http://127.0.0.1:3000/img2/5-1.jpg",old:"8800",now:"6600-15500"},
    {id:6,title:"Adore / 倾心",img_url:"http://127.0.0.1:3000/img2/6-1.jpg",old:"5600",now:"3800-14400"},
    {id:7,title:"Twilight goddess / 曙光女神",img_url:"http://127.0.0.1:3000/img2/7-1.jpg",old:"9800",now:"7600-30000"},
    {id:8,title:"Sway / 摇曳",img_url:"http://127.0.0.1:3000/img2/8-1.jpg",old:"6800",now:"4258-22000"},
    {id:9,title:"Streamer / 流光",img_url:"http://127.0.0.1:3000/img2/9-1.jpg",old:"16999",now:"12999"}
  ];
  res.send(obj);
});
app.get("/imagelist1",(req,res)=>{
  var obj = [
    {id:1,img_url:"http://127.0.0.1:3000/img2/pj1.jpg"},
    {id:2,img_url:"http://127.0.0.1:3000/img2/pj2.jpg"},
    {id:3,img_url:"http://127.0.0.1:3000/img2/pj3.jpg"},
    {id:4,img_url:"http://127.0.0.1:3000/img2/pj4.jpg"},
    {id:5,img_url:"http://127.0.0.1:3000/img2/pj5.jpg"},
    {id:6,img_url:"http://127.0.0.1:3000/img2/pj6.jpg"},
    {id:7,img_url:"http://127.0.0.1:3000/img2/pj7.jpg"},
    {id:8,img_url:"http://127.0.0.1:3000/img2/pj8.jpg"},
    {id:9,img_url:"http://127.0.0.1:3000/img2/pj9.jpg"},
   ];
     res.send(obj)
});

//7.购物车数据列表
app.get("/shopCart",(req,res)=>{
  var obj=[];
  obj.push({id:1,title:"华为P10",price:3999,count:2})
  obj.push({id:2,title:"华为P11",price:4999,count:1})
  obj.push({id:3,title:"华为P12",price:5999,count:1})
  res.send(obj);
})



//8.将商品信息添加至购物车
//INSERT INTO xz_cart VALUES();
app.get("/addCart",(req,res)=>{
  //1.参数 ：id count
    //1.1:获取参数
    var pid=req.query.pid;
    var count=req.query.count;
    //1.2：创建正则表达式验证  一定要
    var reg=/^[0-9]{1,}$/;                             //正则表达式     
    if(!reg.test(pid)){                                //如果参数验证失败
      res.send({code:-1,msg:"商品编号参数有误"});
      return ;                                         //输出错误信息并停止
    }if(!reg.test(count)){
      res.send({code:-2,msg:"商品数量参数有误"});
      return ;
    }
    //所有用户参数都要验证   第一次js  第二次node.js    安全
    //1.3:如果验证失败返回
  //2.连接数据库
  //3.返回成功值
    res.send({code:1,msg:"添加成功"});
})

//9.登录
app.get("/login",(req,res)=>{
  //1:参数 2 uname upwd
  var uname = req.query.uname;
  var upwd = req.query.upwd;
  //2:正则表达式验证 
  //3:sql 
  var sql = " SELECT count(id) as c FROM xz_user1";
      sql +=" WHERE uname=? AND upwd = ?";
  pool.query(sql,[uname,upwd],(err,result)=>{
        if(err)throw err;
        if(result[0].c==0){
          res.send({code:-1,msg:"用户名或密码错误"});
        }else{
          res.send({code:1,msg:"登录成功"});
        }
  })
});
  //10.商品列表
  app.get("/goodslist",(req,res)=>{
      var obj=[
          {id:1,img_url:"http://127.0.0.1:3000/img/1.jpg",title:"Sky Love / 摩天之恋",now:"6780-27800",old:"8200",q:20},
          {id:2,img_url:"http://127.0.0.1:3000/img/2.jpg",title:"Love cube / 爱立方",now:"28800-56800",old:"53800",q:11},
          {id:3,img_url:"http://127.0.0.1:3000/img/3.jpg",title:"Heartbeat 心动",now:"3600-16800",old:"4800",q:1},
          {id:4,img_url:"http://127.0.0.1:3000/img/4.jpg",title:"Stare 凝望",now:"6800-28800",old:"8800",q:12},
          {id:5,img_url:"http://127.0.0.1:3000/img/5.jpg",title:"Wing 羽翼",now:"6600-15500",old:"5600",q:2},
          {id:6,img_url:"http://127.0.0.1:3000/img/6.jpg",title:"Adore 倾心",now:"3800-14400",old:"9800",q:9},
          {id:7,img_url:"http://127.0.0.1:3000/img/7.jpg",title:"Twilight goddess 曙光女神",now:"7600-30000",q:5},
          {id:8,img_url:"http://127.0.0.1:3000/img/8.jpg",title:"Sway 摇曳",now:"4258-22000",old:"6800",q:10},
          {id:9,img_url:"http://127.0.0.1:3000/img/9.jpg",title:"Streamer 流光",now:"12999",old:"16999",q:11}
        ];
  res.send(obj);
})

//11.商品描述
app.get("/prodesc",(req,res)=>{
  var obj=[
    {id:1,title:"Sky Love / 摩天之恋",pid:"DB0128",cz:"18K金",ct:"0.3CT-0.8CT克拉",color:"H"},
    {id:2,title:"Love Cube / 爱立方",pid:"DB0139",cz:"18K金",ct:"1.0CT-1.5CT克拉",color:"F"},
    {id:3,title:"Heartbeat / 心动",pid:"DB0108",cz:"18K金",ct:"0.20CT-0.50CT克拉",color:"I"},
    {id:4,title:"Stare / 凝望",pid:"DB0028",cz:"18K金",ct:"0.30CT-0.80CT克拉",color:"H"},
    {id:5,title:"Wing / 羽翼",pid:"DB0136",cz:"18K金",ct:"0.30CT-0.50CT克拉",color:"I"},
    {id:6,title:"Adore / 倾心",pid:"DB00002",cz:"18K金",ct:"0.20CT-0.50CT克拉",color:"I"},
    {id:7,title:"Twilight goddess / 曙光女神",pid:"DB0179",cz:"18K金",ct:"0.40CT-0.80CT克拉",color:"I"},
    {id:8,title:"Sway / 摇曳",pid:"DB0135",cz:"18K金",ct:"0.25CT-0.60CT克拉",color:"I"},
    {id:9,title:"Streamer 流光",pid:"DB0068",cz:"18K金",ct:"0.50CT克拉",color:"H"},
  ];
  res.send(obj);
})

