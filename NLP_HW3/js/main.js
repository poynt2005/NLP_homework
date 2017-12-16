$(document).ready(function(){
  new WOW().init();

  $(".q1-btn").click(function (){
		$('html, body').animate({
			scrollTop: $("#q1").offset().top
		}, 1000);
	});
});
