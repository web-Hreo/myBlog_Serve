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
const email = require('../config/sendEmail'); //引入封装好的函数
const axios = require('axios');
router.prefix('/comment')//前缀
const key = 'BBFBZ-TMFE4-2Z4UK-XB6ID-K7XJZ-ONBGJ'
const xssList = [//恶意评论列表
  '<div>','<img>','<iframe>','<>','console.log','xss',
  '</','document','cookie','javascript','<script>','text/javascript',
  'and','END','exec','EXEC','insert','INSERT','select','SELECT',
  'delete','DELETE','update','UPDATE','import','IMPORT','query','QUERY',
  'java','php','JAVA','PHP','COOKIE','LOG','log'
]


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
 * @param { 当层级为2时 会传来LV2Id 2级回复id } LV2Id
 * @param {留言id 无需用户传 会自己生成} commentId
 * @param {父级留言id 默认为0 如果回复他人传他人id做为父id} parentId
 * @param {回复层级 默认0为留言 1为1级回复 2为2级回复} replyLevel
 * @param {他人名称 当replyLevel不为0时 回复他人必传} replyName
 */
router.post('/', async ctx => {
	let {
    from,fromId,fromIp,isMaster=false,
    leavingName,leavingEmail,leavingAvatar,leavingCont,leavingUrl,
    LV2Id=null,parentId=0,replyLevel=0,replyName=''
  } = ctx.request.body;
  const Xss = checkXss(leavingCont)
  if(Xss){
    console.log('checkXss',Xss);
    ctx.body = Xss
  }else{
    const apiUrl = `https://apis.map.qq.com/ws/location/v1/ip?key=${key}&ip=${fromIp}&output=json`
    const {data} = await axios.get(apiUrl)
    if(data.status==0){
      //如果为leavingName该名称 则开启博主金标
      if(leavingName==='/*h*/'){
        isMaster = true,
        leavingName = '何华'
        leavingAvatar ='http://q.qlogo.cn/headimg_dl?dst_uin=1194150512@qq.com&spec=100'
        leavingEmail ='1194150512@qq.com'
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
      if(!differ || differ<10){
        ctx.body = errorBody()
      }else{
        //查询当前用户在库内是否存在
        const friend = await action.queryOne(FriendInfo,{leavingName,leavingEmail})
        //用户不存在即入库 方便后期回复他人操作查找
        !friend && action.save(new FriendInfo({leavingName,leavingEmail,leavingAvatar}))
        //查找留言库 数据长度生成id
        //生成params 存进留言数据库
        const params = {
          from,fromId,fromIp,isMaster,
          leavingName,leavingEmail,leavingAvatar,leavingCont,leavingUrl,
          commentId:Date.now(), parentId,replyLevel,replyName,dateNow
        }
        action.save(new Comment(params))
        if(replyLevel ==0 && isMaster){
          ctx.body = successBody()
        }else{
          //当层级为1时 查找parentId值 为2时 查找LV2Id值
          const commentId = replyLevel===1?parentId:LV2Id
          const reply = await action.queryOne(Comment,{commentId})
          reply && (params.reply = reply)
          ctx.body = successBody()
          timeout(params)
        }
      }
    }else{
      ctx.body = errorBody()
    }
  }

});
  //校验xss
function checkXss(cont){
  for (const it of xssList) {
    if(cont.indexOf(it) !==-1){
      return errorBody()
    } 
  }
 }
  //校验ip地址




/**
 * @param {来源 应为 article/mood/comment} from 
 * @param {来源id 当from为article/mood时 需要该参数} fromId
 */
router.get('/', async ctx => {
  const { from='article',fromId='' } = ctx.query
  console.log(from,fromId);
  const length = await action.queryCount(Comment,{from:new RegExp(from),fromId:new RegExp(fromId)});
	const res = await action.query(Comment,{from:new RegExp(from),fromId:new RegExp(fromId),replyLevel:0});
  const data = JSON.parse(JSON.stringify(res))
  for (const item of data) {
	  const result = await action.query(Comment,{from:new RegExp(from),fromId:new RegExp(fromId),parentId:item.commentId});
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
  const { from,pageNo=1,pageSize=10} = ctx.query
  const total = await action.queryCount(Comment,{from:new RegExp(from)})
	const res = await action.queryPage(Comment,{from:new RegExp(from),pageNo,pageSize});
	ctx.body = {
    code: 200,
    success:true,
    data:{
      pageNo:parseInt(pageNo),
      pageSize:parseInt(pageSize),
      total,
      data:res
    }
  }
});
//删除留言信息
router.post('/delete', async ctx => {
  const { _id } = ctx.request.body;
  await action.deleteOne(Comment, { _id});
	ctx.body = successBody()
});
//发送邮件
// router.post('/email', async (ctx, next) => {
//   const {mail} = ctx.request.body
//   console.log(mail);
//   if (!mail) {
//       return ctx.body = '参数错误' //email出错时或者为空时
//   }
  async function timeout(info) {
      return new Promise((resolve, reject) => {
          email.sendMail(info, (state) => {
              resolve(state);
          })
      })
  }
  // await timeout().then(state => {
  //     if (state) {
  //         return ctx.body = "发送成功"
  //     } else {
  //         return ctx.body = "失败"
  //     }
  // })
// })

function errorBody(){
  return{
   code: 500,
   success:false,
   data:'请求异常，请稍后重试'
 }
}
function successBody(){
 return{
   code: 200,
   success:true,
 }
}

module.exports = router
