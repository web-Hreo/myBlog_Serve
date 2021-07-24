/**
  @name: 'tags',
  @desc: '标签管理增删改查'
  @author: HeHua,
  @createDate: 2021年07月24日 10:09:15,
  @changeDate: ,
 */
const router = require('koa-router')()
const Tags = require('../dbs/models/tags')
const action = require('../dbs/utils')
router.prefix('/tags')//前缀

// 获取所有标签信息 查
router.get('/all', async ctx => {
	const res = await action.query(Tags);
	ctx.body = {
    code: 200,
    success:true,
    data:res
  }
});
// 新增标签
router.post('/set', async ctx => {
	const { name = '', } = ctx.request.body;
  await action.save(new Tags({name}));
  ctx.body = {
    code: 200,
    success:true
  };
});
// 编辑标签
router.post('/update', async ctx => {
	const { _id = '',name } = ctx.request.body;
  await action.updateOne(Tags,{_id},{name});
  ctx.body = {
    code: 200,
    success:true
  };
});

// 删除标签
router.post('/delete', async ctx => {
	const { _id } = ctx.request.body;
		await action.deleteOne(Tags, { _id});
		ctx.body = {
			code: 200,
			success: true,
		}
});

module.exports = router
