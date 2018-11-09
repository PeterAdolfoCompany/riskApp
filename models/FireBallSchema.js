const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fireBallSchema = new Schema({
    fbName: String,
    fbAirTemp: Number,
    fbAltitude: Number,
    fbHumidity: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    fbRadiationFraction: Number,
    fbMassRelease: Number,
    fbSubstance: String,
    fbHckjkg: Number,
    fbRad01: Number,
    fbRad02: Number,
    fbRad03: Number,
    fireBallArray: [Number], 
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

fireBallSchema.index({
    location: "2dsphere"
});
module.exports = mongoose.model("FireBall", fireBallSchema);