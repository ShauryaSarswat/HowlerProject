const app = require('./app');
const databaseurl = "mongodb+srv://ShauryaSarswat:shauryasarswat3122@pawmugscluster.6rtdrae.mongodb.net/PawMugs?retryWrites=true&w=majority&appName=PawMugsCluster";
// connecting the database
const mongoose = require('mongoose');
mongoose.connect(databaseurl).then((content)=>{
    console.log("connection status : connected");
}).catch((err)=>{
    console.log(err);
});
const mugSchema = new mongoose.Schema({
   "title": {type: String,required:[true, "we need the paw mug title"]},
   "price": {type: Number,required:[true, "we need the paw mug price"]},
   "thumbnail":{type: String,required:[true, "we need the paw mug thumbnail"]},
   "description": {type: String,required:[true, "we need the paw mug description"]},
   "discount":{type: Number,required:[true, "we need the paw mug discount"]}
});

const mugModel = mongoose.model('PawMugs',mugSchema);
const testMug = new mugModel({
    "title":"Paw Mug : The OG Golden Retriever",
    "price": 200,
    "thumbnail":"https://i.ebayimg.com/images/g/DosAAOSwqE9jRVKq/s-l1200.webp",
    "description": "The best playing partner",
    "discount": 10
})
testMug.save().then((res)=>{
    console.log("the mug has been saved");
    console.log(res);
}).catch((err)=>{
    console.log(err);
});
const port = 3000;
app.listen(3000,()=>{
    console.log("listening at PORT : ",port);
})