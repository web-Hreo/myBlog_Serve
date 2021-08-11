const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa2-cors')
//操作数据库我们需要这样，引入这两个模块哦
const mongoose = require('mongoose')
const dbConfig = require('./dbs/config')

const user = require('./routes/user')
const tags = require('./routes/tags')
const article = require('./routes/article')
const file = require('./routes/file')
const project = require('./routes/project')
const links = require('./routes/links')
const navigation = require('./routes/navigation')
const mood = require('./routes/mood')
const public = require('./routes/public')
const comment = require('./routes/comment')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
app.use(views(__dirname + '/views', {
  extension: 'pug'
}))
app.use(cors({
  origin: function (ctx) {
    const whiteList = ['http://www.heblogs.cn','http://admin.heblogs.cn','http://localhost:8080','http://localhost:3001']; //可跨域白名单
    let url = ctx.header.origin;
    if(whiteList.includes(url)){
        return url //注意，这里域名末尾不能带/，否则不成功，所以在之前我把/通过substr干掉了
    }
      return "http://localhost:3001"; // 默认本地
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: false, // 当设置成允许请求携带cookie时，需要保证"Access-Control-Allow-Origin"是服务器有的域名，而不能是"*";
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))

// routes
app.use(user.routes(), user.allowedMethods())
app.use(tags.routes(), tags.allowedMethods())
app.use(article.routes(), article.allowedMethods())
app.use(file.routes(), file.allowedMethods())
app.use(project.routes(), project.allowedMethods())
app.use(links.routes(), links.allowedMethods())
app.use(navigation.routes(), navigation.allowedMethods())
app.use(mood.routes(), mood.allowedMethods())
app.use(public.routes(), public.allowedMethods())
app.use(comment.routes(), comment.allowedMethods())

//mongoose
mongoose.connect(dbConfig.dbs,{
  useNewUrlParser:true
})

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
