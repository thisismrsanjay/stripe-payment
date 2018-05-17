const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const stripe =  require('stripe')('sk_test_fIalUoNTJCtctaB8pRWJTR7o');
const port = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.set('view engine','ejs');
app.use(express.static(`${__dirname}/public`))

app.get('/',(req,res)=>{
    res.render('index');
})
app.get('/success',(req,res)=>{
    res.render('success');
})

app.post('/charge',(req,res)=>{
    const amount = 999;
    stripe.customers.create({
        email:req.body.stripeEmail,
        source:req.body.stripeToken
    })
    .then(customer=>
        stripe.charges.create({
            amount,
            description:'web dev whatever',
            currency:'usd',
            customer:customer.id
        })
    )
    .then(charge=> 
        res.render('success')
    )
})



app.listen(port,(err)=>{
    if(err)throw err;
    console.log("server is running");
})