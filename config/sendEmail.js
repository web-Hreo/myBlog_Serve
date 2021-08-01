const nodemailer = require('nodemailer'); //引入模块
let transporter = nodemailer.createTransport({
  //node_modules/nodemailer/lib/well-known/services.json  查看相关的配置，如果使用qq邮箱，就查看qq邮箱的相关配置
  service: 'qq', //类型qq邮箱
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
      user: '1194150512@qq.com', // 发送方的邮箱
      pass: 'ncvlhbdtzhyuhajc' // smtp 的授权码
  }
});
//pass 不是邮箱账户的密码而是stmp的授权码（必须是相应邮箱的stmp授权码）
//邮箱---设置--账户--POP3/SMTP服务---开启---获取stmp授权码

function sendMail(params, call) {
  //获取当前用户信息
  const { replyLevel,leavingName,leavingCont,leavingEmail,isMaster} = params
  const userParams = { replyLevel,leavingName,leavingCont,leavingEmail,isMaster }
  //获取父级信息 
  console.log('params.reply',params.reply);
  let fatherParams = {}
  if(params.reply){
    const replyName = params.reply.leavingName
    const replyEmail = params.reply.leavingEmail
    const replyCont = params.reply.leavingCont
    fatherParams = { replyName,replyEmail,replyCont }
  }
  console.log('fatherParams',fatherParams);

  let mail = '',html='',subject=''
  console.log('replyLevel',replyLevel);
  console.log('leavingCont',leavingCont);
  if(replyLevel===0){
    subject = '您有一条留言信息'
    mail = '1194150512@qq.com'
    html = replyLevel_zero(leavingName,leavingCont)
  }
  if(replyLevel===1 || replyLevel===2){
    if(isMaster){
      subject = '您收到了<Hhua_前端个人博客>博主何华的回复,赶快来回信吧'
      mail = fatherParams.replyEmail
      html = replyLevel_one_master(userParams,fatherParams,isMaster)
    }else{
      subject = '您有一封来自<Hhua_前端个人博客>回复提示'
      mail = fatherParams.replyEmail
      html = replyLevel_one_master(userParams,fatherParams,isMaster)
    }
  }

  // 发送的配置项
  let mailOptions = {
      from: '"Hhua_前端个人博客评论提醒" <1194150512@qq.com>', // 发送方
      to: mail, //接收者邮箱，多个邮箱用逗号间隔
      subject, // 标题
      text: 'Hello world?', // 文本内容
      html,
    };
    //发送函数
    transporter.sendMail(mailOptions, (error, info) => {
      error?call(false):call(true) 
    });

}

function replyLevel_zero(leavingName,leavingCont){
  return html = `
    <div style="padding:0 12px 0 12px;margin-top:18px">
      <p>博主大大，您收到一条来自 ${leavingName} 的留言：</p>
      <div style="background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;">
        ${leavingCont}
      </div>
      <p>点击进入<a style="text-decoration:none; color:#12addb" href="http://www.heblogs.cn" target="_blank">Hhua_前端个人博客</a>查看。<br></p>
    </div>
  `
}
function replyLevel_one_master(userParams,fatherParams,isMaster){
  const leavingName = isMaster?'Hhua何华':userParams.leavingName
  const isMasterHtml = isMaster?'博主大大':''
  return html = `
  <div style="padding:0 12px 0 12px;margin-top:18px">
    <p>${fatherParams.replyName}同学，您曾发表评论：</p>
    <div style="background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;">
      ${fatherParams.replyCont}
    </div>
    <p>${isMasterHtml}<span style="color:#12addb">${leavingName}</span>回复说：</p>
    <div style="background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;">
    ${userParams.leavingCont}
    </div>
    <p>
      您可以点击<a style="text-decoration:none; color:#12addb" href="http://www.heblogs.cn/comment" target="_blank" rel="noopener">查看回复的完整內容</a>，
      欢迎再次光临<a style="text-decoration:none; color:#12addb" href="http://www.heblogs.cn" target="_blank">Hhua_前端个人博客</a>。<br>
    </p>
  </div>
  `
}

module.exports = {
    sendMail
}
