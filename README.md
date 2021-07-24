## 不会配置swigger 抱歉
## baseurl:http://localhost:3000/
## tips 参数带等于号 可以理解为 为默认参数 可传可不传

### 用户/个人中心
* 用户-用户登录 post  user/login     body: userName,passWord
* 用户-设置用户账号密码 post  user/addUser   body: userName,passWord,userId
* 用户-设置用户用户信息 post  user/addUserInfo   body: address,name,avatar,userId tips:userId最好与创建的账号id一致
* 用户-更改用户账号密码 post  user/updateUser     body:userName,passWord,userId
* 用户-获取个人中心 get  user/desc     tips:这里只查到userId为1的数据  只查询我自己的数据
* 用户-更改用户账号密码 post  user/desc     body:desc  tips:只设置userId为1的数据

---

### 文章
* 文章-查询 get   article/all  params:title,tag,pageNo,pageSize=10,sort='_id' tips:sort排序 pageNo pageSize分页
* 文章-查询 get   article/byId   params:id,from='' tips:文章id 来源
* 文章-新增 post   article/add   body title,viewImg,cont,tag,viewNum
* 文章-编辑 post   article/update  body:id,title,viewImg,cont,tag,viewNum
* 文章-编辑 post   article/delete    body:id

---

### 标签
* 标签-查询 get   tags/all 
* 标签-新增 post   tags/set  body:cont
* 标签-编辑 post   tags/update    body:_id,cont
* 标签-编辑 post   tags/delete   body:_id

---

### 日志
* 日志-查询 get   mood/all 
* 日志-新增 post   mood/set  body:cont
* 日志-编辑 post   mood/update    body:_id,cont
* 日志-编辑 post   mood/delete   body:_id

---

### 友链
* 友链-查询 get   links/all  query:title='',pageNo=1,pageSize=10
* 友链-新增 post   links/set  body:title,desc,type,avatar,url
* 友链-编辑 post   links/update    body:_id,title,desc,type,avatar,url
* 友链-编辑 post   links/delete   body:_id

---

### 项目分享
* 项目分享-查询 get   project/all  
* 项目分享-新增 post   project/set  body:name,title,imgSrc,href
* 项目分享-编辑 post   project/update    body:_id,name,title,imgSrc,href 
* 项目分享-编辑 post   project/delete   body:_id

---

### 学习资源
* 学习资源-获取所有学习资源信息 get   project/getNavigation  
* 学习资源-获取所有学习资源类型 get   project/getTag 
* 学习资源-新增学习资源类型 post   project/addTag    body:name 
* 学习资源-编辑学习资源类型 post   project/updateTag    body:_id,name
* 学习资源-删除学习资源类型 post   project/deleteTag    body:_id
* 学习资源-根据类型获取学习资源 get   project/ByTag  params:navigationTag
* 学习资源-根据类型新增学习资源 post   project/ByTag  body:navigationTag,title,desc,imgSrc,url
* 学习资源-编辑学习资源 post   project/updateByTag  body: _id,navigationTag,title,desc,imgSrc,url
* 学习资源-删除学习资源 post   project/deleteByTag    body:_id
