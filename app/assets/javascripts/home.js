// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
$(function() {
  if(document.getElementById("homepage-video")!=null) {
    document.getElementById("homepage-video").playbackRate = 0.75;
    document.getElementById("homepage-video").play();
    document.getElementById('homepage-video').addEventListener('ended',myHandler,false);

    $("div.hidden").fadeIn(5000).removeClass("hidden");

    function myHandler(e) {
      setTimeout(function(){
          document.getElementById('homepage-video').play();
      }, 35000);
    }
  }
})
