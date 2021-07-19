//友链管理增删改查
const router = require('koa-router')()
const Links = require('../dbs/models/links')
const action = require('../dbs/utils')
router.prefix('/links')//前缀

// 获取所有友链信息 查 
router.get('/all', async ctx => {
  const { title,pageNo=1,pageSize=10 } = ctx.query
  const total = await action.queryCount(Links,{title:new RegExp(title)})
  const guestNum = await action.queryCount(Links,{type:'常客'})
  const friendNum = await action.queryCount(Links,{type:'亲友'})
  const closeNum = await action.queryCount(Links,{type:'失联'})
	const data = await action.queryPage(Links,{title:new RegExp(title),pageNo,pageSize});
  ctx.body = {
    code: 200,
    success:true,
    data:{
      pageNo:parseInt(pageNo),
      pageSize,
      total,
      guestNum,
      friendNum,
      closeNum,
      data
    }
  }
});
// 新增友链
router.post('/set', async ctx => {
	const { title,desc,type,avatar,url } = ctx.request.body;
  const params = { title,desc,type,avatar,url}
  await action.save(new Links(params));
  ctx.body = {
    code: 200,
    success:true
  };
});
// 编辑友链
router.post('/update', async ctx => {
	const { _id,title,desc,type,avatar,url } = ctx.request.body;
  await action.updateOne(Links,{_id},{title,desc,type,avatar,url});
  ctx.body = {
    code: 200,
    success:true
  };
});

// 删除友链
router.post('/delete', async ctx => {
	const { _id } = ctx.request.body;
		await action.deleteOne(Links, { _id});
		ctx.body = {
			code: 200,
			success: true,
		}
});

module.exports = router
