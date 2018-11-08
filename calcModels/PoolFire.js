/* PoolFire.js */
const G = 9.80665;
const R_DRY_AIR = 287.05;

class PoolFire {
  constructor(obj) {
    this.tempAmbiK = obj.tempAmbC + 273.15;
    this.velVientomSeg = obj.velVientomseg;
    this.altitud = obj.altitudM;
    this.humedadRel = obj.humedadRel;
    this.obj = obj;
    this.sustancia = obj;
    this.hVapKJKG = ((this.obj.hva * Math.pow(1 - (this.tempAmbiK / this.obj.tc), this.obj.hvn)) / this.obj.mw) * 1000;
    this.hCombKJKG = this.obj.hckjkg;
    this.tEbullK = parseFloat(this.obj.tb);
    this.cPKJKGK = (parseFloat(this.obj.cpla) + parseFloat(this.obj.cplb * this.tempAmbiK) + parseFloat(this.obj.cplc * Math.pow(this.tempAmbiK, 2)) + parseFloat(this.obj.cpld * Math.pow(this.tempAmbiK, 3))) / (this.obj.mw)
    this.densLiquidATB = this.obj.dliqa * Math.pow(this.obj.dliqb, -1 * Math.pow((1 - this.obj.tb / this.obj.tc), this.obj.dliqn)) * 1000;
    this.hVapKJKGTB = parseFloat(this.hVapKJKG) + parseFloat(this.cPKJKGK) * (this.tEbullK - this.tempAmbiK);
    this.name = this.obj.name;
    this.isfugaContinua = obj.isfugaContinua;
    this.isfugaMasiva = obj.isfugaMasiva;
    this.isDiqueCircular = obj.isDiqueCircular;
    this.isDiqueNoCircular = obj.isDiqueNoCircular;
    this.anchoDiqueNoCircular = obj.anchoDiqueNoCircular;
    this.largoDiqueNoCircular = obj.largoDiqueNoCircular;
    this.isAlturaFlamaThomas = obj.isAlturaFlamaThomas;
    this.isAlturaFlamaPritchard = obj.isAlturaFlamaPritchard;
    this.isBRateMudan = obj.isburningRateMudan;
    this.isBRateStrasser = obj.isburningRateStrasser;
    this.isPointSourceModel = obj.isPointSourceModel;
    this.combustionFractionPointSource = obj.combustionFractionPointSource;
    this.isSolidPlumeModel = obj.isSolidPlumeModel;
    this.spillRate = obj.spillRate;
    this.massRelease = obj.massRelease;
    this.areaDiqueNoCircular = obj.areaDiqueNoCircular;
    this.diametroDiqueCircular = obj.diametroDiqueCircular;
  }

  burningRate() {
    if (this.isBRateStrasser) {
      let c1 = 0.00000127;
      let brate = this.densLiquidATB * c1 * (this.hCombKJKG / (this.hVapKJKGTB + this.cPKJKGK * (this.tEbullK - (this.tempAmbiK))));
      return brate;
    }
    let c1 = 0.001;
    let brate = (c1 * this.hCombKJKG) / (this.hVapKJKGTB + this.cPKJKGK * (this.tEbullK - (this.tempAmbiK)));
    return brate; //(kg/m2*s)
  }

  poolDiameter() {
    if (this.isfugaContinua) {
      let ymax = 0.00000127 * (this.hCombKJKG / this.hVapKJKGTB);
      let diameterMax = 2.0 * Math.sqrt(this.spillRate / (Math.PI * ymax));
      return diameterMax;
    } else if (this.isfugaMasiva) {
      let vf = this.burningRate() / this.densLiquidATB;
      let Dmax = 2 * Math.pow((Math.pow(this.massRelease, 3) * G) / Math.pow(vf, 2), 1.0 / 8.0);
      return Dmax;
    } else if (this.isDiqueCircular) {
      return this.diametroDiqueCircular;
    } else if (this.isDiqueNoCircular) {
      let area = this.largoDiqueNoCircular * this.anchoDiqueNoCircular;
      let D = Math.sqrt((4 * area) / Math.PI);
      return D;
    }
  }

  timeToReachPoolSize() {
    if (this.isfugaContinua) {
      let vf = this.burningRate() / this.densLiquidATB;
      let teq = 0.564 * (this.poolDiameter() / (Math.pow((G * vf * this.poolDiameter()), 1.0 / 3.0)));
      return teq; //(s)
    } else if (this.isfugaMasiva) {
      let vf = this.burningRate() / this.densLiquidATB;
      let teq = 0.6743 * Math.pow(this.massRelease / (G * Math.pow(vf, 2.0)), (1.0 / 4.0));
      return teq; //(s)
    }
    return 0;
  }

  timeDurationPoolFire(volLiquido) {
    let regresionRate = this.burningRate() / this.densLiquidATB;
    return 4 * volLiquido / (Math.PI * Math.pow(this.poolDiameter(), 2) * regresionRate);
  }

  ux() {
    let pressureLevel = 101325.0 * Math.pow(1 - 2.5577E-5 * this.altitud, 5.25588); //(Pa)
    let densAir = pressureLevel / (R_DRY_AIR * this.tempAmbiK);
    let ux = this.velVientomSeg * Math.pow((G * this.burningRate() * this.poolDiameter()) / densAir, -1.0 / 3.0);
    if (ux < 1.0) {
      ux = 1.0;
    }
    return ux;
  }

  alturaFlama() {
    let pressureLevel = 101325.0 * Math.pow(1 - 2.5577E-5 * this.altitud, 5.25588);
    var densAir = pressureLevel / (R_DRY_AIR * (this.tempAmbiK));
    if (this.isAlturaFlamaThomas) {
      if (this.velVientomSeg == 0) {
        return 42.0 * this.poolDiameter() * (Math.pow(this.burningRate() / (densAir * Math.sqrt(G * this.poolDiameter())), 0.61));
      }
      let flameHeightThomas = 55.0 * this.poolDiameter() * (Math.pow(this.burningRate() / (densAir * Math.sqrt(G * this.poolDiameter())), 0.67)) * Math.pow(this.ux(), -0.21);
      return flameHeightThomas;
    } else if (this.isAlturaFlamaPritchard) {
      let flameHeight = 10.615 * this.poolDiameter() * (Math.pow(this.burningRate() / (densAir * Math.sqrt(G * this.poolDiameter())), 0.305)) * Math.pow(this.ux(), -0.03);
      return flameHeight;
    }
  }


  SEP() {
    if ((this.name.includes("ANE") || this.name.includes("GAS") || this.name.includes("DIESEL") || this.name.includes("TURBO")) && (this.poolDiameter() > 15)) {
      return 140 * Math.exp(-0.12 * this.poolDiameter()) + 20 * (1 - Math.exp(-0.12 * this.poolDiameter()));
    } else {
      return (0.35 * this.burningRate() * this.hCombKJKG) / (1 + 72.0 * Math.pow(this.burningRate(), 0.61));
    }
  }

  anguloFlama() {
    if (this.velVientomSeg <= 0.0) {
      return 0.0;
    }
    let v = 1.555E-14 * Math.pow((this.tempAmbiK), 3) + 9.5728E-11 * Math.pow(this.tempAmbiK, 2 + 3.7604E-8 * this.tempAmbiK + 3.4484E-6);
    let Fr = Math.pow(this.velVientomSeg, 2.0) / (G * this.poolDiameter());
    let Re = this.velVientomSeg * this.poolDiameter() / v;
    let c = 0.666 * Math.pow(Fr, 0.333) * Math.pow(Re, 0.117);
    let tiltAngle = Math.sin((Math.sqrt((4 * Math.pow(c, 2) + 1.0)) - 1.0) / (2.0 * c));
    return tiltAngle;
  }

  viewFactor(x) {
    if (this.isSolidPlumeModel) {
      let poolRadio = this.poolDiameter() / 2.0;
      let alfa = this.alturaFlama() / poolRadio;
      let beta = x / poolRadio;
      let anglerad = this.anguloFlama();
      let seno = Math.sin(anglerad);
      let coseno = Math.cos(anglerad);

      let A = Math.sqrt(Math.pow(alfa, 2.0) + Math.pow(beta + 1.0, 2.0) - 2.0 * alfa * (beta + 1.0) * seno);
      let B = Math.sqrt(Math.pow(alfa, 2.0) + Math.pow(beta - 1.0, 2.0) - 2.0 * alfa * (beta - 1.0) * seno);
      let C = Math.sqrt(1 + (Math.pow(beta, 2.0) - 1.0) * Math.pow(coseno, 2.0));
      let D = Math.sqrt((beta - 1.0) / (beta + 1.0));
      let E = alfa * coseno / (beta - alfa * seno);
      let F = Math.sqrt(Math.pow(beta, 2.0) - 1.0);
      let F2 = Math.pow(F, 2.0);
      let alfa2 = Math.pow(alfa, 2.0);
      let Fv1 = -E * Math.atan(D);
      let Fv2 = E * ((alfa2 + Math.pow(beta + 1.0, 2.0) - 2.0 * beta * (1.0 + alfa * seno)) / (A * B)) * Math.atan((A * D) / B);
      let Fv31 = Math.atan((alfa * beta - F2 * seno) / (F * C));
      let Fv32 = Math.atan(((F2 * seno) / (F * C)));
      let Fv3 = (coseno / C) * (Fv31 + Fv32);
      let Fv = (Fv1 + Fv2 + Fv3) / Math.PI;
      let Fh1 = Math.atan(1 / D);
      let Fh21 = Math.atan((alfa * beta - F2 * seno) / (F * C));
      let Fh22 = Math.atan(F * seno / C);
      let Fh2 = (seno / C) * (Fh21 + Fh22);
      let Fh3 = ((alfa2 + (Math.pow((beta + 1.0), 2.0) - 2.0 * (beta + 1 + alfa * beta * seno))) / (A * B)) * Math.atan(A * D / B);
      let Fh = (Fh1 + Fh2 - Fh3) / Math.PI;

      let Fvista = Math.sqrt(Math.pow(Fv, 2.0) + Math.pow(Fh, 2.0));

      return Fvista;
    }
    return 1 / (4 * Math.PI * Math.pow(x, 2))
  }

  ta(x) {
    if (this.humedadRel == 0) {
      this.humedadRel = 0.001;
    }
    let pHR = this.humedadRel / 100.00;
    let c4 = 2.02;
    let pwo = Math.exp(77.3450 + 0.0057 * (this.tempAmbiK) - 7235.0 / (this.tempAmbiK)) / Math.pow((this.tempAmbiK), 8.2);
    let pw = pHR * pwo;

    return c4 * Math.pow(pw * (x), -0.09);
  }

  qTermAtX(x) {
    if (this.isPointSourceModel) {
      let poolArea = (Math.PI * Math.pow(this.poolDiameter(), 2)) / 4;
      return this.ta(x) * this.combustionFractionPointSource * this.burningRate() * this.hCombKJKG * this.viewFactor(x) * poolArea
    }
    return this.SEP() * this.viewFactor(x) * this.ta(x);
  }

  xTerm(qTerm) {
    let xCalc = 0.1;
    let qi = 60.0;
    let tolerance = 0.01
    for (xCalc; qi > qTerm; xCalc = xCalc + tolerance) {
      qi = this.qTermAtX(xCalc)
    }
    return xCalc;
  }

  xTermAtQNivelPiso(q) {
    let x = this.xTerm(q);
    console.log("Equis: ", x)
    let a = this.alturaFlama() / 2;
    console.log("Equisa: ", a)

    let b = Math.sqrt(Math.pow(x, 2) - Math.pow(a, 2))
    console.log("Equisb: ", b)
    return b
  }

  probit(tiempoExposicionS, x) {
    return -14.9 + 2.56 * Math.log(tiempoExposicionS * Math.pow(this.qTermAtX(x) * 1000, 4 / 3) / 10000);
  }

  erf(x) {
    var m = 1.00;
    var s = 1.00;
    var sum = x * 1.0;
    for (var i = 1; i < 50; i++) {
      m *= i;
      s *= -1;
      sum += (s * Math.pow(x, 2.0 * i + 1.0)) / (m * (2.0 * i + 1.0));
    }
    return 2 * sum / Math.sqrt(3.14159265358979);
  }

  probitPrcFatalidades(te, x) {
    let probit = this.probit(te, x);
    if (probit < 0) {
      return 0.00;
    } else if (probit > 8.09) {
      return 100.00
    }
    return 50 * (1 + ((probit - 5) / Math.abs(probit - 5)) * this.erf(Math.abs(probit - 5) / Math.sqrt(2)));
  }
}

module.exports = PoolFire;