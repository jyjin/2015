var divView = {
	ele: '#divTip',
	tip: 'hello,underscore',
	resetTip: 'click me',
	onClick: function() {
		$(this.ele).html(this.tip);
	},
	dblClick: function() {
		$(this.ele).html(this.resetTip);
	}
}
_.bindAll(divView, 'onClick', 'dblClick');
$(divView.ele).bind('click', divView.onClick).bind('dblclick', divView.dblClick);

//---------------------------------------------------------------------------------------
//bindAll作用：
//       是为了在事件绑定后,事件回调函数中的this指向仍然指向divView
//---------------------------------------------------------------------------------------

var tmp = _.keys(divView);

for (var i = 0, l = tmp.length; i < l; i++)
	console.log(tmp[i]);

//---------------------------------------------------------------------------------------
//keys作用：
//       检索对象属性名称
//---------------------------------------------------------------------------------------
