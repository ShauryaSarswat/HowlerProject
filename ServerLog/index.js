const http = require('node:http');
const fs = require('fs/promises');
const app = http.createServer((req, res)=>{
    const date = new Date().toString();
    fs.appendFile("logs.txt","LOG DATE :"+date+" : "+req.url+"\n");
    res.end("This is a SERVER PAGE");
});

app.listen("1200",()=>{
    console.log("listening at port 1200");
});