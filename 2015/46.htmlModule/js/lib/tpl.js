(function() {
	//单一加载各模板
	// var templateLoader = function(element, template, data) {
	// 	var setting = {
	// 		url: '/view/template/' + template + '.tpl',
	// 		dataType: 'text'
	// 	}
	// 	$.ajax(setting).done(function(res) {
	// 		$(res).tmpl(data).appendTo(element);
	// 	}).fail(function(a, b, c) {
	// 		console.error('Get template error');
	// 	})
	// }

	// var render = function(element, template, data) {
	// 	if (!template) {
	// 		console.error("The parameter <template> can't set null");
	// 		return;
	// 	}
	// 	if (!element.length) {
	// 		console.error("Can't set template of null element");
	// 	}
	// 	templateLoader.apply(this, arguments)

	// }

	// $.fn.render = function(template, data) {
	// 	var _this = $(this);
	// 	if (!template) {
	// 		console.error("The parameter <template> can't set null");
	// 		return;
	// 	}
	// 	templateLoader.call(this, _this, template, data);
	// }
	// window.render = render;

	//后端编译统一预加载
	$.fn.render = function(template, data) {
		var _this = this;
		if (!template) {
			console.error("The parameter <template> can't set null");
			return;
		}
		$(Tpl[template]).tmpl(data).appendTo(_this);
	}
})($, window)