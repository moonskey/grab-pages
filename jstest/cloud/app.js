// 在 Cloud code 里初始化 Express 框架
var express = require('express');
var app = express();
var DetailInfo = AV.Object.extend("DetailInfo");
// App 全局配置
app.set('views','cloud/views');   // 设置模板目录
app.set('view engine', 'ejs');    // 设置 template 引擎
app.use(express.bodyParser());    // 读取请求 body 的中间件

// 使用 Express 路由 API 服务 /hello 的 HTTP GET 请求
app.get('/hello', function(req, res) {
  res.render('hello', { message: 'Congrats, you just set up your app!' });
});
app.get('/api/1/tours/:channel_id', function (req, res) {
    //res.render('hello', { message: 'Congrats, you just set up your app!' });
    var query = new AV.Query(DetailInfo),
        source = req.params.channel_id;
    query.equalTo('source', source);
    query.limit(req.query.limit);
    query.skip(req.query.skip);
    query.find().then(function (results) {
        res.send(results);
    }, function (err) {
        res.error(err);
    })
});
// 最后，必须有这行代码来使 express 响应 HTTP 请求
app.listen();
