import { MONDB_URL } from '../../config/index.js';
const mongoose = require('mongoose');

// export const MONDB_URL = "mongodb://127.0.0.1:27017/user";

mongoose.connect(MONDB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('connected', () => {
	console.log('数据库连接成功...');
});

db.on('error', (error) => {
	console.log('数据库连接失败...', error);
});

db.on('disconnected', () => {
	console.log('数据库已断开');
});

export default mongoose;

