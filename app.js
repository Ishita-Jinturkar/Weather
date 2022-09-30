const express=require("express");
const https=require("https")
const bodyParser=require("body-parser");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res)
{
    res.sendFile(__dirname+"/index.html");
  
})
app.post("/",function(req,res){
    const query=req.body.cityName;
    const url= "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=1977394572dc2992cd64fb62b2fc5534&units=metric";
https.get(url,function(response)
{
console.log(response.statusCode);
response.on("data",function(data)
{
const temp=JSON.parse(data).main.temp;
const weatherdes=JSON.parse(data).weather[0].description;
const icon=JSON.parse(data).weather[0].icon;
const imgurl="http://openweathermap.org/img/wn/"+icon+"@2x.png";
res.write("<p>The weather is currently: "+ weatherdes+"<p>");
res.write("<h1>The temperature in "+query+" is "+temp +" degrees celcius"+"</h1>");
res.write("<img src= "+ imgurl+">")
res.send()
})
});
});

app.listen(3000,function()
{
    console.log("server started.")
})