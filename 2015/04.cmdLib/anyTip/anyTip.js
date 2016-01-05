/**
 *提示追加插件
 *@author:jyjin 2014-10-21
 */

define(function(require) {
	var jQuery = require('cjquery');
	(function() {
		var anyTipObj;
		//默认值
		var DEFAULT_OPTIONS = {
			'x': 0,
			'y': 0,
			'tip': '这里是提示',
			'width': '',
			'height': '',
			'radius': '5px',
			'fontFamily': '微软雅黑',
			'fontSize': '14px',
			'color': '#333',
			'borderColor': '#e6e6e6',
			'backgroundColor': '#fff',
			'background': 'none'
		};

		//入口
		jQuery.fn.anyTip = function(options) {
			anyTipObj = $(this);
			return jQuery.anyTip(options);
		};

		//获取元素位置
		function getElementPosition(elementId) {
			var ua = navigator.userAgent.toLowerCase();
			var isOpera = (ua.indexOf('opera') != -1);
			var isIE = (ua.indexOf('msie') != -1 && !isOpera); // not opera spoof
			var el = document.getElementById(elementId);

			if (el.parentNode === null || el.style.display == 'none') {
				return false;
			}

			var parent = null;
			var pos = [];
			var box;

			if (el.getBoundingClientRect) //IE
			{
				box = el.getBoundingClientRect();
				var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
				var scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
				return {
					x: box.left + scrollLeft,
					y: box.top + scrollTop
				};
			} else if (document.getBoxObjectFor) // gecko    
			{
				box = document.getBoxObjectFor(el);
				var borderLeft = (el.style.borderLeftWidth) ? parseInt(el.style.borderLeftWidth) : 0;
				var borderTop = (el.style.borderTopWidth) ? parseInt(el.style.borderTopWidth) : 0;
				pos = [box.x - borderLeft, box.y - borderTop];
			} else // safari & opera    
			{
				pos = [el.offsetLeft, el.offsetTop];
				parent = el.offsetParent;

				if (parent != el) {
					while (parent) {
						pos[0] += parent.offsetLeft;
						pos[1] += parent.offsetTop;
						parent = parent.offsetParent;
					}
				}

				if (ua.indexOf('opera') != -1 || (ua.indexOf('safari') != -1 && el.style.position == 'absolute')) {
					pos[0] -= document.body.offsetLeft;
					pos[1] -= document.body.offsetTop;
				}
			}

			if (el.parentNode) {
				parent = el.parentNode;
			} else {
				parent = null;
			}

			while (parent && parent.tagName != 'BODY' && parent.tagName != 'HTML') { // account for any scrolled ancestors
				pos[0] -= parent.scrollLeft;
				pos[1] -= parent.scrollTop;

				if (parent.parentNode) {
					parent = parent.parentNode;
				} else {
					parent = null;
				}
			}
			debugger;

			return {
				x: pos[0],
				y: pos[1]
			};
		}

		//dom渲染
		var appendDom = function() {
			if (!anyTipObj) {
				console.error('the object is null');
				return;
			}
			var template = "<div class='anytip-wrap'><p class='l-5'></p><p class='anytip-border l-4'></p><p class='anytip-border l-3'></p><p class='anytip-border l-2'></p><p class='anytip-border l-1'></p>";
			template += "<div class='anytip-content-wrap'><p class='anytip-content'>";
			template += DEFAULT_OPTIONS.tip + "<p></div>";
			template += "<p class='anytip-border l-1'></p><p class='anytip-border l-2'></p><p class='anytip-border l-3'></p><p class='anytip-border l-4'></p><p class='l-5'></p></div>"
			anyTipObj.append(template);
			var position = $.getPosition(anyTipObj);
			// console.info('x:'+position.x+'--y:'+position.y);
			$('.anytip-wrap').css({
				'position': 'absolute',
				'left': position.x + DEFAULT_OPTIONS.x,
				'top': position.y + DEFAULT_OPTIONS.y,
				'width': DEFAULT_OPTIONS.width,
				'height': DEFAULT_OPTIONS.height,
				'fontSize': DEFAULT_OPTIONS.fontSize,
				'fontFamily': DEFAULT_OPTIONS.fontFamily,
				'color': DEFAULT_OPTIONS.color,
				'background': DEFAULT_OPTIONS.background,
				'border-color': DEFAULT_OPTIONS.borderColor
			}).find('.anytip-content-wrap').css({
				'background-color': DEFAULT_OPTIONS.backgroundColor,
				'border-color': DEFAULT_OPTIONS.borderColor
			}).end().find('.anytip-border').css({
				'background-color': DEFAULT_OPTIONS.backgroundColor,
				'border-color': DEFAULT_OPTIONS.borderColor
			}).end().find('.l-5').css({
				'border-color': DEFAULT_OPTIONS.borderColor
			});
		};

		//对外接口
		jQuery.extend({
			anyTip: function(options) {
				DEFAULT_OPTIONS = $.extend(DEFAULT_OPTIONS, options);
				console.info(options.tip);
				return appendDom();
			},
			getPosition: function(obj) {
				return getElementPosition(obj.attr('id'));
			}
		});
	})(jQuery);
	return jQuery;
});