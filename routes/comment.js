/**
  @name: 'message',
  @desc: '留言板回复'
  @author: HeHua,
  @createDate: 2021年07月24日 11:00:36,
  @changeDate: ,
 */
const router = require('koa-router')()
const FriendInfo = require('../dbs/models/friendInfo')
const Comment = require('../dbs/models/comment')
const action = require('../dbs/utils')
router.prefix('/comment')//前缀


// 获取留言用户信息
router.get('/friendInfo', async ctx => {
	const res = await action.query(FriendInfo);
	ctx.body = {
    code: 200,
    success:true,
    data:res
  }
});

//留言
/**
 * @param {来源 应为 article/mood/comment} from 
 * @param {来源id 当from为article/mood时 需要该参数} fromId
 * @param {来源ip} fromIp
 * @param {是否为博主 默认不是  不需要传} isMaster
 * @param {留言者名字} leavingName
 * @param {留言者邮箱} leavingEmail
 * @param {留言者头像} leavingAvatar
 * @param {留言者输入内容} leavingCont
 * @param {留言者可访问网站} leavingUrl
 * 
 * @param {留言id 无需用户传 会自己生成} commentId
 * @param {父级留言id 默认为0 如果回复他人传他人id做为父id} parentId
 * @param {回复层级 默认0为留言 1为1级回复 2为2级回复} replyLevel
 * @param {他人名称 当replyLevel不为0时 回复他人必传} replyName
 */
router.post('/', async ctx => {
	let {
    from,fromId,fromIp,isMaster=false,
    leavingName,leavingEmail,leavingAvatar,leavingCont,leavingUrl,
    parentId=0,replyLevel=0,replyName=''
  } = ctx.request.body;
  //如果为leavingName该名称 则开启博主金标
  if(leavingName==='/*h*/'){
    isMaster = true,
    leavingName = '何华'
  }
  //生成时间戳
  const dateNow = Date.now()
  console.log('fromIp',fromIp)
  //查询当前用户在库内最后一条留言
  const currentIpList = await action.queryPage(Comment,{fromIp,pageNo:1,pageSize:1})
  console.log('currentIpList',currentIpList)
  let differ = 11
  if(currentIpList.length>0){
    differ = parseInt((parseInt(dateNow) - parseInt(currentIpList[0].dateNow)) / 1000).toFixed(0)
  }
  console.log('differ',differ)
  if(!differ || differ<10){
    ctx.body = {
      code: 200,
      success:false,
      data:'留言相差时间应不小于10s'
    }
  }else{
    //查询当前用户在库内是否存在
    const friend = await action.queryOne(FriendInfo,{leavingName,leavingEmail})
    //用户不存在即入库 方便后期回复他人操作查找
    !friend && await action.save(new FriendInfo({leavingName,leavingEmail,leavingAvatar}))
    //查找留言库 数据长度生成id
    const length = await action.queryCount(Comment)
    //生成params 存进留言数据库
    const params = {
      from,fromId,fromIp,isMaster,
      leavingName,leavingEmail,leavingAvatar,leavingCont,leavingUrl,
      commentId:length+1, parentId,replyLevel,replyName,dateNow
    }
    await action.save(new Comment(params))
    ctx.body = {
      code: 200,
      success:true,
    }
  }

});

/**
 * @param {来源 应为 article/mood/comment} from 
 * @param {来源id 当from为article/mood时 需要该参数} fromId
 */
router.get('/', async ctx => {
  const { from,fromId='' } = ctx.query
  console.log(from,fromId);
  const length = await action.queryCount(Comment,{from,fromId});
	const res = await action.query(Comment,{from,fromId,replyLevel:0});
  const data = JSON.parse(JSON.stringify(res))
  for (const item of data) {
	  const result = await action.query(Comment,{from,fromId,parentId:item.commentId});
    item.children = result
  }
	ctx.body = {
    code: 200,
    success:true,
    data:{
      length,
      data
    }
  }
});
// 获取所有留言信息
router.get('/all', async ctx => {
	const res = await action.query(Comment);
	ctx.body = {
    code: 200,
    success:true,
    data:res
  }
});

module.exports = router
