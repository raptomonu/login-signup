const router=require("express").Router()
const schema=require('./schema')
router.get('/index',(req,res)=>{
    res.sendFile(__dirname+ '/' + 'index.html')
})
router.post('/login',(req,res)=>{
    console.log(schema.find({$and:[{mail:{$eq:req.body.mail}},{check:{$eq:1}}]}).then(doc=>{
        if(doc.length>0)
        {
            console.log(schema.find({$and:[{mail:{$eq:req.body.mail}},{pass:{$eq:req.body.pass}}]},{mail:1,pass:1,_id:0}).then(docs=>{
                if(docs.length>0)
                {
                    res.send('logged in')
                }
                else
                {
                    res.send('Wrong password')
                }
            }))
        }
        else
        {
            //console.log(doc.length)
            res.send('email Not register')
        }
        // console.log(doc)
    }))
    
})
module.exports=router