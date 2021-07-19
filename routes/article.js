//文章管理管理增删改查
const router = require('koa-router')()
const Article = require('../dbs/models/article')
const action = require('../dbs/utils')
router.prefix('/article')//前缀

// 根据标题和标签查询文章列表 查
router.get('/all', async ctx => {
  console.log(ctx.query);
  const { title,tag,pageNo,pageSize=10 } = ctx.query
  const total = await action.queryCount(Article,{title:new RegExp(title),tag:new RegExp(tag)})
	const data = await action.queryPage(Article,{title:new RegExp(title),tag:new RegExp(tag),pageNo,pageSize });
	ctx.body = {
    code: 200,
    success:true,
    data:{
      pageNo:parseInt(pageNo),
      pageSize,
      total,
      data
    }
  }
});
// 根据id查询文章详情 查
router.get('/byId', async ctx => {
  const { id } = ctx.query
	const res = await action.queryOne(Article,{_id:id});
	ctx.body = res
});
// 新增文章
router.post('/add', async ctx => {
	const { title,viewImg,cont,tag,viewNum } =  ctx.request.body;
  const params = {
    title,
    viewImg,
    cont,
    tag,
    viewNum,
    createTime: Date.now(),
    changeTime: Date.now(),
  }
  const res = await action.save(new Article(params));
  ctx.body = {
    code: 200,
    success:true
  };
});
// 编辑文章
router.post('/update', async ctx => {
	const { id,title,viewImg,cont,tag,viewNum } =  ctx.request.body;
  console.log(id);
  await action.updateOne(Article,{_id:id},{title,viewImg,cont,tag,viewNum});
  ctx.body = {
    code: 200,
    success:true
  };
});

// 根据id删除文章
router.post('/delete', async ctx => {
	const { id } = ctx.request.body;
		await action.deleteOne(Article, { _id:id});
		ctx.body = {
			code: 200,
			success: true,
		}
});

module.exports = router
