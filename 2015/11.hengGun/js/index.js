function setHeight(){
	$('#main').css('height',$(window).height()-2*(50+20));
	var $page = $('.page');
	var width = ($page.width()+15)*$page.length;
	$('.body-container').width(width);
}

$(function(){
	setHeight();
	$(window).resize(setHeight);
});