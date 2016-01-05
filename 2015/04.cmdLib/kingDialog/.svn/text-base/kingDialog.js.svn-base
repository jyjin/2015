/**
 * kingDialog
 * @author:jyjin 2014-11-19
 */
define(function(require, module, exports) {
	var $ = require('cjquery');
	var digTarget;
	(function($) {
		var cover;
		var KING_DIALOG_METHODS = {
			//dialog init
			init: function(DEFAULT_OPTIONS_DIG) {
				var digTarget = $(DEFAULT_OPTIONS_DIG.popId);
				if (cover) cover.removeClass('dn');
				//if the dialog inited or existed, just show it out
				if (!DEFAULT_OPTIONS_DIG.recover && digTarget.html()) {
					KING_DIALOG_METHODS.clearMsg();
					if (DEFAULT_OPTIONS_DIG.loadAfter) {
						DEFAULT_OPTIONS_DIG.loadAfter();
					}
					return;
				}
				//the operation of init dialog
				var dom;
				digTarget.html('');
				dom = "<span class='block pb-close'></span>";
				dom += "<div class='pop-title'>" + DEFAULT_OPTIONS_DIG.title + "</div>";
				dom += "<div class='pop-main'>";
				dom += "<div class='msg-wrap dn'>";
				dom += "<span class='fl block icon-msg mr10'></span>";
				dom += "<span class='fl block txt-msg ell'></span>";
				dom += "<div class='cb'></div></div>";
				if (DEFAULT_OPTIONS_DIG.contentID) {
					dom += $(DEFAULT_OPTIONS_DIG.contentID).html();
				} else if (DEFAULT_OPTIONS_DIG.content) {
					var htmlObj = $("<div id='_tmp'></div>");
					DEFAULT_OPTIONS_DIG.content.each(function() {
						htmlObj.append($(this));
					});
					dom += htmlObj.html();
				} else {
					dom += "<div class='pop-item'>"
					dom += "<span class='fl block pop-name'>名称:</span>";
					dom += "<input type='text' class='fl block pop-val'/>";
					dom += "<span class='cb'></span>";
					dom += "</div>";
				}
				dom += "</div>";
				dom += "<div class='pop-btn'>";
				dom += "<span class='fl block tc pb-cancel'>取消</span>";
				dom += "<span class='fr block tc pb-confirm'>确认</span>";
				dom += "</div>";

				//user operations when dialog init over
				digTarget.append(dom).attr('popid', DEFAULT_OPTIONS_DIG.popId);
				if (DEFAULT_OPTIONS_DIG.loadAfter) {
					DEFAULT_OPTIONS_DIG.loadAfter();
				}
			},
			//the innner event of kingDialog
			defaultEvent: function(e) {
				var target = $(e.target);
				var DEFAULT_OPTIONS_DIG = e.data.parameter;
				if (target.hasClass('pb-close') || target.hasClass('pb-cancel')) {
					if (DEFAULT_OPTIONS_DIG.whenClose) {
						DEFAULT_OPTIONS_DIG.whenClose();
					}
					KING_DIALOG_METHODS.close(DEFAULT_OPTIONS_DIG);
				}
				if (target.hasClass('pb-confirm')) {
					if (DEFAULT_OPTIONS_DIG.confirm) {
						DEFAULT_OPTIONS_DIG.confirm();
						return;
					}
					KING_DIALOG_METHODS.close(DEFAULT_OPTIONS_DIG);
				}
			},

			event: function(DEFAULT_OPTIONS_DIG) {
				//if don't recover the dom element, remove the event of previous bind
				$(document).off("click", DEFAULT_OPTIONS_DIG.popId, KING_DIALOG_METHODS.defaultEvent).on('click', DEFAULT_OPTIONS_DIG.popId, {
					parameter: DEFAULT_OPTIONS_DIG
				}, KING_DIALOG_METHODS.defaultEvent);
				if (DEFAULT_OPTIONS_DIG.dragable) {
					require('kingDragable');
					var dragAreaId = $('.pop-title', DEFAULT_OPTIONS_DIG.popId).attr('id');
					$(DEFAULT_OPTIONS_DIG.popId).kingDragable({
						dragAreaId: dragAreaId
					});
				}

				if (DEFAULT_OPTIONS_DIG.otherEvent) {
					DEFAULT_OPTIONS_DIG.otherEvent();
				}
			},

			//the pop close,  hide or remove
			close: function(DEFAULT_OPTIONS_DIG, id) {
				var _id = DEFAULT_OPTIONS_DIG.popId || id;
				//extending call
				if (!DEFAULT_OPTIONS_DIG) {
					$(_id).addClass('dn');
					cover.addClass('dn');
					return;
				}
				//innner call
				if (DEFAULT_OPTIONS_DIG.recover) {
					$(_id).addClass('dn').html('');
					cover.addClass('dn');
					return;
				}
				$(_id).addClass('dn');
				cover.addClass('dn');
			},

			//call function of offering the errormsg show
			errorMsg: function(msg, id) {
				msg = msg || '输入不合法';
				$('.txt-msg', id).html(msg).parent().removeClass('dn');
			},

			clearMsg: function(id) {
				$('.txt-msg', id).html('').parent().addClass('dn');
			}
		};

		var KING_CFM_METHODS = {
			init: function(msg, title) {
				var dom;
				dom = '<div id="kingConfirm" class="king-confirm">';
				dom += '<span class="kcb-close"></span>';
				dom += '<div class="pop-title">';
				if (title) {
					dom += '<span class="confirm-title-name ell">' + title + '</span>';

				} else {

					dom += '<span class="confirm-title-name ell">删除确认</span>';
				}
				dom += '</div>';
				dom += '<div class="confirm-content">';
				dom += '<span class="block fl icon-warning"></span>';
				dom += '<span class="block confirm-tips tc">' + msg + '</span>';
				dom += '<div class="cb"></div>'
				dom += '</div>';
				dom += '<div class="pop-btn">';
				dom += '<span class="kcb-cancel fl block tc">取消</span>';
				dom += '<span class="kcb-confirm fr block tc">确定</span>';
				dom += '</div>';
				dom += '</div>'
				dom += '<div id="kingCover" class="cover"></div>';
				$('body').append(dom);
			},

			//imitate the confirm pop by call differents operation
			event: function(func_cfm, func_csl, callback) {
				$('#kingConfirm').on('click', '.kcb-close', function() {
					func_csl(callback);
				});
				$('#kingConfirm').on('click', '.kcb-confirm', function() {
					func_cfm(callback);
				});
				$('#kingConfirm').on('click', '.kcb-cancel', function() {
					func_csl(callback);
				});
			}
		};

		function yes(callback) {
			callback(true);
			$('#kingCover').remove();
			$('#kingConfirm').remove();
		};

		function no(callback) {
			callback(false);
			$('#kingCover').remove();
			$('#kingConfirm').remove();
		};

		//the enterance of kingDialog
		$.fn.kingDialog = function(options) {
			//call public method of exteral
			if (KING_DIALOG_METHODS[options]) {
				if (arguments.length == 2) {
					return KING_DIALOG_METHODS[options](arguments[1], '#' + $(this).attr('id'));
				}
				return KING_DIALOG_METHODS[options]('', '#' + $(this).attr('id'));
			} else if (typeof options === 'object' || !options) {
				//default operation
				return this.each(function() {
					var id = $(this).attr('id') || 'kingDialog';
					var DEFAULT_OPTIONS_DIG = {
						title: '标题',
						popId: '#' + id,
						dragable: false,
						backgroundID: '#cover',
						contentID: '',
						content: ''
					};
					$.kingDialog(options, DEFAULT_OPTIONS_DIG);
				});
			} else {
				$.error('The method ' + options + ' does not exist in $.kingDialog');
			}
		};

		window.kingConfirm = function(msg, callback, title) {
			KING_CFM_METHODS.init(msg, title);
			KING_CFM_METHODS.event(yes, no, callback);
		};

		window.systemAlert = function(tips, time) {
			if (!time) {
				time = 3;
			}
			time = parseInt(time) * 1000;
			$("body").append("<div class='warning-div'><span class='warning-span'>" + tips + "</span></div>");
			setTimeout(function() {
				$('.warning-div').remove();
			}, time);
		};

		window.systemSaveAlert = function(tips, time) {
			if (!time) {
				time = 3;
			}
			time = parseInt(time) * 1000;
			$("body").append("<div class='save-tip'><span class='save-tip-span'>" + tips + "</span></div>");
			setTimeout(function() {
				$('.save-tip').remove();
			}, time);
		};

		$.extend({
			kingDialog: function(options, DEFAULT_OPTIONS_DIG) {
				DEFAULT_OPTIONS_DIG = $.extend(true, DEFAULT_OPTIONS_DIG, options || {});
				cover = $(DEFAULT_OPTIONS_DIG.backgroundID);
				KING_DIALOG_METHODS.init(DEFAULT_OPTIONS_DIG);
				KING_DIALOG_METHODS.event(DEFAULT_OPTIONS_DIG);
			}
		});
	})($);
	return $;
});