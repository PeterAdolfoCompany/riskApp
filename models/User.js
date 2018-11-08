const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
  username: {
      type: String,
      unique: 'Este usuario ya no está disponible',
      required: true,
  },
  email: {
      type: String,
      unique: 'El email debe de ser unico',
      required: true,
  },
  profile_pic : String,
  password: String,
  role: {
    type: String,
    enum:["ADMIN", "USER"],
    default: "USER"
  },
  //Setting User PoolFire
  bRateStrasser: Boolean, 
  bRateMudan: Boolean,
  altFlamaThomas: Boolean,
  altFlamaPritchard: Boolean,
  pointSourceModel: Boolean,
  solidPlumeModel: Boolean,
  //Thermal radiations
  poolFireQ1: Number,
  poolFireQ2: Number,
  poolFireQ3: Number,
  fireBallQ1: Number,
  fireBallQ2: Number,
  fireBallQ3: Number,
  explosionP1: Number,
  explosionP2: Number,
  explosionP3: Number,
}, {timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

userSchema.plugin(passportLocalMongoose, {usernameField: 'email'});

module.exports = mongoose.model('User', userSchema);