// sql语句的操作方法,使用时只需引入即可
const action = {}
//查询全部数据
action.query = (_Modal, _query = {}) => {
  return new Promise((resolve, reject) => {
      _Modal.find(_query, (err, res) => {
       if(err) {  
            reject(err)
        }
        resolve(res)
      });
  });
};
//查询全部数据
action.queryOne = (_Modal, _query = {}) => {
  return new Promise((resolve, reject) => {
      _Modal.findOne(_query, (err, res) => {
       if(err) {  
            reject(err)
        }
        resolve(res)
      });
  });
};

action.save = (_model) => {
 return new Promise((resolve, reject) => {
   _model.save((err, data) => {
     if(err) {
       reject(err);
     }
     resolve(data);
   });
 });
};

action.update = (_model, oldData, newData) => {
 return new Promise((resolve, reject) => {
   _model.update(oldData, newData, (err, data) => {
     if(err) {
       reject(err);
     }
     resolve(data);
   });
 });
};

action.updateOne = (_model, oldData, newData) => {
 return new Promise((resolve, reject) => {
   _model.updateOne(oldData, newData, (err, data) => {
     if(err) {
       reject(err);
     }
     resolve(data);
   });
 });
};

action.deleteOne = (_model, _data) => {
 return new Promise((resolve, reject) => {
   _model.deleteOne(_data, (err, data) => {
     if(err) {
       reject(err);
     }
     resolve(data);
   });
 });
};

// export {
//  query,
//  save,
//  update,
//  updateOne,
//  deleteOne,
// };
module.exports = action

