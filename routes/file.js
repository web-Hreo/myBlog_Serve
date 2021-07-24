/**
  @name: 'file',
  @desc: '七牛云上传图片获取token'
  @author: HeHua,
  @createDate: 2021年07月24日 10:07:37,
  @changeDate: ,
 */
const qiniu = require('qiniu'); // 需要加载qiniu模块的
const router = require('koa-router')()
router.prefix('/file')//前缀

let config = {
  "AK":"hvyauxmFgg0zkn81CeKRLBipdEHiXfD0XCPIB073",
  "SK":"juMoIzeAPNIgHrlKJbJ8BZiqg6pLwP87LRWkJyEH",
  "Bucket":"hehuablogs"
}

router.get('/token', async(ctx, next)=> {
  let mac = new qiniu.auth.digest.Mac(config.AK, config.SK);
  let code = '1',msg = '', data = {};
  let options = {
      scope: config.Bucket,
      expires: 3600 * 24
  };
  let putPolicy =  new qiniu.rs.PutPolicy(options);
  let uploadToken= putPolicy.uploadToken(mac);
  if (uploadToken) {
      code = '0';
      data.uploadToken = uploadToken;
      ctx.body = {code, data, msg}
  } else {
      ctx.body = {code, data, msg}
  }
})

module.exports = router
