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
  //Setting Usuario para Modelo PoolFire
  bRateStrasser: Boolean, 
  bRateMudan: Boolean,
  altFlamaThomas: Boolean,
  altFlamaPritchard: Boolean,
  pointSourceModel: Boolean,
  solidPlumeModel: Boolean,
  //Radiaciones termicas(Q) y sobrepresiones(P) que escoge el usuario paraa dibujar en google maps
  poolFireQ1: Number,
  poolFireQ2: Number,
  poolFireQ3: Number,
  fireBallQ1: Number,
  fireBallQ2: Number,
  fireBallQ3: Number,
  explosionP1: Number,
  explosionP2: Number,
  explosionP3: Number,
//TODO: Faltan campos hasta tener los 3 modelos (PoolFire, Explosion, FireBall)
}, {timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

userSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("User", userSchema);