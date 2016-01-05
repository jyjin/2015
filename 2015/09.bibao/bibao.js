//动态函数名、参数方法调用
function Func() {}

var argumentsObj = {
	param: 1
};

Func.prototype.add = function(a, b) {
	var r = a.param + b;
	console.log('add:%d+%d=%d\n----------------------', a.param, b, r);
};

Func.prototype.add1 = function(a, b, c) {
	var r = a.param + b + c;
	console.log('add1:%d+%d+%d=%d\n----------------------', a.param, b, c, r);
};

Func.prototype.testMethod = function(bo, str, num, arr) {
	console.log('bo:' + bof);
	console.log('str:' + str);
	console.log('num:' + num);
	console.log('arr:' + arr);
	console.log('--------------------------');
}

var f = new Func();

$.test4 = function(options) {
	console.log('test4:');
	var arugumentsArr = [];
	if (arguments.length < 3)
		return;
	if (f[options]) {
		argumentsArr = Array.prototype.slice.call(arguments, 1, arguments.length);
		for (var i = 0; i < argumentsArr.length; i++) {
			if (typeof argumentsArr[i] === 'string')
				argumentsArr[i] = '\\"' + argumentsArr[i] + '\\"';
		}
		debugger;
		(eval('f["' + options + '"](' + argumentsArr.toString() + ')'));
	}
}

// $.test3 = function(options) {
// 	console.log('test3:');
// 	if (arguments.length < 3)
// 		return;
// 	if (f[options]) {
// 		var argumentsObj = {},
// 			argumentsArr = [];
// 		argumentsObj.param = arguments[1];
// 		argumentsArr = (Array.prototype.slice.call(arguments, 1, arguments.length));
// 		argumentsArr.splice(0, 0, 'argumentsObj').join(',');
// 		(eval('f["' + options + '"](' + argumentsArr.toString() + ')'));
// 	}
// }

$(function() {
	// $.test3('add', 2, 3);
	// $.test3('add1', 2, 3, 4);
	var a = [1, '2', true]
	$.test4('testMethod', false, 'hello world', 23, a);
})



//变量测试
// (function() {
// 	var s = {
// 		a: 1,
// 		b: 'str'
// 	}
// 	$.test = function(options) {
// 		console.log('s1.a:' + s.a + '\ns1.b:' + s.b)
// 		s = $.extend(s, options);
// 		console.log('s2.a:' + s.a + '\ns2.b:' + s.b)
// 		console.log('---------------------|')
// 	}
// })();

// (function() {
// 	$.test1 = function(options) {
// 		var s1 = {
// 			a: 1,
// 			b: 'str'
// 		}
// 		console.log('s1.a:' + s1.a + '\ns1.b:' + s1.b)
// 		s1 = $.extend(s1, options);
// 		console.log('s2.a:' + s1.a + '\ns2.b:' + s1.b)
// 		console.log('---------------------|')
// 	}
// })();

// $(function() {
// 	$.test({
// 		a: 2
// 	});
// 	$.test({
// 		a: 3
// 	})
// 	console.log('---------------------')
// 	$.test1({
// 		a: 2
// 	});
// 	$.test1({
// 		a: 3
// 	})
// });



// function Func() {}

// var argumentsObj = {
// 	param: 1
// };

// Func.prototype.add = function(a, b) {
// 	var r = a.param + b;
// 	console.log('add:%d+%d=%d\n----------------------', a.param, b, r);
// };

// Func.prototype.add1 = function(a, b, c) {
// 	var r = a.param + b + c;
// 	console.log('add1:%d+%d+%d=%d\n----------------------', a.param, b, c, r);
// };

// var f = new Func();

// $.test = function(options) {
// 	console.log('test:');
// 	if (arguments.length < 3)
// 		return;
// 	if (f[options]) {
// 		f[options](arguments[1], arguments[2]);
// 	}
// }

// $.test1 = function(options) {
// 	console.log('test1:');
// 	if (arguments.length < 3)
// 		return;
// 	if (f[options]) {
// 		var argumentsObj = {};
// 		argumentsObj.param = arguments[1];
// 		f[options](argumentsObj, arguments[2]);
// 	}
// }

// $.test2 = function(options) {
// 	console.log('test2:');
// 	if (arguments.length < 3)
// 		return;
// 	if (f[options]) {
// 		var argumentsObj = {};
// 		argumentsObj.param = arguments[1];
// 		if (arguments.length == 3)
// 			f[options](argumentsObj, arguments[2]);
// 		if (arguments.length == 4) {
// 			f[options](argumentsObj, arguments[2], arguments[3]);
// 		}
// 	}
// }

// $.test3 = function(options) {
// 	console.log('test3:');
// 	if (arguments.length < 3)
// 		return;
// 	if (f[options]) {
// 		var argumentsObj = {},
// 			argumentsArr = [];
// 		argumentsObj.param = arguments[1];
// 		argumentsArr = (Array.prototype.slice.call(arguments, 1, arguments.length));
// 		argumentsArr.splice(0, 0, 'argumentsObj').join(',');
// 		(eval('f["' + options + '"](' + argumentsArr.toString() + ')'));
// 	}
// }

// $(function() {
// 	$.test('add', 2, 3);

// 	$.test1('add', 2, 3);

// 	$.test2('add', 2, 3);
// 	$.test2('add1', 2, 3, 4);

// 	$.test3('add', 2, 3);
// 	$.test3('add1', 2, 3, 4);

// })