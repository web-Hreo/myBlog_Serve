const router = require('koa-router')()

const Person = require('../dbs/models/person')//实例化表
const action = require('../dbs/utils')//实例化表
// import { query } from '../../utils/mongo-query.js';
router.prefix('/user')//前缀

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = {
    status: 200,
    data:{ name:'张三', age:18 }
  }
})

// 查询数据
router.get('/getPerson', async ctx => {
	const res = await action.query(Person);
	ctx.body = {
		status: 200,
		results: res,
	};
});
// 保存数据
router.post('/addPerson', async ctx => {
	const res = ctx.request.body;
	const { name = '', age = null } = res;
	if(name && age) {
		const person = new Person({	name,	age,	});
		const res = await action.save(person);
		ctx.body = {
			status: 200,
			results: res,
		};
	}
});
// 更新数据
router.post('/update', async ctx => {
	const res = ctx.request.body;
	const { name = '', age = null, _id } = res;
  if(_id){
    if(name && age) {
      // 更新符合条件的所有数据
      // const res = await update(DemoModal, { name }, { age });
      // 更新单条数据
      const res = await action.updateOne(Person, { _id }, { name,age });
      ctx.body = {
        success:true,
        status: 200,
        results: res,
      };
    }
  }else{
    ctx.body = {
      success:false,
      status: 500,
      results: '请传入id',
    };
  }

});

// 删除
router.del('/deletePer', async ctx => {
	const res = ctx.request.body;
	const { _id } = res;
	if(_id) {
    // 根据id删除数据
		const res = await action.deleteOne(Person, { _id});
		ctx.body = {
			status: 200,
			success: true,
		};
	}else{
    ctx.body = {
      success:false,
      status: 500,
      results: '请传入_id',
    };
  }
});

module.exports = router
