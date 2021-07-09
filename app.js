const express = require('express')
const app = express();


app.get('/',(req,res)=>{
    res.send('Hello World');
});

app.get('/courses/',(req,res)=>{
    res.send([1,2,3]);
});

app.get('/courses/:id1/:id2',(req,res)=>{
    res.send(req.params.id2);
    //to get an object use below
    //res.send(req.params);
});

app.get('/posts/:year/:month',(req,res)=>{
    res.send(req.params); 
});

//Query
// app.get('/posts/:year/:month',(req,res)=>{
//     res.send(req.query); 
// });

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`listening to ${port}`));