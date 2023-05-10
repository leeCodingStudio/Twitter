import mysql from 'mysql2';
import {config} from '../config.js';

const pool = mysql.createPool({
    host: config.db.host,// 연결정보 삽입.
    user: config.db.user,
    database: config.db.database,
    password: config.db.password // password는 문자취급해야하므로, parseIn()으로 씌우지 않는다.
});

export const db = pool.promise();