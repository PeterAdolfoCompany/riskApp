const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tntExplosionSchema = new Schema({
  eventName: String,
  user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
  },
  energyFraction: Number,
  massRelease: Number,
  // SUBSTANCE
  subsName: String,
  hckjkg: Number,
  // SETTINGS
  overPressure01: Number,
  overPressure02: Number,
  overPressure03: Number,
  //RESULTS
  TntExplosionArray: [Number], 
  radio01: Number,
  radio02: Number,
  radio03: Number,
  location: {
    type: {
      type: String,
      default: "Point"
    },
    coordinates: [Number]
  },
},{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

tntExplosionSchema.index({
  location: "2dsphere"
});
module.exports = mongoose.model("TntExplosion", tntExplosionSchema);