//----------------------------------------
// TABLA DE DATOS - Usando Datatables.net
//----------------------------------------

//Se presenta en la tabla solo valores de sustancias inflamables y en estado lìquido:
var dataForPoolFire = data.filter(function(el){
  return el.hckjkg > 1000 && el.uel !== "9999.0" && el.hcstate == "L"
});

function dataTablePoolFire() {
  $('#data-tablePoolFire').DataTable({
    data: dataForPoolFire, //data - para toda la tabla
    
    "ordering": false,
    "scrollY": "500px", //Aqui se puede modificar para moviles
    "scrollCollapse": true,
    "paging": false,
    language: {
      search: "_INPUT_",
      searchPlaceholder: "Search..."
    },
    "dom": ' <"search"f><"top"l>rt<"bottom"ip><"clear">',


    columns: [{
        data: "name"
      },
      {
        data: "cas"
      },
    ]
  });
  var table = $('#data-tablePoolFire').DataTable();

  $('#data-tablePoolFire tbody').on('click', 'tr', function () {

    document.getElementById("name-chemPoolFire").innerHTML = dataForPoolFire[table.row(this).index()].name;
    document.getElementById("pfSubstance").value = dataForTntExplosion[table.row(this).index()].name;
    document.getElementById("pfHckjkg").value = dataForTntExplosion[table.row(this).index()].hckjkg;
    document.getElementById("pfHva").value = dataForTntExplosion[table.row(this).index()].hva;
    document.getElementById("pfHvn").value = dataForTntExplosion[table.row(this).index()].hvn;
    document.getElementById("pfTc").value = dataForTntExplosion[table.row(this).index()].tc;
    document.getElementById("pfMw").value = dataForTntExplosion[table.row(this).index()].mw;
    document.getElementById("pfTb").value = dataForTntExplosion[table.row(this).index()].tb;
    document.getElementById("pfCpla").value = dataForTntExplosion[table.row(this).index()].cpla;
    document.getElementById("pfCplb").value = dataForTntExplosion[table.row(this).index()].cplb;
    document.getElementById("pfCplc").value = dataForTntExplosion[table.row(this).index()].cplc;
    document.getElementById("pfCpld").value = dataForTntExplosion[table.row(this).index()].cpld;
    document.getElementById("pfDliqa").value = dataForTntExplosion[table.row(this).index()].dliqa;
    document.getElementById("pfDliqb").value = dataForTntExplosion[table.row(this).index()].dliqb;
    document.getElementById("pfDliqn").value = dataForTntExplosion[table.row(this).index()].dliqn;
  });
}

dataTablePoolFire();
