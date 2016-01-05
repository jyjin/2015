/***
 * @Author:jyjin
 * @Date  :2015.06.09
 */

(function() {
	function kingslide(options) {
		this.id = options.id;
		this.curentImg = 0;
		this.right = 1;
		this.interval = parseInt(options.interval) || 500;
		this.timeInterval = parseInt(options.timeInterval) || 3000;
		this.optWidth = options.optWidth || '10px';
		this.stop = !!options.stop || false;
		this.hover = false; //!!options.hover || false;

		var sildeDiv = $('#' + this.id);
		var imgUl = sildeDiv.find('.slide-img-wrap');
		var img = $('img.slide-img', '#' + this.id);
		var opt = $('.slide-opt-item', '#' + this.id);
		this.imgUl = imgUl;
		this.length = imgUl.find('.slide-img-item').length;

		this.timestamp = function() {
			var timestamp1 = Date.parse(new Date());
			var timestamp2 = (new Date()).valueOf();
			var timestamp3 = new Date().getTime();
			return timestamp1.toString() + timestamp2.toString() + timestamp3.toString();
		}
		this.getBrowerWidth = function() {
			var id = this.timestamp();
			var width = 0;
			var div = '<div id=' + id + ' style="width:100%;height:1px"></div>';
			$('body').append(div);
			div = $('#' + id);
			width = div.width();
			div.remove();
			return width;
		}
		this.optSelect = function(curentImg) {
			$('.slide-opt-item').removeClass('slide-opt-item-hover').eq(curentImg).addClass('slide-opt-item-hover');
		}

		this.init = function() {
			this.width = this.getBrowerWidth();

			img.removeClass('dn').css({
				'width': this.width
			}).parent().css({
				'width': this.width
			});
			imgUl.css({
				'width': this.width
			}).find('ul').css({
				'width': this.width * this.length
			});
			opt.parent().css({
				'width': this.length * (parseInt(this.optWidth) + 10),
				'margin-left': 0 - (this.length * (parseInt(this.optWidth) + 10)) / 2
			});
		}

		this.slide = function() {
			this.curentImg++;
			if (this.curentImg == this.length) {
				this.curentImg = 0;
			}
			d = new Date();
			console.log(d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + " " + d.getMilliseconds());
			this.imgUl.animate({
				'scrollLeft': this.width * (this.curentImg)
			}, 500, function() {
				__kingSlide.optSelect(__kingSlide.curentImg);
				d1 = new Date();
				console.log(d1.getHours() + ":" + d1.getMinutes() + ":" + d1.getSeconds() + " " + d1.getMilliseconds());
			});
		}

		this.slideto = function(to) {
			this.stop();
			this.imgUl.animate({
				'scrollLeft': this.width * to
			}, 500, function() {
				__kingSlide.curentImg = to;
				__kingSlide.optSelect(__kingSlide.curentImg);
				__kingSlide.start();
			});
		}

		this.stop = function() {
			clearInterval(__slideInterval);
			console.log('cleared...........');
		}

		this.reset = function() {
			this.stop();
			this.curentImg = 0;
			this.slide();
		}

		this.start = function() {
			__slideInterval = setInterval(function() {
				__kingSlide.slide();
			}, this.timeInterval)
		}

		this.event = function() {
			if (this.hover) {
				$('#' + this.id).on('mouseover', '.slide-img-item', function() {
					__kingSlide.stop();
				}).on('mouseout', '.slide-img-item', function() {
					__kingSlide.start();
				});
			}

			$('#' + this.id).on('click', '.slide-opt-item', function() {
				var slideOrder = $(this).attr('slide-order');
				__kingSlide.slideto(slideOrder);
			});


			$('#' + this.id).on('click', '.slide-left-btn', function() {
				var $curOpt = $('.slide-opt-item-hover', '#' + __kingSlide.id);
				var $opt = $('.slide-opt-item', '#' + __kingSlide.id);
				var slideOrder = parseInt($curOpt.attr('slide-order'));
				if (slideOrder == 0) {
					$opt.eq(__kingSlide.length - 1).click();
					return;
				}
				$('.slide-opt-item-hover', '#' + __kingSlide.id).prev().click();
			});

			$('#' + this.id).on('click', '.slide-right-btn', function() {
				var $curOpt = $('.slide-opt-item-hover', '#' + __kingSlide.id);
				var $opt = $('.slide-opt-item', '#' + __kingSlide.id);
				var slideOrder = parseInt($curOpt.attr('slide-order'));
				if (slideOrder == __kingSlide.length - 1) {
					$opt.eq(0).click();
					return;
				}
				$('.slide-opt-item-hover', '#' + __kingSlide.id).next().click();
			});

			$(window).resize(function() {
				__kingSlide.init();
				__kingSlide.stop();
				__kingSlide.start();
				console.log('------------')
			});
		}

	}

	$.fn.kingslide = function(options) {
		return this.each(function() {
			var $this = $(this)
			options.id = $this.attr('id');
			__kingSlide = new kingslide(options);
			__kingSlide.init();
			__kingSlide.event();
			__kingSlide.start();
		});
	}

})(jQuery)

$(function() {
	$('#myslide').kingslide({
		timeInterval: 3000,
		interval: 500,
		optWidth: '10px',
		hover: false
	})
})