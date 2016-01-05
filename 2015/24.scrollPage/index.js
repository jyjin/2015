var i = 0;
var wheeling;
var $kd = $('._d');
var $body = $('body');

function up() {
	i++;
	if (i == $kd.length) i = 0;
}

function down() {
	i--;
	if (i == -1) i = $kd.length - 1;
}

function run() {
	var t = $kd.eq(i).offset().top;
	console.log('t:' + t);

	if (navigator.userAgent.indexOf('Firefox') >= 0 || navigator.userAgent.indexOf('LBBROWSER') >= 0) {
		$(document.documentElement).animate({
			'scrollTop': t
		}, 1000)
		return;
	}
	$body.animate({
		scrollTop: t
	}, 500);
}

function mousewheelHandler(event, delta, deltaX, deltaY) {
	if (!wheeling) {
		console.log('start wheeling!');
		if (deltaY > 0) {
			down();
		} else {
			up();
		}
		run();
	}
	clearTimeout(wheeling);
	wheeling = setTimeout(function() {
		console.log('stop wheeling!');
		wheeling = undefined;
	}, 100);

}

function setDivHeight() {
	var h = $(window).height();
	$kd.css('height', h);
}

$(function() {
	setDivHeight();
	var j = 0;
	$body.mousewheel(mousewheelHandler);
	$(window).resize(function() {
		setDivHeight();
		console.log(j++)
		console.log('---------------')
	});
})