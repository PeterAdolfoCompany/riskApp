/* TntExplosion.js */
const data = require("./DBCHEM")

//TODO: Aumentar impluso y otros dos metodos a futuro (Multienergy y Baker)

//---------- CONSTANTES --------------------------------------------
const DHCTNT = 4760;; //Calor de combustion del TNT (kj/kg) 
//------------------------------------------------------------------

// ---------------------- METODO TNT EQUIVALENTE (CCPS) ---------------------------------
/* 
 fe                 - Fraccion de energía usualmente entre 0.01 y 0.1
 HCKJKG             - Calor de Combustion (kJ/kg)
 masaGas            - Masa de gas inflamable (kg)
 overPressuteTNT    - Presion de entrada para el calculo de la sobrepresion (kPa)
 xTNT               - Distancia a la que se requiere la presiòn (m)
 */


class TntExplosionModel {

  constructor(obj) {
    this.obj = obj; //Objeto que contiene la informacion a pasar en la clase
    //Sustancia
    this.sustancia = obj;
    // Entalpia de Combustion (kJ/kg) - YAWS - pp582 
    this.hCombKJKG = this.sustancia.hckjkg;
    // Formula para SEP verifica si es o no hidrocarburo
    this.name = this.sustancia.subsName;

    //-------DATOS DENTRO DEL OBJETO --------
    // Masa del gas inflamable
    this.mass = obj.massRelease;
    this.fe = obj.energyFraction; //Fracciòn de energía de 0.01 a 0.1


  }


  //CALCULO DE LA SOBREPRESION (KPA) A UNA DISTANCIA DADA xTNT (m)
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

    //Calculo de Masa equivalente de TNT
    let masaEQTNT = (this.fe * this.hCombKJKG * this.mass) / DHCTNT;

    //Distancia Escalada (m/kg^1/3)
    let z = xTNT / Math.pow(masaEQTNT, 1.0 / 3.0);

    let ablog = a1 + b1 * Math.log10(z);
    let c = c01 + c11 * ablog + c21 * Math.pow(ablog, 2) + c31 * Math.pow(ablog, 3) + c41 * Math.pow(ablog, 4) + c51 * Math.pow(ablog, 5) + c61 * Math.pow(ablog, 6) + c71 * Math.pow(ablog, 7) + c81 * Math.pow(ablog, 8) + c91 * Math.pow(ablog, 9) + c101 * Math.pow(ablog, 10) + c111 * Math.pow(ablog, 11);
    let pres = Math.pow(10, c);
    return pres;

  }

  //CALCULO DE LA DISTANCIA xTNT (m) A UNA SOBREPRESION DADA(KPA)
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

    //Tolerancia del cálculo
    const tolerance = 0.001;

    //Valor de inicio del calculo de dsitancia x a la de sobrepresion overPressureTNT;
    let xTNT = 0;

    //Presion inicial para el cálculo este numero es el maximo reportado por EPA en kPA
    var pres = 33000;

    //Calculo de Masa equivalente de TNT
    let masaEQTNT = (this.fe * this.hCombKJKG * this.mass) / DHCTNT;

    //Calculo de la distancia por iteracion
    for (xTNT = 1; pres > overPressurekPa; xTNT = xTNT + tolerance) {
      //Distancia Escalada (m/kg^1/3)
      const z = xTNT / Math.pow(masaEQTNT, 1.0 / 3.0);

      let ablog = a1 + b1 * Math.log10(z);
      let c = c01 + c11 * ablog + c21 * Math.pow(ablog, 2) + c31 * Math.pow(ablog, 3) + c41 * Math.pow(ablog, 4) + c51 * Math.pow(ablog, 5) + c61 * Math.pow(ablog, 6) + c71 * Math.pow(ablog, 7) + c81 * Math.pow(ablog, 8) + c91 * Math.pow(ablog, 9) + c101 * Math.pow(ablog, 10) + c111 * Math.pow(ablog, 11);
      pres = Math.pow(10, c);
    }
    return xTNT;

  }

}




var objeto = {
  massRelease: 9071.8474, //Masa del gas inflamable (kg)
  energyFraction: 0.05, //Fraccion de energía (0.01 a 0.1)
  // SUSTANCIAS
  subsName: "GAS LP",
  hckjkg: 46088.6,
  //Localizacion geografica del punto de fuga
  lat: -99.212,
  lon: 19.4332
}

var newTNT = new TntExplosionModel(objeto); //211 - PROPANO - 127 Ethane  -130


let distancia = 10; //(m)
let pressure = 6.89; // 1 psi

console.log(`Presion ${newTNT.xToOverpressure(distancia)} kPa a una distancia: de ${distancia} m`, )

console.log(`Presion ${pressure} kPa a una distancia: de ${newTNT.overpressureToDistance(pressure)}m`, )
 
module.exports = TntExplosionModel;