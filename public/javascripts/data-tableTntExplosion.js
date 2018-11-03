//----------------------------------------
// TABLA DE DATOS - Usando Datatables.net
//----------------------------------------

//Se presenta en la tabla solo valores de gases inflamables:
var dataForTntExplosion = data.filter(function (el) {
  return el.hckjkg > 1000 && el.uel !== "9999.0" && el.hcstate == "G"
});

function dataTableTntExplosion() {
  $('#data-tableTntExplosion').DataTable({
    data: dataForTntExplosion,

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

  var table = $('#data-tableTntExplosion').DataTable();

  $('#data-tableTntExplosion tbody').on('click', 'tr', function () {
    document.getElementById("name-chemTnt").innerHTML = dataForTntExplosion[table.row(this).index()].name;
    document.getElementById("nameChemTnt").value = dataForTntExplosion[table.row(this).index()].name;
    document.getElementById("hckjkgChemTnt").value = dataForTntExplosion[table.row(this).index()].hckjkg;

    // $('#modal-chemicals-db').modal('hide');

    // $('#modal-second').modal('show');

    // alert('Row index: ' + table.row(this).index());
  });
}

dataTableTntExplosion();

