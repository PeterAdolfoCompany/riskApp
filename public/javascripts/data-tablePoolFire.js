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
    $('#modal-chemicals-db').modal('hide');

    $('#modal-second').modal('show');

    // alert('Row index: ' + table.row(this).index());
  });
}

dataTablePoolFire();
