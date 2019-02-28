const express = require('express');
const path = require('path');
const app = express();
const favicon = require('serve-favicon');
const Witness = require('./utils/witnessfull')
const witnessModel = require('./models/witnesfull')
const urlmlab= process.env.DB
const mongoose = require('mongoose')

mongoose.connect( urlmlab , { useNewUrlParser: true,useFindAndModify: false,  useCreateIndex: true } , (err)=>{
  if(err){
    return console.log("there is an error connecting to the db")
  }
  var witness = new Witness();
  setTimeout(()=>{
    witness.init();
  },24*60*60*1000)
});

app.get('/witnessfull',(req,res)=>{
  var query=req.query
  if(query.id){

    witnessModel.findOne({Witness: query.id}, function(err,obj) { 
      if(err){
        return res.send("is generate one error")
      }
      if(!obj){
        return res.send("witness dont exis")
      }
      return res.json(obj)
    });

  }else{
    return res.send("nada aun")
  }
  
})

app.use(express.static(path.join(__dirname, 'build')));
app.use(favicon(path.join(__dirname,'build','favicon.ico')));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(3000,()=>{
  console.log("localhost run in 5000")
});