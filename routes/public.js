/**
  @name: 'public',
  @desc: '公共接口'
  @author: HeHua,
  @createDate: 2021年07月24日 10:08:55,
  @changeDate: ,
 */
const router = require('koa-router')()
const Article = require('../dbs/models/article')
const Tags = require('../dbs/models/tags')
const Mood = require('../dbs/models/mood')
const action = require('../dbs/utils')
router.prefix('/public')//前缀


//获取文章和标签、日志的长度
router.get('/length', async ctx => {
  const article_length = await action.queryCount(Article)
  const tags_length = await action.queryCount(Tags)
  const mood_length = await action.queryCount(Mood)
	ctx.body = {
    code: 200,
    success:true,
    data:{ article_length,tags_length,mood_length }
  }
});

module.exports = router
