import express from 'express' ;
import cors from 'cors';
import admin from 'firebase-admin';
import{initializeApp} from 'firebase-admin/app';
import serviceAccount from './config/reactfirebase-ai.json' assert {type:"json"};
import bodyParser from 'body-parser';



admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

  //การรียกใช ้งานบริการFirebase Admin SDK
const db = admin.firestore();
const app = express();
const port = 3000;

async function addBook(bookData) {
    const newBookRef = db.collection('Books').doc();
    const docRef = db.collection('Books').doc(newBookRef.id);
    let myJson = {
        "bookCode": newBookRef.id,
        "bookTitle": bookData.bookTitle,
        "bookDesc": bookData.bookDesc,
        "bookCate": bookData.bookCate
    };
/* let myJson = {
    "id": newBookRef.id,
    "title": 'a',
    "description": 'a',
    "author":'a',
    "publisher": 'a',
    "price": 100,
    "stock": true
}; */
   /* const myJson = bookData; */
    await docRef.set(myJson);
    console.log('Book added!');
}






app.use(cors());
app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
app.get('/addBook',(req, res) => {
    addBook();
    res.end('Added new Book.');
});

//อ่านข้อมูลจากฐานข้อมูล 
async function fetchBook (){
    const result = [];
    const booksRef = db.collection('Books');
    const docSRef = await booksRef.get();
    docSRef.forEach(doc =>{
        result.push({
            id: doc.id,
            ...doc.data()
        });
    });
    return result;
}

app.get('/api/getBooks',(req, res) => {
        res.set('Content-type','application/json');
        fetchBook().then((jsonData) =>{
            res.status(200).json(jsonData);
        }).catch((error) =>{
            res.send(error);
        });

});

app.post('/api/bookInsert',(req,res) =>{
    const {bookTitle, bookDesc , bookCate } = req.body;
    console.log('Recived from data: ', { bookTitle, bookDesc , bookCate });
    const myForm = {bookTitle,bookDesc,bookCate};
    addBook(myForm);
    const myRes = {message: "[INFO] บันทึกข้อมูลหนังสือใหม่สำเร็จ"};
    res.status(200).json(myRes); //res.end('xxx');
} );