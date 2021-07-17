const router = require('koa-router')()
const User = require('../dbs/models/user')
const UserInfo = require('../dbs/models/userInfo')
const action = require('../dbs/utils')
router.prefix('/user')//前缀
//登录
router.post('/login', async ctx => {
	const res = ctx.request.body;
	const { userName = '', passWord = '' } = res;
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

module.exports = router
