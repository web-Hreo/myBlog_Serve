const router = require('koa-router')()
const User = require('../dbs/models/user')
const UserInfo = require('../dbs/models/userInfo')
const UserDesc = require('../dbs/models/userDesc')
const action = require('../dbs/utils')
router.prefix('/user')//前缀
//登录
router.post('/login', async ctx => {
	const { userName = '', passWord = '' } = ctx.request.body
	if(userName && passWord) {
	  const result = 	await action.queryOne(User,{userName,passWord});
    if(result){
      const userInfo = 	await action.queryOne(UserInfo,{userId:result.userId});
      ctx.body = {
        code: 200,
        success:true,
        results: {
          token:"Authorization:0.6544986551972392",
          user:userInfo
        },
      };
    }else{
      ctx.body = {
        code: 500,
        success:false,
        results: '账号或密码错误',
      };
    }
	}else{
    ctx.body = {
			code: 500,
      success:false,
			results: '请输入账号密码',
		};
  }
});
//设置用户账号密码
router.post('/addUser', async ctx => {
	const { userName,passWord,userId} = ctx.request.body
  await action.save(User,{ userName,passWord,userId });
  ctx.body = {
    code: 200,
    success:true,
    data:'账户新增成功'
  };
});
//设置用户用户信息
router.post('/addUserInfo', async ctx => {
	const { address,name,avatar,userId } = ctx.request.body
  await action.save(UserInfo,{  address,name,avatar,userId });
  ctx.body = {
    code: 200,
    success:true,
  };
});
//更改用户账号密码
router.post('/updateUser', async ctx => {
	const { userName,passWord,userId} = ctx.request.body
  await action.updateOne(User,{ userId },{userName,passWord});
  ctx.body = {
    code: 200,
    success:true,
    data:'账户新增成功'
  };
});
//获取个人中心 这里只查到userId为1的数据  只查询我自己的数据
router.get('/desc', async ctx => {
  const res = await action.query(UserDesc);
  const heHuaArr = res.find(it =>it.userId===1)
	ctx.body = {
    code: 200,
    success:true,
    data:heHuaArr.desc
  }
});
//设置个人中心 只设置userId为1的数据
router.post('/desc', async ctx => {
	const { desc } = ctx.request.body
  //去集合内查找当前id用户的desc 若查到 修改  未查到 新增
  const res = await action.queryOne(UserDesc,{userId:1});
  if(res){
    await action.updateOne(UserDesc,{userId:1},{desc});
  }else{
    await action.save(new UserDesc({userId:1,desc}));
  }
  ctx.body = {
    code: 200,
    success:true,
  };
});

module.exports = router
