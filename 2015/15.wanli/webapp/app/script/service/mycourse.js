/**
 *	Created by jyjin on 2015/4/23.
 */
define(['jquery', 'require', 'module', 'exports', 'tmpl', 'my97'], function($, require, module, exports) {
	function MyCourse() {}

	MyCourse.prototype.loadLeftMenu = function(data) {
		$('#left_menu_tmpl').tmpl(data).appendTo('#left_menu');
	}

	MyCourse.prototype.loadMainContainer = function(data) {
		$('#main_container_tmpl').tmpl(data).appendTo('#main_container');
	}

	MyCourse.prototype.loadUserInfo = function(data) {
		$('#user_wrap_tmpl').tmpl(data).appendTo('#user_wrap');
	}

	MyCourse.prototype.loadFileInfo = function(data) {
		$('#file_content_tmpl').tmpl(data).appendTo('#file_content');
	}

	MyCourse.prototype.loadShareIcon = function(data) {
		$('#file_share_tmpl').tmpl(data).insertBefore('#file_cb');
	}

	MyCourse.prototype.eventHandler = function(data) {
		$('.container-item').on('mouseover', function() {
			var $this = $(this);
			$this.find('.img-delete').removeClass('dn');
		}).on('mouseout', function() {
			var $this = $(this);
			$this.find('.img-delete').addClass('dn');
		});

		//other event...
	}

	MyCourse.prototype.initDateMangent = function() {
		WdatePicker({
			lang: 'en',
			skin: 'twoer',
			eCont: 'date_management',
			onpicked: function(dp) {
				// alert('你选择的日期是:' + dp.cal.getDateStr())
			}
		});
	}

	var mycourse = new MyCourse();

	MyCourse.prototype.init = function() {
		$(function() {
			mycourse.initDateMangent(); //日程表
			mycourse.loadLeftMenu(leftMenu); //左侧菜单
			mycourse.loadMainContainer(containerData); //主内容区
			mycourse.loadUserInfo(userInfo); //用户信息
			mycourse.loadFileInfo(fileInfo); //档案区
			mycourse.loadShareIcon(shareIcon); //档案分享图标
			mycourse.eventHandler(); //事件绑定
		});
	}
	
	module.exports = MyCourse;
});