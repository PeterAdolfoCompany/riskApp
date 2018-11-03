const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tntExplosionSchema = new Schema({
  eventName: String,
  user_id: ObjectId, //FIXME: Duda en relacionar con user
  energyFraction: Number,
  massRelease: Number,
  // SUSTANCIA
  name: String,
  hckjkg: Number,
  // SETTINGS
  overPressure01: Number,
  overPressure02: Number,
  overPressure03: Number,
  //RESULTADOS
  TntExplosionArray: [Number], //Array para graficar y reporte
  radio01: Number, //Radios calculados en base a los datos de radiación del User Campos explosionP1 2 o 3
  radio02: Number,
  radio03: Number,
  location: {
    type: {
      type: String,
      default: "Point"
    },
    coordinates: [Number]
  },
});

tntExplosionSchema.index({
  location: "2dsphere"
});
module.exports = mongoose.model("TntExplosion", tntExplosionSchema);