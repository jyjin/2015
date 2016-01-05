$(function() {

	var arr = [1, 2, 3, 4, 5, 6]
	var first = _.first(arr, 2)
	var last = _.last(arr, 2)
	console.log('first:' + first + 'last:' + last);
	//-----------------------------------------------------------------------------------------
	//first:
	//      返回前first位的数组，长度不足返回原数组
	//last:
	//      返回后last位的数组，长度不足返回原数组
	//-----------------------------------------------------------------------------------------

	var arr1 = [1, 2, 1, 3, 5, 6, 3]
	var index = _.indexOf(arr1, 3)
	var index1 = _.indexOf(arr1, 4)
	var lastIndex = _.lastIndexOf(arr1, 3)
	var lastIndex1 = _.lastIndexOf(arr1, 4)
	console.log('indexOf 3:' + index)
	console.log('indexOf 4:' + index1)
	console.log('lastIndexOf 3:' + lastIndex)
	console.log('lastIndexOf 4:' + lastIndex1);
	//-----------------------------------------------------------------------------------------
	//indexOf:
	//      目标元素第一个匹配的角标，没有返回-1
	//lastIndexOf:
	//      目标元素最后一个匹配的角标，没有返回-1
	//-----------------------------------------------------------------------------------------

	var withoutArr = _.without([1, 2, 3, 4, 5, 5, 3, 1], 1, 3, 5);
	console.log(withoutArr)
	var unionArr = _.union([1, 2, 3], [3, 4, 5], [4, 5, 6])
	console.log(unionArr);
	//-----------------------------------------------------------------------------------------
	//without:
	//      返回取出若干指定元素后的数组
	//union:
	//      返回合并后的数组，并去重
	//-----------------------------------------------------------------------------------------

	var func = function(v) {
		console.log('1秒后显示：' + v)
	}
	_.delay(func, 1000, 'underscore')
	_.delay(function() {
		console.log('逗我么');

	}, 1000, 'underscore');
	//----------------------------------------------------------------------------------------
	//delay = setTimeout
	//----------------------------------------------------------------------------------------

	var input = function(name, enu) {
		return enu ? 'Mr.' + name : 'Mrs.' + name  
	}

	input = _.wrap(input, function(input) {
		return 'hello,' + input('Tom', 0);
	})
	console.log(input())

	func = _.wrap(func,function(func){
		console.log('before func excute...')
		func('func excute now...')
	})
	func();

})