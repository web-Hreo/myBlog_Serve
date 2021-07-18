//文章管理管理增删改查
const router = require('koa-router')()
const Project = require('../dbs/models/project')
const action = require('../dbs/utils')
router.prefix('/project')//前缀

// 查询所有项目列表 查
router.get('/all', async ctx => {
  console.log(ctx.query);
	const res = await action.query(Project);
	ctx.body = res
});

// 新增项目
router.post('/add', async ctx => {
	const { name,title,imgSrc,href } =  ctx.request.body;
  const params = {
    name,
    title,
    imgSrc,
    href,
    createTime: Date.now(),
    changeTime: Date.now(),
  }
  await action.save(new Project(params));
  ctx.body = {
    code: 200,
    success:true
  };
});
// 编辑项目
router.post('/update', async ctx => {
	const { _id,name,title,imgSrc,href } =  ctx.request.body;
  await action.updateOne(Project,{_id},{name,title,imgSrc,href });
  ctx.body = {
    code: 200,
    success:true
  };
});

// 根据id删除项目
router.post('/delete', async ctx => {
	const { _id } = ctx.request.body;
		await action.deleteOne(Project, { _id});
		ctx.body = {
			code: 200,
			success: true,
		}
});

module.exports = router
