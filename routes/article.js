/**
  @name: 'article',
  @desc: '文章管理管理增删改查'
  @author: HeHua,
  @createDate: 2021年07月24日 10:07:16,
  @changeDate: ,
 */
const router = require('koa-router')()
const Article = require('../dbs/models/article')
const action = require('../dbs/utils')
router.prefix('/article')//前缀

// 根据标题和标签查询文章列表 查
router.get('/all', async ctx => {
  console.log(ctx.query);
  const { title,tag,pageNo,pageSize=10,sort='_id' } = ctx.query
  const total = await action.queryCount(Article,{title:new RegExp(title),tag:new RegExp(tag)})
	const data = await action.queryPage(Article,{title:new RegExp(title),tag:new RegExp(tag),pageNo,pageSize },sort);
  const res = JSON.parse(JSON.stringify(data))
  res.forEach(it =>{
    delete it.cont
  })
	ctx.body = {
    code: 200,
    success:true,
    data:{
      pageNo:parseInt(pageNo),
      pageSize,
      total,
      data:res
    }
  }
});
//获取文章归档  根据年月分类 @createTime 2021-07-06 1:21
router.get('/archives',async ctx =>{
  const yearMap = ['2021','2022','2023','2024']//定义需要查询的年份
  const monthMap = ['01','02','03','04','05','06','07','08','09','10','11','12']//定义需要查询的月份
  const list = []
  //循环年份yearMap
  for (const item of yearMap) {
    //查找年份yearMap内 属于年份的数据 不需要返回 真是返回的应该是月份数据
    const yearData = await action.query(Article,{createTime:new RegExp(item)})
    //若查询到当年年份数据后
    if(yearData.length){
      //定义查询到的年份子数据空data 用于存放月份数据 因为年份查找了 必存在月份数据
      const yearDataList = {
        year:item,
        data:[]
      }
      // console.log(`当前数据库内 ${item}年份文章`,yearData);
      // console.log('已查询到年份列表',yearDataList);
      //查找年份monthMap内 属于当前年份月份的数据
      for (const key of monthMap) {
        const month = `${item}-${key}`//定义需要查询的月份
        const monthData = await action.query(Article,{createTime:new RegExp(month)})
        monthData.length && console.log(`已查询到${month}月份数据`,monthData);
        //当月份数据长度大于0时 当前月份有数据 那么定义月份数据list插入年份list
        //删除文章内cont 因为是列表 
        // monthData.forEach(it =>{ delete it.cont })
        if(monthData.length){
          const monthDataCopy = JSON.parse(JSON.stringify(monthData))
          monthDataCopy.forEach(it =>{ delete it.cont })
          console.log(`已查询的当前monthData数据`,monthData);
          console.log(`已删除cont的monthData数据`,monthDataCopy);
          const monthDataList = {
            month,
            data:monthDataCopy
          }
          yearDataList.data.push(monthDataList)
        }
      }
      list.push(yearDataList)
    }
  }
  ctx.body = {
    code: 200,
    success:true,
    data:list
  }
})

// 根据id查询文章详情 查 每次使用该接口 浏览量+1
router.get('/byId', async ctx => {
  const { id,from='' } = ctx.query
	const res = await action.queryOne(Article,{_id:id});
  if(from==='pc'){//当前来源为前台应用时 即为用户发省浏览情况 浏览量+1
    await action.updateOne(Article,{_id:id},{viewNum:res.viewNum+1});
    res.viewNum=res.viewNum+1
  }
	ctx.body = res
});
// 新增文章
router.post('/add', async ctx => {
	const { title,viewImg,cont,tag,viewNum } =  ctx.request.body;
  const params = { title, viewImg, cont, tag, viewNum}
  await action.save(new Article(params));
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
