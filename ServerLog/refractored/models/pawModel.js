
const databaseurl = "mongodb+srv://ShauryaSarswat:shauryasarswat3122@pawmugscluster.6rtdrae.mongodb.net/PawMugs?retryWrites=true&w=majority&appName=PawMugsCluster";
// connecting the database
const mongoose = require('mongoose');
mongoose.connect(databaseurl).then((content)=>{
    console.log("connection status : connected");
}).catch((err)=>{
    console.log(err);
});
const mugSchema = new mongoose.Schema({
   "title": {type: String,required:[true, "we need the paw mug title"],unique:[true, "we need a special paw mug only"]},
   "price": {type: Number,required:[true, "we need the paw mug price"]},
   "thumbnail":{type: String,required:[true, "we need the paw mug thumbnail"]},
   "description": {type: String,required:[true, "we need the paw mug description"]},
   "discount":{type: Number,required:[true, "we need the paw mug discount"]}
});
const mugModel = mongoose.model('PawMugs',mugSchema);

module.exports = mugModel;