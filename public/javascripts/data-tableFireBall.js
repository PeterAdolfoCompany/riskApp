//----------------------------------------
//  Datatables.net
//----------------------------------------

var dataForFireBall = data.filter(function(el){
  return el.hckjkg > 1000 && el.uel !== "9999.0"
});

function dataTableFireBall() {
  $('#data-tableFireBall').DataTable({
    data: dataForFireBall, 
    
    "ordering": false,
    "scrollY": "500px", 
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
    document.getElementById("fbSubstance").value = dataForFireBall[table.row(this).index()].name;
    document.getElementById("fbHckjkg").value = dataForFireBall[table.row(this).index()].hckjkg;
  });
}

dataTableFireBall();
