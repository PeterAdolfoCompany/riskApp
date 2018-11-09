const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const poolFireSchema = new Schema({
    pfName: String,
    airTemp: Number,
    windVelocity: Number,
    altitude: Number,
    humidity: Number,
    // DATOS DE LA SUSTANCIA
    pfSubstance: String,
    pfHva: Number,
    pfHvn: Number,
    pfTc: Number,
    pfMw: Number,
    pfHckjkg: Number,
    pfTb: Number,
    pfCpla: Number,
    pfCplb: Number,
    pfCplc: Number,
    pfCpld: Number,
    pfDliqa: Number,
    pfDliqb: Number,
    pfDliqn: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    //DATA SOURCE
    typeLeak: Number, //1 => continuosLeak, 2 => massiveLeak, 3 => circularDike, 4 => noCircularDike
    //Fraccion de combustion en PointSource
    combFractionPointSource: {
        type: Number,
        min: [0.15, "Out of range (0.15 to 0.40)"],
        max: [0.40, "Out of range (0.15 to 0.40)"]
    },
    flow: Number,
    massRelease: Number,
    widthCircularDike: Number,
    heightCircularDike: Number,
    diameterCircularDike: Number,
    burningRateMethod: Number,
    flameHeightMethod: Number,
    calculationMethod: Number,

    // SETTINGS
    pfRad01: Number,
    pfRad02: Number,
    pfRad03: Number,
    timeExposition: Number,

    //RESULTS
    poolFireArray: [Number],
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

poolFireSchema.index({
    location: "2dsphere"
});
module.exports = mongoose.model("PoolFire", poolFireSchema);