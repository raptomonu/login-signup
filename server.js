const express=require('express')
const router=require('./router')
const mongoose = require('mongoose')
const nodemailer=require('nodemailer')
const schema=require('./schema')
const db=schema.db
const app=express()
const bodyparser=require('body-parser')
mongoose.connect('mongodb://127.0.0.1/monudb',{useNewUrlParser:true})
mongoose.set('useCreateIndex',true)
app.use(express.static('/'))
app.use(bodyparser.urlencoded({extended:false}))
app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/login.html')
})
const transport=nodemailer.createTransport({
    service:'gmail.com',
    auth:{
        user:'mellowd70@gmail.com',
        pass:'monu@1234'
    }
})
app.post('/signedup',(req,res)=>{
    var user = new schema({
        user:req.body.user,
        mail:req.body.mail,
        pass:req.body.pass,
        phone:req.body.phone,
        check:0

    })
    user.save((err,user)=>{
        if(err)
        {
            return console.error(err)
        }
        else
        {
            console.log(req.body)
            res.send(req.body)
        }
    })
    var link ='http://localhost:3000/verify?mail='+req.body.mail
    var mailoption={
        to:req.body.mail,
        subject:"please confirm your email address",
        html:'<a href='+link+'>CLick hera for verification</a>'
    }
    transport.sendMail(mailoption,(err,info)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log(info)
        console.log('mail sent')
    }
    })
})

app.get('/verify',(req,res)=>{
    // console.log(mali)
    if(req.query.mail)
    {
        res.send("Congratulation , your account now created") 
        console.log(req.query.mail)
        schema.update({mail:req.query.mail},{$set:{check:1}}).then(doc => {
            if(!doc || doc.length === 0){
                console.log("bad request");
            }else{
                console.log(doc);
            }
        }).catch(err => {
            if(err){
                console.error(err.stack);
            }
        });
    }
})

app.use(router)
app.listen(3000,()=>{
    console.log("start")
})