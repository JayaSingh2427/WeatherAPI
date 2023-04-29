const express = require('express')
const https=require('https')
const bodyParser=require('body-parser');

const app=express()

app.use(bodyParser.urlencoded({extended:true}))

app.get("/",function(req,res){
res.sendFile(__dirname+"/index.html")
    
})

app.post("/",function(req,res){
    
    const query=req.body.myCity;
    const appKey="0cc3817d06c087ad44f8778bb7c27c1e";
    const unit="metric"

    const url="https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid=" + appKey +"&units="+unit;
    https.get(url,function(response){
        console.log(response.statusCode)

    response.on("data",function(data){
        const weatherData = JSON.parse(data)
        const temp=weatherData.main.temp
        const weatherdesc=weatherData.weather[0].description;
        const icon=weatherData.weather[0].icon;
        const img="https://openweathermap.org/img/wn/"+icon+"@2x.png";

        res.set("Content-Type","text/html");
        res.write("<h3>The weather is currently "+weatherdesc+"</h3>");
        res.write("<h1>The Temperature in "+query+" is "+ temp + " degree celcius</h1>");
        res.write("<img src="+img+">");
        res.send();
    })

})
})



app.listen(3000,function(){
    console.log("Sever is running at 3000")
})