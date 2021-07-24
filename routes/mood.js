/**
  @name: 'mood',
  @desc: '日志增删改查'
  @author: HeHua,
  @createDate: 2021年07月24日 10:08:14,
  @changeDate: ,
 */
const router = require('koa-router')()
const Mood = require('../dbs/models/mood')
const action = require('../dbs/utils')
router.prefix('/mood')//前缀

// 获取所有标签信息 查
router.get('/all', async ctx => {
	const res = await action.query(Mood);
	ctx.body = {
    code: 200,
    success:true,
    data:res
  }
});
// 新增标签
router.post('/set', async ctx => {
	const { cont } = ctx.request.body;
  await action.save(new Mood({cont}));
  ctx.body = {
    code: 200,
    success:true
  };
});
// 编辑标签
router.post('/update', async ctx => {
	const { _id,cont } = ctx.request.body;
  await action.updateOne(Mood,{_id},{cont});
  ctx.body = {
    code: 200,
    success:true
  };
});

// 删除标签
router.post('/delete', async ctx => {
	const { _id } = ctx.request.body;
		await action.deleteOne(Mood, { _id});
		ctx.body = {
			code: 200,
			success: true,
		}
});

module.exports = router
