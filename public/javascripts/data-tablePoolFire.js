//----------------------------------------
// Datatables.net
//----------------------------------------
var dataForPoolFire = data.filter(function(el){
  return el.hckjkg > 1000 && el.uel !== "9999.0" && el.hcstate == "L"
});

function dataTablePoolFire() {
  $('#data-tablePoolFire').DataTable({
    data: dataForPoolFire, 
    
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
  var table = $('#data-tablePoolFire').DataTable();

  $('#data-tablePoolFire tbody').on('click', 'tr', function () {
    document.getElementById("name-chemPoolFire").innerHTML = dataForPoolFire[table.row(this).index()].name;
    document.getElementById("pfSubstance").value = dataForPoolFire[table.row(this).index()].name;
    document.getElementById("pfHckjkg").value = dataForPoolFire[table.row(this).index()].hckjkg;
    document.getElementById("pfHva").value = dataForPoolFire[table.row(this).index()].hva;
    document.getElementById("pfHvn").value = dataForPoolFire[table.row(this).index()].hvn;
    document.getElementById("pfTc").value = dataForPoolFire[table.row(this).index()].tc;
    document.getElementById("pfMw").value = dataForPoolFire[table.row(this).index()].mw;
    document.getElementById("pfTb").value = dataForPoolFire[table.row(this).index()].tb;
    document.getElementById("pfCpla").value = dataForPoolFire[table.row(this).index()].cpla;
    document.getElementById("pfCplb").value = dataForPoolFire[table.row(this).index()].cplb;
    document.getElementById("pfCplc").value = dataForPoolFire[table.row(this).index()].cplc;
    document.getElementById("pfCpld").value = dataForPoolFire[table.row(this).index()].cpld;
    document.getElementById("pfDliqa").value = dataForPoolFire[table.row(this).index()].dliqa;
    document.getElementById("pfDliqb").value = dataForPoolFire[table.row(this).index()].dliqb;
    document.getElementById("pfDliqn").value = dataForPoolFire[table.row(this).index()].dliqn;
  });
}

dataTablePoolFire();
