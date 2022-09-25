$(document).ready(function (params) {
    console.log("szia");
    setInterval(()=>{Igazitas();}, 100)
    
    function Igazitas(params) {            
        if ($(window).width() > 870) {
            $("#tagok div").css("padding-top", "20px")
        }
        else if ($(window).width() > 650) {
            $("#tagok div").css("padding-top", "35px")
            $("#tagok div").removeClass("col-12");
        }
        else{
            $("#tagok div").addClass("col-12");
            $("#tagok div").css("padding-top", "50px")
        }
    }            
})
