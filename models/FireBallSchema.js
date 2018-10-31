const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fireBallSchema = new Schema({
  eventName: String,
  tempAmbiente: Number,
  altitud: Number,
  humedad: Number,
  user_id: Objectid, //FIXME: Duda en relacionar con user
  chem_id: Objectid, //FIXME: Duda en relacionar con la tabla de las sustancias
  radiationFraction: Number,
  massRelease: Number,
  
  //RESULTADOS
  fireBallArray: [Number], //Array para graficar y reporte
  radio01: Number, //Radios calculados en base a los datos de radiación del User Campos fireBallQ1 2 o 3
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

fireBallSchema.index({
  location: "2dsphere"
});
module.exports = mongoose.model("FireBall", fireBallSchema);