// password : abcd1234 -> $2b$10$Na0qDeTiUrfeDHZqnSF7yuzVoNvUI5rml57D/ZL11uk9wankrOWNO
// let users = [{
//     id: '1',
//     username: 'melon', 
//     password:'$2b$10$Na0qDeTiUrfeDHZqnSF7yuzVoNvUI5rml57D/ZL11uk9wankrOWNO',
//     name:'이메론',
//     email:'melon@melon.com',
//     url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS87Gr4eFO7Pt2pE8oym4dxXnxGZYL2Pl_N5A&usqp=CAU'
//     }
// ];
// db를 끌어오기 때문에 위의 내용은 더 이상 필요가 없음. (주석처리 이후의 것들: 0510 작성)

import {db} from '../db/database.js';

export async function findByUsername(username){
    // return users.find((user) => user.username === username)
    return db.execute('select * from users where username=?', [username]).then((result)=>result[0][0]); // username만 postman에서 signup을 통해서 점검해보기.
}

export async function createUser(user){
    // const created = {...user, id:DateA.now().toString()}  // 전달받은객체를 복사하고 id는 현재시간으로 바꿔줌
    // users.push(created)
    // return created.id
    const {username, password, name, email, url} = user;
    return db.execute('insert into users (username, password, name, email, url) values (?, ?, ?, ?, ?)', [username, password, name, email, url]) .then((result)=>console.log(result));
}

export async function findById(id){
    return db.execute('select id from users where id=?', [id]).then((result)=>result[0][0]);  // id로 찾기
}