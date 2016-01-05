$(function() {
	var json = [{
		id: '0001',
		a: '0001'
	}, {
		id: '0002',
		a: '0002'
	}];

	getKey = function(data) {
		var keys = [];
		for (var i in data) {
			keys.push(i);
		}
		return keys;
	};

	getStr = function(str) {
		return str = str ? str.toString() : str;
	};

	getAttrHtml = function(data, keys) {
		var attrHtml = '';
		for (var i = 0; i < keys.length; i++) {
			//if(typeof data[keys[i]] === 'object')return;
			attrHtml += " " + getStr(keys[i]) + "='" + getStr(data[keys[i]]) + "'";
		}
		return attrHtml;
	};


	var html = '',
		list = [];
	html += '<div>I am div one</div>';
	list.push(html);
	$.each(json, function(i, item) {
		var keys = getKey(item);
		html = "<li value1='" + item.id + "' b='" + item.a +"'" + getAttrHtml(item, keys)+">00000000001111111</li>";
		list.push(html);
	});
	html = '<div>I am div two</div>';
	list.push(html);
	$('#div').html(list.join(''));
});