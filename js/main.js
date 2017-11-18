'use strict'
var s_idx = 0;
function showSlide(n){
	var slides = $(".Slide");
	
	for(var i = 0 ; i < slides.length ; i++)
		$(slides[i]).css("display","none");

	if(s_idx + 1 > slides.length) s_idx = 0;
	if(s_idx < 0) s_idx = slides.length-1;
	
	$(slides[s_idx]).css("display","block");
}

function getSlide(n){
	showSlide(s_idx += n);
}


$(document).ready(function(){
	$(window).scrollTop(0);
	showSlide(s_idx);
	
	$(".prev").click(function(){
		getSlide(-1);
	});
	
	$(".next").click(function(){
		getSlide(1);
	});
	
	$("#GS").click(function (){
		$('html, body').animate({
			scrollTop: $("#homework").offset().top
		}, 1000);
	});
	
});