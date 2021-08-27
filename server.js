const Express=require('express');
const app=Express();
const cors=require('cors');
const port=4000;

const schemas = require('./schemas');
const middleware = require('./middleware');

var bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.json());


let blogs=[];
let products=[];

app.get('/', (req,res)=>{
    res.send('Hello')
})

app.post('/blog',middleware(schemas.blogs,'body'),function (req,res) {
    blogs.push(req.body);
    console.log('/updated');
    res.json(req.body);
    
} )

app.get('/blog',function (req,res) {
    res.json(blogs);
})

app.post('/product',middleware(schemas.products,'body'),function(req,res) {
    products.push(req.body);
    console.log('/updated');
    res.json(req.body);
})

app.get('/product',function (req,res) {
    res.json(products);
})


app.delete('/product/:id',function(req,res){
    const product=products.find(c => c.id===parseInt(req.params.id));
    if (!product) {
        return res.status(404).send(`The course with given id ${req.params.id} doesnt exists`);//404
    }

    //delete
    const index=products.indexOf(product);
    products.splice(index,1);
    console.log('/deleted');
    //return the same course
    res.send(product);
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))