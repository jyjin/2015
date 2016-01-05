$(function() {
	var i = 0;
	var $kd = $('.kdivide');

	/*当前页面赋值*/
	function up() {
		i++;
		if (i == $kd.length) {
			i = 0
		};
	}

	function down() {
		i--;
		if (i < 0) {
			i = $kd.length - 1
		};
	}

	/*页面滑动*/
	function run() {
		// $('body').animate({
		// 	scrollTop: $kd.eq(i).offset().top
		// }, 500)
		console.log('i:'+i+'---'+$kd.eq(i).offset().top);
		$('body').scrollTop($kd.eq(i).offset().top);
	};

	function go() {
		up();
		run();
		setTimeout(function() {
			$arrow.one('click', go)
		}, 1000)
	};

	/*响应鼠标*/
	$(document).on('mousewheel', function(event) {
		if (event.deltaY < 0) {
			up()
		} else {
			down()
		}
		run();
	
	});
})