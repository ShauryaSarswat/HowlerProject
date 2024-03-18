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
    "title": "Paw Mug : Beagle",
    "thumbnail": "https://luckysketch.files.wordpress.com/2017/06/mug-beale_mockup_handle-on-right_11oz.png",
    "description": "The cutest bro",
    "price": 200,
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