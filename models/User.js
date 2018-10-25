const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

//IDEA: Los usuarios no se van a registrar con email ni nada... solo el Admin los da de alta, razon, para no tenerlo expuesto al pùblico general...

const userSchema = new Schema({
  username: String,
  hash: String, // IMPORTANTE PASSPORT LOCAL MONGOOSE LE PONE "HASH" Y NO PASSWORD
  role: {
    type: String,
    enum:["ADMIN", "USER"],
    default: "USER"
  },
}, {timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

userSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("User", userSchema);