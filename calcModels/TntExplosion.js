/* TntExplosion.js */
const DHCTNT = 4760;; 

class TntExplosionModel {
  constructor(obj) {
    this.obj = obj;
    this.sustancia = obj;
    this.hCombKJKG = this.sustancia.hckjkg;
    this.name = this.sustancia.subsName;
    this.mass = obj.massRelease;
    this.fe = obj.energyFraction; 
  }

  xToOverpressure(xTNT) {
    const a1 = -0.214362789151;
    const b1 = 1.35034249993;
    const c01 = 2.78076916577;
    const c11 = -1.6958988741;
    const c21 = -0.154159376846;
    const c31 = 0.514060730593;
    const c41 = 0.0988554365274;
    const c51 = -0.293912623038;
    const c61 = -0.0268112345019;
    const c71 = 0.109097496421;
    const c81 = 0.001628467556311;
    const c91 = -0.0214631030242;
    const c101 = 0.0001456723382;
    const c111 = 0.00167847752266;

    let masaEQTNT = (this.fe * this.hCombKJKG * this.mass) / DHCTNT;
    let z = xTNT / Math.pow(masaEQTNT, 1.0 / 3.0);
    let ablog = a1 + b1 * Math.log10(z);
    let c = c01 + c11 * ablog + c21 * Math.pow(ablog, 2) + c31 * Math.pow(ablog, 3) + c41 * Math.pow(ablog, 4) + c51 * Math.pow(ablog, 5) + c61 * Math.pow(ablog, 6) + c71 * Math.pow(ablog, 7) + c81 * Math.pow(ablog, 8) + c91 * Math.pow(ablog, 9) + c101 * Math.pow(ablog, 10) + c111 * Math.pow(ablog, 11);
    let pres = Math.pow(10, c);
    return pres;

  }

  overpressureToDistance(overPressurekPa) {
    const a1 = -0.214362789151;
    const b1 = 1.35034249993;
    const c01 = 2.78076916577;
    const c11 = -1.6958988741;
    const c21 = -0.154159376846;
    const c31 = 0.514060730593;
    const c41 = 0.0988554365274;
    const c51 = -0.293912623038;
    const c61 = -0.0268112345019;
    const c71 = 0.109097496421;
    const c81 = 0.001628467556311;
    const c91 = -0.0214631030242;
    const c101 = 0.0001456723382;
    const c111 = 0.00167847752266;

    const tolerance = 0.001;
    let xTNT = 0;
    var pres = 33000;
    let masaEQTNT = (this.fe * this.hCombKJKG * this.mass) / DHCTNT;
    for (xTNT = 1; pres > overPressurekPa; xTNT = xTNT + tolerance) {
      const z = xTNT / Math.pow(masaEQTNT, 1.0 / 3.0);
      let ablog = a1 + b1 * Math.log10(z);
      let c = c01 + c11 * ablog + c21 * Math.pow(ablog, 2) + c31 * Math.pow(ablog, 3) + c41 * Math.pow(ablog, 4) + c51 * Math.pow(ablog, 5) + c61 * Math.pow(ablog, 6) + c71 * Math.pow(ablog, 7) + c81 * Math.pow(ablog, 8) + c91 * Math.pow(ablog, 9) + c101 * Math.pow(ablog, 10) + c111 * Math.pow(ablog, 11);
      pres = Math.pow(10, c);
    }
    return xTNT;
  }
}

module.exports = TntExplosionModel;