var $doc = $(document);
var $tran = $('#tran2');
var $wrap = $('#wrap');
var tmp, deg = degX = degY = degZ = 0;
var getOrigin = function() {
	tmp = $tran.css('perspectiveOrigin').split(' ');
	for (var i = 0, length = tmp.length; i < length; i++) {
		tmp[i] = parseInt(tmp[i])
	}
	return tmp;
}

var getDeg = function() {
	return parseInt($tran.css('rotateX'));
}

tmp = getOrigin();
// deg = getDeg();

var setOrigin = function(orgnArr) {
	$tran.css({
		'perspective-origin': orgnArr.join('% ') + '%'
	});
}

var setDeg = function(deg) {
	$tran.css({
			'transform': 'rotateZ(' + deg + 'deg)'
		})
		// $tran.css({'transform':'rotateX('+deg+'deg) rotateY('+deg+'deg) rotateZ('+deg+'deg)'})

}

$(function() {

	$(document).keydown(function() {
		var e = window.event;
		if (e.ctrlKey) {
			if (e.keyCode == 37 && e.ctrlKey) {
				tmp[0] -= 5;
			} else if (e.keyCode == 38 && e.ctrlKey) {
				tmp[1] += 5;
			} else if (e.keyCode == 39 && e.ctrlKey) {
				tmp[0] += 5
			} else if (e.keyCode == 40 && e.ctrlKey) {
				tmp[1] -= 5
			}
			setOrigin(tmp);
		} else {
			if ((e.keyCode) == 37) {
				deg++
			} else if (e.keyCode == 38) {
				deg++
			} else if (e.keyCode == 39) {
				deg--
			} else if (e.keyCode == 40) {
				deg--
			}
			setDeg(deg);
		}
	})

})

// $(function() {
// 	var win = window.open('', '', 'width=900,height=800');
// 	win.document.write('this is new win...');
// })