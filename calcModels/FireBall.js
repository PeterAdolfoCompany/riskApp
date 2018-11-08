/* FireBall.js */
class FireBall {
  constructor(obj) {
    this.obj = obj;
    this.sustancia = obj;
    this.hCombKJKG = this.obj.hckjkg;
    this.name = this.sustancia.name;

    this.tempAmbK = obj.tempAmbC + 273.15;
    this.humedadRelativa = obj.humedadRelativa;

    this.mass = obj.mass; //
    this.fs = obj.radiationFraction; 

  }

  diameterMax() {
    let Dmax = 5.8 * Math.pow(this.mass, 1.0 / 3.0);
    return Dmax;
  }

  durationFireBallCombustion() {
    let timeFBall;
    if (this.mass < 30000.0) {
      timeFBall = 0.45 * Math.pow(this.mass, 1.0 / 3.0);
    } else timeFBall = 2.6 * Math.pow(this.mass, 1.0 / 6.0);
    return timeFBall;
  }

  heigthFireBall() {
    return 0.75 * this.diameterMax() 
  }

  burningRate() {
    let m = this.mass / (0.888 * Math.PI * Math.pow(this.diameterMax(), 2) * this.durationFireBallCombustion())
    return m
  }

  SEPmax() {
    let sep = this.fs * this.burningRate() * this.hCombKJKG
    return sep
  }

  fView(xnp) {
    let X = Math.sqrt(Math.pow(this.heigthFireBall(), 2) + Math.pow(xnp, 2))
    return Math.pow((this.diameterMax() / 2) / (X), 2)
  }

  ta(xnp) {
    let X = Math.sqrt(Math.pow(this.heigthFireBall(), 2) + Math.pow(xnp, 2))

    if (this.humedadRelativa == 0) {
      this.humedadRelativa = 0.001;
    }
    let pHR = this.humedadRelativa / 100.00; 
    let c4 = 2.02;
    let pwo = Math.exp(77.3450 + 0.0057 * (this.tempAmbK) - 7235.0 / (this.tempAmbK)) / Math.pow((this.tempAmbK), 8.2); 
    let pw = pHR * pwo; 

    return c4 * Math.pow(pw * (X - (this.diameterMax() / 2)), -0.09);
  }

  qTermToDistance(xnp) {
    return this.SEPmax() * this.fView(xnp) * this.ta(xnp)
  }

  xDistanceToQTerm(radTermica) {
    const tolerance = 0.01;
    let x = 0;
    var qi = 60;
    for (x = 1; qi > radTermica; x = x + tolerance) {
      qi = this.qTermToDistance(x)
    }
    return x;
  }
}

module.exports = FireBall;