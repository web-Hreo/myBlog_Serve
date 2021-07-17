const router = require('koa-router')()
const User = require('../dbs/models/user')
const action = require('../dbs/utils')
// import { query } from '../../utils/mongo-query.js';
router.prefix('/user')//前缀

router.get('/', function (ctx, next) {
  ctx.body = 'this is a user response!'
})

// 获取用户表
router.get('/getUser', async ctx => {
	const res = await action.query(User);
	ctx.body = {
		status: 200,
		results: res,
	};
});
// 新增用户
router.post('/addUser', async ctx => {
	const res = ctx.request.body;
	const { userName = '', passWord = null } = res;
	if(userName && passWord) {
		const user = new User({	userName,	passWord,	});
		const res = await action.save(user);
		ctx.body = {
			status: 200,
			results: res,
		};
	}
});

router.post('/login', async ctx => {
	const res = ctx.request.body;
	const { userName = '', passWord = '' } = res;
  console.log('userName',userName)
  console.log('passWord',passWord)
	if(userName && passWord) {
		// const user = new User();
	  const result = 	await action.queryOne(User,{userName,passWord});
    if(result){
      ctx.body = {
        status: 200,
        success:true,
        results: {
          token:'jdsahshfewbuer'
        },
      };
    }else{
      ctx.status = 500
      ctx.body = {
        status: 500,
        success:false,
        results: '账号或密码错误',
      };
    }
	}else{
    ctx.body = {
			status: 500,
      success:false,
			results: '请输入账号密码',
		};
  }
});

module.exports = router
