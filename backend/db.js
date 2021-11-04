var mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/mynotes?readPreference=primary&appname=MongoDB%20Compass&ssl=false"

const connetToMongo = ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log('database connected');
    });
}

module.exports = connetToMongo;