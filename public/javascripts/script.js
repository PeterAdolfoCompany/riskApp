document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

}, false);

// JS PARA EL NAV BAR -----------------------------

$(".sidebar-dropdown > a").click(function () {
  $(".sidebar-submenu").slideUp(200);
  if (
    $(this)
    .parent()
    .hasClass("active")
  ) {
    $(".sidebar-dropdown").removeClass("active");
    $(this)
      .parent()
      .removeClass("active");
  } else {
    $(".sidebar-dropdown").removeClass("active");
    $(this)
      .next(".sidebar-submenu")
      .slideDown(200);
    $(this)
      .parent()
      .addClass("active");
  }
});

$("#close-sidebar").click(function () {
  $(".page-wrapper").removeClass("toggled");
});
$("#show-sidebar").click(function () {
  $(".page-wrapper").addClass("toggled");
});
// --------------------------------------------------



//DEL MODAL DE POOLFIRE
$(document).ready(function () {
  $("#continuosLakeDiv").show();
  $("#massiveLeakDiv").hide();
  $("#circularDikekDiv").hide();
  $("#noCircularDikekDiv").hide();
  $('input[type=radio][name=typeLeak]').change(function () {
    if (this.value == '1') {
      $("#continuosLakeDiv").show();
      $("#massiveLeakDiv").hide();
      $("#circularDikekDiv").hide();
      $("#noCircularDikekDiv").hide();
    } else if (this.value == '2') {
      $("#continuosLakeDiv").hide();
      $("#massiveLeakDiv").show();
      $("#circularDikekDiv").hide();
      $("#noCircularDikekDiv").hide();

    } else if (this.value == '3') {
      $("#continuosLakeDiv").hide();
      $("#massiveLeakDiv").hide();
      $("#circularDikekDiv").show();
      $("#noCircularDikekDiv").hide();
    } else if (this.value == '4') {
      $("#continuosLakeDiv").hide();
      $("#massiveLeakDiv").hide();
      $("#circularDikekDiv").hide();
      $("#noCircularDikekDiv").show();
    }
  });
});