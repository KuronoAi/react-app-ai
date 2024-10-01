import express from'express';
import cors from 'cors';
import admin from'firebase-admin';
import{initializeApp}from'firebase-admin/app';
import serviceAccount from'./config/reactfirebase-ai.json'assert{type:"json"};
import bodyParser from 'body-parser';

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

const db = admin.firestore();
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.listen(port,() => {
    console.log(`Example app listening on port ${port}`)
});
//...
// Delete
async function deleteBook(bookCode){
    const docRef = db.collection('Books').doc(bookCode);
    await docRef.delete();
    console.log('Book deleted.');
}

// http://localhost:3000/api/deleteBook/100
app.delete('/api/deleteBook/:bookCode', (req, res) => {  
    console.log('Book deleted2.');
    const { bookCode } = req.params;
    deleteBook(bookCode);
    res.status(200).json({ message: '[INFO] ลบข้อมูลหนังสือสำเร็จ' });
});

// Update
async function fetchOneBook(bookCode) {
    const result = [];
    const booksRef = await db.collection('Books').where('bookCode', '==', bookCode).get();
    booksRef.forEach(doc => {
        result.push({
            id: doc.id,
            ...doc.data()
        });
    });
  
    return result;
}
  
app.get('/api/getOneBook/:bookCode', (req, res) => {
    const { bookCode } = req.params;
    res.set('Content-Type', 'application/json');
    fetchOneBook(bookCode).then((jsonData) => {
      res.status(200).json(jsonData[0]);
    }).catch((error) => {
      res.send(error);
    });
});
  
async function updateBook(bookCode, bookData) {
    const docRef = db.collection('Books').doc(bookCode);
    await docRef.update(bookData);
    console.log('Book updated!');
}

// http://localhost:3000/api/updateBook
app.post('/api/updateBook', (req, res) => {
    const { bookCode,bookTitle, bookDesc, bookCate } = req.body;
    updateBook(bookCode, {bookTitle, bookDesc, bookCate });
    res.status(200).json({ message: 'Book updated successfully.' });
});
//...
 
async function addBook(bookData){
    const newBookRef = db.collection('Books').doc();
    const docRef = db.collection('Books').doc(newBookRef.id);
    /* let myJson = {
        "id": 1,
        "title":'Book 0.5',
        "description":'N/A',
        "author":'yo',
        "publisher":'...',
        "price":500,
        "stock":true
    }; */
    let myJson = {
        "bookCode": newBookRef.id,
        "bookTitle": bookData.bookTitle,
        "bookDesc": bookData.bookDesc,
        "bookCate": bookData.bookCate
    };
    //const myJson = bookData;
    await docRef.set(myJson);
    console.log('Book added!');
}
app.post('/api/bookInsert',(req,res) => {
    const{ bookTitle,bookDesc,bookCate} = req.body;
    console.log('Received from data:' , {bookTitle,bookDesc,bookCate});
    const myForm = { bookTitle,bookDesc,bookCate};
    addBook(myForm);
    const myRes = {message: "[INFO] บันทึกข้อมูลหนังสือใหม่สำเร็จ"}
    res.status(200).json(myRes); //res.end('xxx');
});

//อ่านข้อมูลจากฐานข้อมูล app.get('...', () => { () => {... } });
async function fetchBook() {
    const result =[];
    const booksRef = db.collection('Books');
    const docsRef = await booksRef.get();
    docsRef.forEach(doc => {
        result.push({
            id: doc.id,
            ...doc.data()
        });
    });
    return result;
}

app.get('/api/getBooks',(req,res) => {
    res.set('Content-type','application/json');
    fetchBook().then((jsonData) => {
        res.status(200).json(jsonData);
    }).catch((error) => {
        res.send(error);
    });
});

app.get('/addBook',(req, res) => {
    addBook();
    res.end('Added new Book.');
});