import express from 'express' ;
import cors from 'cors' ;

const app = express();
const port = 3000;

app.use(cors());

// http://localhost:3000/
app.get('/',(req,res) => {
    res.send('Hello, ai!');
});

// http://localhost:3000/api/getBook/100
app.get('/api/getBook/:bookId/userId',(req,res) =>{
    res.send(req.params);
});

app.get('/api/getProfile',(req,res) =>{
res.send(myData);
});

const myData = {
    "fname" : "vasawat" ,
    "lname" : "hansarikij" ,
    "email" : "vasawat.har@gmail.com" ,
    "major" : "Information Technology" 
}

app.get('/api/getProfile',(req,res)=>{
    res.json(myData);
});

app.listen(port, ()=>{
    console.log(`example app listening on port ${port}`);
});