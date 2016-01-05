//通用类
var common = {};

common.setHeader = function() {
	$('#header').render('header', {
		title: '图片模板带链接'
	});
}
common.setFooter = function() {
	$('#footer').render('footer');
}

//设置登录信息
common.setLogin = function(userData) {
	$("#username").html(userData.username).prev().attr("src","http://passport.sightp.com/service/avatar?uid="+userData.id);
}

//检查登录状态
common.checkLogin = function() {
	var ajaxSetting = {
		url: 'http://sdk.easyar.com/site/user',
		dataType: 'jsonp'
	};
	$.ajax(ajaxSetting).done(function(data) {
		if (data.errorCode == '0') {
			common.setLogin(data.result)
		}
	})
}

$(function() {
	common.setHeader();
	common.setFooter();
	common.checkLogin();


})