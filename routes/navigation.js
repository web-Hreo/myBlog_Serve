/**
  @name: 'navigation',
  @desc: '学习资源管理增删改查'
  @author: HeHua,
  @createDate: 2021年07月24日 10:08:28,
  @changeDate: ,
 */
const router = require('koa-router')()
const Navigation = require('../dbs/models/navigation')
const NavigationTag = require('../dbs/models/navigationTag')
const action = require('../dbs/utils')
router.prefix('/navigation')//前缀

// 获取所有学习资源信息 包含tag和内容
router.get('/getNavigation', async ctx => {
	const res = await action.query(NavigationTag);
  const data = JSON.parse(JSON.stringify(res))
  for (const item of data) {
    const navigationItem =  await action.query(Navigation,{navigationTag:item.name})
    item.children = navigationItem?navigationItem:[]
  }
  ctx.body = {
    code: 200,
    success:true,
    data
  }
});
// 获取所有学习资源类型信息
router.get('/getTag', async ctx => {
	const res = await action.query(NavigationTag);
	ctx.body = {
    code: 200,
    success:true,
    data:res
  }
});

// 新增学习资源类型
router.post('/addTag', async ctx => {
	const { name } = ctx.request.body;
  await action.save(new NavigationTag({name}));
  ctx.body = {
    code: 200,
    success:true
  };
});
// 编辑学习资源类型
router.post('/updateTag', async ctx => {
	const { _id,name } = ctx.request.body;
  await action.updateOne(NavigationTag,{_id},{name});
  ctx.body = {
    code: 200,
    success:true
  };
});
// 删除学习资源类型
router.post('/deleteTag', async ctx => {
	const { _id } = ctx.request.body;
		await action.deleteOne(NavigationTag, { _id});
		ctx.body = {
			code: 200,
			success: true,
		}
});


// 根据类型获取学习资源
router.get('/ByTag', async ctx => {
  const { navigationTag='' } = ctx.query
	const res = await action.query(Navigation,{navigationTag:new RegExp(navigationTag)});
	ctx.body = {
    code: 200,
    success:true,
    data:res
  }
});
// 根据类型新增学习资源
router.post('/ByTag', async ctx => {
	const { navigationTag,title,desc,imgSrc,url } = ctx.request.body;
  await action.save(new Navigation({navigationTag,title,desc,imgSrc,url}));
	ctx.body = {
    code: 200,
    success:true,
  }
});
// 编辑学习资源
router.post('/updateByTag', async ctx => {
	const { _id,navigationTag,title,desc,imgSrc,url } = ctx.request.body;
  await action.updateOne(Navigation,{_id},{navigationTag,title,desc,imgSrc,url});
  ctx.body = {
    code: 200,
    success:true
  };
});
// 删除学习资源
router.post('/deleteByTag', async ctx => {
	const { _id } = ctx.request.body;
		await action.deleteOne(Navigation, { _id});
		ctx.body = {
			code: 200,
			success: true,
		}
});

module.exports = router
