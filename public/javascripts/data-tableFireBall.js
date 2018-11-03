//----------------------------------------
// TABLA DE DATOS - Usando Datatables.net
//----------------------------------------


//Se presenta en la tabla solo valores con entalpias de combustion y sustancias inflamables:
var dataForFireBall = data.filter(function(el){
  return el.hckjkg > 1000 && el.uel !== "9999.0"
});

function dataTableFireBall() {
  $('#data-tableFireBall').DataTable({
    data: dataForFireBall, //data - para toda la tabla
    
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
  var table = $('#data-tableFireBall').DataTable();

  $('#data-tableFireBall tbody').on('click', 'tr', function () {

    document.getElementById("name-chemFireBall").innerHTML = dataForFireBall[table.row(this).index()].name;
    $('#modal-chemicals-db').modal('hide');

    $('#modal-second').modal('show');

    // alert('Row index: ' + table.row(this).index());
  });
}

dataTableFireBall();
