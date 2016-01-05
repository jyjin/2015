var _i = 0;
var _up = 0;
var _wheeling;
var $kd = $('._d');
var $body = $('body');

function up() {
	_i++;
	_up = 1;
	if (_i == $kd.length) _i = 0;
}

function down() {
	_i--;
	_up = 0;
	if (_i == -1) _i = $kd.length - 1;
}

function run() {
	$kd.css({
		'zIndex': 0
	})
	var top = _up == 1 ? '100%' : '-100%';
	if (_i == $kd.length - 1) {
		$kd.eq(0).css({
			'zIndex': _i + 1,
			'top': top
		}).animate({
			top: 0
		})
	} else {

		$kd.eq(_i + 1).css({
			'zIndex': _i + 1,
			'top': top
		}).animate({
			top: 0
		})
	}
}

function mousewheelHandler(event, delta, deltaX, deltaY) {
	if (!_wheeling) {
		console.log('start wheeling!');
		if (deltaY > 0) {
			down();
		} else {
			up();
		}
		run();
	}
	clearTimeout(_wheeling);
	_wheeling = setTimeout(function() {
		console.log('stop wheeling!');
		_wheeling = undefined;
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