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
    document.getElementById("nameChemFB").value = dataForPoolFire[table.row(this).index()].name;
    document.getElementById("hckjkgChemFB").value = dataForPoolFire[table.row(this).index()].hckjkg;
    document.getElementById("hvaFB").value = dataForPoolFire[table.row(this).index()].hva;
    document.getElementById("hvnFB").value = dataForPoolFire[table.row(this).index()].hvn;
    document.getElementById("tcFB").value = dataForPoolFire[table.row(this).index()].tc;
    document.getElementById("mwFB").value = dataForPoolFire[table.row(this).index()].mw;
    document.getElementById("tbFB").value = dataForPoolFire[table.row(this).index()].tb;
    document.getElementById("cplaFB").value = dataForPoolFire[table.row(this).index()].cpla;
    document.getElementById("cplbFB").value = dataForPoolFire[table.row(this).index()].cplb;
    document.getElementById("cplcFB").value = dataForPoolFire[table.row(this).index()].cplc;
    document.getElementById("cpldFB").value = dataForPoolFire[table.row(this).index()].cpld;
    document.getElementById("dlqiaFB").value = dataForPoolFire[table.row(this).index()].dliqa;
    document.getElementById("dlqibFB").value = dataForPoolFire[table.row(this).index()].dliqb;
    document.getElementById("dlqinFB").value = dataForPoolFire[table.row(this).index()].dliqn;


    // alert('Row index: ' + table.row(this).index());
  });
}

dataTablePoolFire();
