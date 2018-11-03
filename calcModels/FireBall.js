/* FireBall.js */
const data = require("./DBCHEM")


class FireBall {
  constructor(obj) {
    this.obj = obj; //Objeto que contiene la informacion a pasar en la clase
    //Sustancia
    this.sustancia = obj;
    // Entalpia de Combustion (kJ/kg) - YAWS - pp582 
    this.hCombKJKG = this.obj.hckjkg;
    // Formula para SEP verifica si es o no hidrocarburo
    this.name = this.sustancia.name;

    //----DATOS DEL CLIMA ---
    this.tempAmbK = obj.tempAmbC + 273.15;
    this.humedadRelativa = obj.humedadRelativa;

    //-------DATOS DENTRO DEL OBJETO --------
    // Masa del gas inflamable (kg)
    this.mass = obj.mass; //
    this.fs = obj.radiationFraction; //Fracciòn de radiacion de 0.2 a 0.4

  }

  // Diametro del Fire Ball (m)

  diameterMax() {
    let Dmax = 5.8 * Math.pow(this.mass, 1.0 / 3.0);
    return Dmax;
  }

  //Tiempo de duración de la combustion en el Fire Ball (s)
  durationFireBallCombustion() {
    let timeFBall;
    if (this.mass < 30000.0) {
      timeFBall = 0.45 * Math.pow(this.mass, 1.0 / 3.0);
    } else timeFBall = 2.6 * Math.pow(this.mass, 1.0 / 6.0);
    return timeFBall;
  }

  heigthFireBall() {
    return 0.75 * this.diameterMax() //CCPS 211
    // return 1 * this.diameterMax() //De kakosimos

  }

  //Burning Rate (kg/m2*s) KAKOSIMOS pp102
  burningRate() {
    let m = this.mass / (0.888 * Math.PI * Math.pow(this.diameterMax(), 2) * this.durationFireBallCombustion())
    return m
  }

  //Fraccion de radiación KAKOSIMOS 102
  //TODO: Calcularlo con ecuaciones

  //SEP (kW/m2)
  SEPmax() {
    let sep = this.fs * this.burningRate() * this.hCombKJKG
    return sep
  }

  //View Factor PointSource de Kakosimos 103 C2.44
  fView(xnp) {
    let X = Math.sqrt(Math.pow(this.heigthFireBall(), 2) + Math.pow(xnp, 2))
    return Math.pow((this.diameterMax() / 2) / (X), 2)
  }

  //Transmitividad atmosférica
  ta(xnp) {
    let X = Math.sqrt(Math.pow(this.heigthFireBall(), 2) + Math.pow(xnp, 2))

    if (this.humedadRelativa == 0) {
      this.humedadRelativa = 0.001;
    }
    let pHR = this.humedadRelativa / 100.00; //La humedad relativa se convierte a parcial numerado entre 0 y 1
    //let radio = this.poolDiameter() / 2.0;
    let c4 = 2.02;
    //Calculo de la Presion Parcial de Vapor de Agua (PA) se puede usar la CCPS 2.2.43?
    let pwo = Math.exp(77.3450 + 0.0057 * (this.tempAmbK) - 7235.0 / (this.tempAmbK)) / Math.pow((this.tempAmbK), 8.2); //(PA)
    let pw = pHR * pwo; //(PA)

    //Calculo de la Transmitividad atmosferica a la distancia x
    return c4 * Math.pow(pw * (X - (this.diameterMax() / 2)), -0.09);
  }

  //CALCULO RADIACION TERMICA A UNA DISTANCIA DADA (kw/m2)
  qTermToDistance(xnp) {
    return this.SEPmax() * this.fView(xnp) * this.ta(xnp)
  }

  //CALCULO DE LA DISTANCIA (m) A UNA RADIACION TERMICA DADA (KW/M2)
  xDistanceToQTerm(radTermica) {

    //Tolerancia del cálculo
    const tolerance = 0.01;

    //Valor de inicio del calculo de dsitancia x;
    let x = 0;

    //Radiacion termica 
    var qi = 60;

    //Calculo de la distancia por iteracion
    for (x = 1; qi > radTermica; x = x + tolerance) {
      qi = this.qTermToDistance(x)
      // console.log(`x ${x} qi ${qi}`)
    }
    return x;
  }
}


var objeto = {
  //DATOS DE CLIMA
  tempAmbC: 25, //Temperatura ambiente C
  humedadRelativa: 50, // Humedad relativa %
  // DATOS DE LA SUSTANCIA
  name: "GAS LP",
  hckjkg: 46088.6,
  //DATOS PARA EL SOURCE
  mass: 21973, //Masa del gas inflamable (kg)
  radiationFraction: 0.314, //Fracciòn de radiacion de 0.2 a 0.4
  // Settings
  rad01: 10,
  rad02: 5,
  rad03: 1.4,
  timeExposition: 10,
  //DATOS DE LOCALIZACION
  lat: -99.212,
  lon: 19.4332
}

var newFB = new FireBall(objeto); //211 - PROPANO - 127 Ethane  -130


let distancia = 150; //(m)
let radiacion = 40; // kW/m2

console.log(`Burning Rate ${newFB.burningRate()} SEP ${newFB.SEPmax()} Ta ${newFB.ta(distancia)} Factor de vista ${newFB.fView(distancia)} Radiacion ${newFB.qTermToDistance(distancia)} kw/m2 a una distancia: de ${distancia} m`, )

//console.log(`Radiacion ${radiacion} kW/m2 a una distancia: de ${newFB.xDistanceToQTerm(distancia)}m`, )

console.log(`A la Radiacion termica: ${radiacion} kW/m2 la distancia es de: ${newFB.xDistanceToQTerm(radiacion)} m`)