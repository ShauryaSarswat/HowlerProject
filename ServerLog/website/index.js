const http = require("node:http");
const fspromise = require("fs/promises");
const url = require('node:url');
async function readData()
{
    const actual = data.toJSON();
    return actual;
}
// const data = readData().toString();
const data = fspromise.readFile('./data.json');
const shopPageString = fspromise.readFile('./views/landing.html');
const productCardString = fspromise.readFile('./views/productsPage.html')
const app = http.createServer(async (req, res)=>{
    
    const route = req.url;
    const parsedUrl = url.parse(route,true);
    switch(parsedUrl.pathname)
    {
        case '/' : res.end((await shopPageString).toString());break;
        case '/products' : {
            res.end((await data).toString());
            break;
        }
        case '/change' : {
            if('id' in parsedUrl.query)
            {
                
                const dataChange = JSON.parse((await data).toString());
                console.log(dataChange.products[parsedUrl.query["id"]]);
                product = dataChange.products[parsedUrl.query["id"]];
                res.end(JSON.stringify(product));
                break;
            }
            else
            {

                const dataChange = JSON.parse((await data).toString());
                const carding = (await productCardString).toString();
                const arrayprod = dataChange.products;
                const changeData = arrayprod.map((element,index)=>{
                    let pageData = carding;
                    pageData = pageData.replace('productTitle',element.title);
                    pageData = pageData.replace('imagesrc',element.images[0]);
                    pageData = pageData.replace('Description',element.description)
                    pageData = pageData.replace('productImage',element.category);
                    pageData = pageData.replace('productlink',element.id);
                    pageData = pageData.replace('productTitle',element.title);
                    return pageData;
                })
                const pageDataSend = changeData.toString();
                res.end(pageDataSend);
                break;
            }
        }
        default : {
            res.writeHead(404,{});
            res.end("The requesting page is not found");
        }

    }

});

app.listen("1200",()=>{
    console.log("listening at port 1200");
});