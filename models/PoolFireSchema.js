const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const poolFireSchema = new Schema({
    eventName: String,
    tempAmbiente: Number,
    velViento: Number,
    altitud: Number,
    humedad: Number,
    //RELACION CON OTRAS COLECCIONES
    user_id: Objectid, //FIXME: Duda en relacionar con user
    chem_id: Objectid, //FIXME: Duda en relacionar con la tabla de las sustancias
    //DATOS SOURCE
    isFugaContinua: Boolean,
    isFugaMasiva: Boolean,
    isDiqueCircular: Boolean,
    isDiqueNoCircular: Boolean,
    //Fraccion de combustion en PointSource
    combFractionPointSource: {
      type: Number,
      min: [0.15, "Out of range (0.15 to 0.40)"],
      max: [0.40, "Out of range (0.15 to 0.40)"]
    },
    spillRate: Number,
    massRelease: Number,
    anchoDiqueNoCircular: Number,
    largoDiqueNoCircular: Number,
    diametroDiqueCircular: Number,

    //RESULTADOS
    poolFireArray:[Number], //Array para graficar y reporte
    radio01: Number, //Radios calculados en base a los datos de radiación del User Campos poolFireQX
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

poolFireSchema.index({location:"2dsphere"});
module.exports = mongoose.model("PoolFire", poolFireSchema);