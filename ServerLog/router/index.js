const http = require('node:http');
const fs = require('fs/promises');
const url = require('url');
const app = http.createServer((req, res)=>{
    
    const route = req.url;
    const parsedUrl = url.parse(route,true);
    console.log(parsedUrl.pathname," ",parsedUrl.query);
    switch(parsedUrl.pathname)
    {
        case '/' : res.end("this is the main route");break;
        case '/help' : res.end("this was the second page");break;
        default : {
            res.writeHead(404,{});
            res.end("The requesting page is not found");
        }

    }

});

app.listen("1200",()=>{
    console.log("listening at port 1200");
});