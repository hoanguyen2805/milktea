$(document).ready(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() > $("#navi-2").height()) {
            $("#navi-2").addClass("navbar-fixed-top");
        } else {
            $("#navi-2").removeClass("navbar-fixed-top");
        }
    });
});