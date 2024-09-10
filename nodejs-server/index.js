import express from 'express' ;
import admin from 'firebase-admin';
import{initializeApp} from 'firebase-admin/app';
import serviceAccount from './config/reactfirebase-ai.json' assert {type:"json"};

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

async function addBook() {
    const newBookRef = db.collection('Books').doc();
    const docRef = db.collection('Books').doc(newBookRef.id);
let myJson = {
    "id": newBookRef.id,
    "title": 'a',
    "description": 'a',
    "author":'a',
    "publisher": 'a',
    "price": 100,
    "stock": true
};

    await docRef.set({myJson});
    console.log('Book added!');
}


//การรียกใช ้งานบริการFirebase Admin SDK
const db = admin.firestore();

const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
app.get('/addBook',(req, res) => {
    addBook();
    res.end('Added new Book.');
});