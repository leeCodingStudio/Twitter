import * as userRepository from './auth.js'; // 0508
import { db } from '../db/database.js';

const SELECT_JOIN = 'select tw.id, tw.text, tw.createdAt, tw.userId, us.username, us.name, us.email, us.url from tweets as tw left outer join users as us on tw.userId = us.id'; // 0510
const ORDER_DESC = 'order by tw.createdAt DESC' // 0510

// let tweets = [
//     {
//     id:'1',
//     text:'첫 트윗입니다!!',
//     createdAt: Date.now().toString(),
//     userId: '1' // 0508
//     },
//     {
//         id:'2',
//         text:'안녕하세요!!',
//         createdAt: Date.now().toString(),
//         userId: '1' // 0508
//     }
// ];



// 1)
export async function getAll() { // 0508 // userId의 1번이 누가썼는지를 알아야함!
    // return Promise.all(
    //     tweets.map(async (tweet) => {
    //         const { username, name, url } = await userRepository.findById(tweet.userId);
    //         return { ...tweet, username, name, url };
    //     }))
    return db.execute(`${SELECT_JOIN} ${ORDER_DESC}`)
    .then((result)=>result[0]); // 0510
}



// 2)
export async function getAllByUsername(username) { // 0508
    // return getAll().then((tweets) => tweets.filter((tweet) => tweet.username === username)); // 0508
    return db.execute(`${SELECT_JOIN} WHERE us.username=? ${ORDER_DESC}`, [username])
    .then((result)=>result[0]); // 0510
}




// 3)
export async function getById(id) { // 0508
    // const found = tweets.find((tweet) => tweet.id === id);
    // if (!found) {
    //     return null;
    // }
    // const { username, name, url } = await userRepository.findById(found.userId);
    // return { ...found, username, name, url }; // 0508
    return db.execute(`${SELECT_JOIN} WHERE tw.id=?`, [id])
    .then((result)=>result[0][0]); // 0510
}



// 4)
export async function create(text, userId) {
    //     const tweet = {
    //         id: Date.now().toString(),
    //         text,
    //         createdAt: new Date(),
    //         userId
    //     };
    //     tweets = [tweet, ... tweets];
    //     return getById(tweet.id);
    // } 0508
    return db.execute("insert into tweets (text, createdAt, userId) values (?, ?, ?)", [text, new Date(), userId])
        .then((result) => console.log(result));
} // 0510


// 5)
export async function update(id, text) {
    // const tweet = tweets.find((tweet) => tweet.id === id)
    // if (tweet) {
    //     tweet.text = text;
    // }
    // return tweet 0508
    return db.execute("update tweets set text=? where id=?", [text, id])
    .then(() => getById(id)); // 0510
}




// 6)
export async function remove(id) {
    // tweets = tweets.filter((tweet) => tweet.id !== id); 0508
    return db.execute("delete from tweets where id=?", [id]);
}