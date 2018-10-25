const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose'); //Requiere la libreria passport-local-mongoose

const userSchema = new Schema({
  username: String,
  hash: String, // IMPORTANTE PASSPORT LOCAL MONGOOSE LE PONE "HASH" Y NO PASSWORD
  role: {
    type: String,
    enum:["ADMIN", "USER"],
    default: "USER"
  }
});

//Darle la posibilidad a passport-local-mongoose y usar sus modelos
userSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("User", userSchema); //Recordar que User es la colleccion