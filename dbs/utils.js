// sql语句的操作方法,使用时只需引入即可
const moment = require('moment')
const action = {}
//查询全部数据 根据_id倒序
action.query = (_Modal, _query = {}) => {
  return new Promise((resolve, reject) => {
    _Modal.find(_query, null, {sort: {'_id': -1}},  (err, res) => {
      err && reject(err)
      resolve(res)
    });
  });
};
//查询该集合内数据总长度
action.queryCount = (_Modal,_query={}) => {
  return new Promise((resolve, reject) => {
    _Modal.count(_query, (err, count) => {
      err && reject(err)
      resolve(count)
    })
  });
};
//查询分页数据 根据_id倒序 pageNo当前页码pageSize每页数量 pageNo pageSize必传项
action.queryPage = (_Modal, _query = {}) => {
  return new Promise((resolve, reject) => {
    console.log('_query',_query);
    const { pageNo,pageSize } = _query
    delete _query.pageNo
    delete _query.pageSize
    _Modal.find(_query)
    .skip((pageNo - 1)*parseInt(parseInt(pageSize)))
    .sort({'_id':-1})
    .limit(parseInt(pageSize))
    .exec(function (err, res) {
      err && reject(err)
      resolve(res)
    })
  });
};
//查询单条数据
action.queryOne = (_Modal, _query = {}) => {
  return new Promise((resolve, reject) => {
    _Modal.findOne(_query, null, {sort: {'_id': -1}}, (err, res) => {
      err && reject(err)
      resolve(res)
    });
  });
};

action.save = (_model) => {
  return new Promise((resolve, reject) => {
    _model.createTime = moment().format('YYYY-MM-DD HH:mm')
    _model.changeTime = moment().format('YYYY-MM-DD HH:mm')
    _model.save((err, res) => {
    err && reject(err)
    resolve(res)
    });
  });
};

action.update = (_model, oldData, newData) => {
  return new Promise((resolve, reject) => {
    _model.update(oldData, newData, (err, res) => {
    err && reject(err)
    resolve(res)
  });
 });
};

action.updateOne = (_model, _query, newData) => {
  return new Promise((resolve, reject) => {
    newData.changeTime = moment().format('YYYY-MM-DD HH:mm')
    _model.updateOne(_query, newData, (err, res) => {
    err && reject(err)
    resolve(res)
  });
 });
};

action.deleteOne = (_model, _data) => {
 return new Promise((resolve, reject) => {
   _model.deleteOne(_data, (err, res) => {
    err && reject(err)
    resolve(res)
   });
 });
};

module.exports = action

