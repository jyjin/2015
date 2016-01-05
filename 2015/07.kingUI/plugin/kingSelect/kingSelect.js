/**
 *功能：下拉列表
 *@author:jyjin
 *@date:2014.11.30
 *@edit:2015.01.23
 */
define(function(require) {
	var $ = require('cjquery');

	/**
	 *获取自定义属性key值
	 */
	var getKey = function(data) {
		var keys = [];
		for (var i in data) {
			keys.push(i);
		}
		return keys;
	};

	var getStr = function(str) {
		return str = str ? str.toString() : str;
	};
	/**
	 *获取自定义属性html片段
	 */
	var getAttrHtml = function(data, keys) {
		var attrHtml = '';
		for (var i = 0; i < keys.length; i++) {
			attrHtml += " " + getStr(keys[i]) + "='" + getStr(data[keys[i]]) + "'";
		}
		return attrHtml;
	};

	(function($) {
		var kingSelect = {
			init: function(DEFAULT_OPTIONS_SELECT) {
				var dom;
				selectTarget = $(DEFAULT_OPTIONS_SELECT.id);
				if (DEFAULT_OPTIONS_SELECT.association) {
					dom = "<div class='bg-select'><input data-name='" + DEFAULT_OPTIONS_SELECT.name + "' class='txt-select inp-select ell' title value='请选择'/></div>";
					dom += "<ul class='king-ul dn'>";
					dom += "<li class='king-li-item no-result' value='no-result' title=''><p class='ell tc'>无结果</p></li>";
				} else {
					dom = "<div class='bg-select'><div data-name='" + DEFAULT_OPTIONS_SELECT.name + "' class='txt-select ell' title='请选择'>请选择</div></div>";
					dom += "<ul class='king-ul dn'>";
				}
				$.each(DEFAULT_OPTIONS_SELECT.data, function(i, item) {
					var keys = getKey(item);
					dom += "<li class='king-li-item' value='" + item.id + "' title='" + item.name + "'" + getAttrHtml(item, keys) + " ><p class='ell'>" + item.name + "</p></li>";
				});
				dom += "</ul>"
				selectTarget.html(dom);
			},
			event: function(DEFAULT_OPTIONS_SELECT) {
				$('.bg-select', DEFAULT_OPTIONS_SELECT.id).click(function(e) {
					var $this = $(this);
					var optWrap = $('.king-ul', DEFAULT_OPTIONS_SELECT.id);
					$('.king-ul').each(function(i, item) {
						if ($(item).get(0) !== optWrap.get(0)) {
							$(item).addClass('dn');
						} else {
							optWrap.hasClass('dn') ? optWrap.removeClass('dn') : optWrap.addClass('dn');
						}
					})
					e.stopPropagation();
				});

				$('.king-li-item', DEFAULT_OPTIONS_SELECT.id).click(function(e, flag) {
					var $this = $(this);
					var txtObj = $('.txt-select', DEFAULT_OPTIONS_SELECT.id);
					if (DEFAULT_OPTIONS_SELECT.association) {
						txtObj.val($this.find('p').html()).attr('title', $this.find('p').html());
					} else {
						txtObj.text($this.find('p').html()).attr('value', $this.attr('value')).attr('title', $this.find('p').html());
					}
					$('.king-ul', DEFAULT_OPTIONS_SELECT.id).addClass('dn');
					if (DEFAULT_OPTIONS_SELECT.itemClick) {
						DEFAULT_OPTIONS_SELECT.itemClick($this, flag);
					}
				});

				$(document).on('click', function(e) {
					$('.king-ul').addClass('dn');
				});

				if (DEFAULT_OPTIONS_SELECT.association) {
					$('.txt-select', DEFAULT_OPTIONS_SELECT.id).keyup(function() {
						var $this = $(this);
						var tagStr = $this.val();
						var pEles = $($('.king-ul', DEFAULT_OPTIONS_SELECT.id).find('p'));
						var flag = true;

						$('.king-ul', DEFAULT_OPTIONS_SELECT.id).find('li').addClass('dn');

						$.each(pEles, function(i, pEle) {
							var _p = $(pEle);
							//匹配文本
							if (_p.html().indexOf(tagStr) != -1) {
								//检查层级
								flag = false;
								_p.parent('li').removeClass('dn');
							}
						});

						flag ? $('.no-result', DEFAULT_OPTIONS_SELECT.id).removeClass('dn') : $('.no-result', DEFAULT_OPTIONS_SELECT.id).addClass('dn');
					}).focus(function() {
						//聚焦清空默认值
						var $this = $(this);
						$this.attr('ov', $this.val());
						if ($this.val()) {
							$this.val('');
						}
						$this.keyup();
					}).blur(function() {
						//离焦未赋值还原
						var $this = $(this);
						if ($this.val() === '') {
							$this.val($this.attr('ov'));
						}else{
							if(!$('.no-result', DEFAULT_OPTIONS_SELECT.id).hasClass('dn')){
								$this.val('请选择');
							}
						}
					});
				}
			},
			defaultSelect: function(DEFAULT_OPTIONS_SELECT) {
				if (!DEFAULT_OPTIONS_SELECT.selectId && !DEFAULT_OPTIONS_SELECT.selectName) {
					return;
				}
				$('.king-li-item', DEFAULT_OPTIONS_SELECT.id).each(function(i, item) {
					if ($(item).attr('value') == DEFAULT_OPTIONS_SELECT.selectId && DEFAULT_OPTIONS_SELECT.selectId) {
						$(item).click();
						return;
					}
					if ($(item).find('p').html() == DEFAULT_OPTIONS_SELECT.selectName && DEFAULT_OPTIONS_SELECT.selectName) {
						$(item).click();
						return;
					}
				});
			}
		}

		$.fn.kingSelect = function(options) {
			var selectTarget = $(this);
			if (kingSelect[options]) {
				if (arguments.length == 2) {
					console.log(arguments);
					return kingSelect[options](arguments[1]);
				}
				return kingSelect[options]();
			} else if (typeof options === 'object' || !options) {
				//default operation
				return this.each(function() {
					var data = [{
						"id": "111",
						"name": "我是条件项一"
					}, {
						"id": "222",
						"name": "我是条件项二"
					}, {
						"id": "333",
						"name": "我是条件项三"
					}, {
						"id": "444",
						"name": "我是特长条件项四"
					}];
					var DEFAULT_OPTIONS_SELECT = {
						id: '#' + selectTarget.attr('id') || $(this).attr('id'),
						name: '',
						selectId: '',
						selectName: '',
						association: false,
						itemClick: '',
						data: data
					};
					$.kingSelect(options, DEFAULT_OPTIONS_SELECT);
				});
			} else {
				$.error('The method ' + options + ' does not exist in $.kingSelect');
			}
		};

		$.extend({
			kingSelect: function(options, DEFAULT_OPTIONS_SELECT) {
				DEFAULT_OPTIONS_SELECT = $.extend(DEFAULT_OPTIONS_SELECT, options || {});
				kingSelect.init(DEFAULT_OPTIONS_SELECT);
				kingSelect.event(DEFAULT_OPTIONS_SELECT);
				kingSelect.defaultSelect(DEFAULT_OPTIONS_SELECT);
			}
		})
	})($)
	return $;
});