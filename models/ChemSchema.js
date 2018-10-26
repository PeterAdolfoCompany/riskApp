const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//mw - Peso Molecular

const chemSchema = new Schema({
  name: String,
  cas: String,
  formula: String,
  mw:Number, 
  tb:Number,
  tc:Number,
  hckjkg:Number,
  hcstate:String, //Verifica si el liquido o gas
  hva: Number,
  hvn:Number,
  cpla:Number,
  cplb:Number,
  cplc:Number,
  cpld:Number,
  dliqa:Number,
  dliqb:Number,
  dliqn:Number
});

chemSchema.index({
  location: "2dsphere"
});
module.exports = mongoose.model("Chemicals", chemSchema);