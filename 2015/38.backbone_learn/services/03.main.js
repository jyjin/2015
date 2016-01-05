$(function() {

	var data = {
		name: 'Backbone',
		version: '1.1.2'
	}

	var underSccore_Object = _(data);
	console.log(underSccore_Object.value().name + '_' + underSccore_Object.value().version);
	//-----------------------------------------------------------------------------------------------------
	//underscore封装
	//       原生js对象封装undersocre对象，通过value()访问对象属性
	//-----------------------------------------------------------------------------------------------------

	var data1 = [1, 3, 2, 5, 4];
	var underSccore_Object1 = _(data1);
	console.log('max:' + underSccore_Object1.max() + '_min:' + underSccore_Object1.min());
	//-----------------------------------------------------------------------------------------------------
	//underscore封装
	//       封装后的underscore对象可直接使用underscore内部函数库
	//-----------------------------------------------------------------------------------------------------

	console.log('each不可返回值')
	_.each([1, 2, 3, 4, 5, 6], function(n) {
		if (!(n % 2)) console.log(n)
	})

	console.log('map返回条件值，其他undefined')
	var arr = _.map([1, 2, 3, 4, 5, 6], function(n) {
		if (!(n % 2)) return n;
	})

	for (var i = 0, l = arr.length; i < l; i++) {
		if (arr[i] != undefined)
			console.log(i + '->' + arr[i]);
	}
	//-----------------------------------------------------------------------------------------------------
	//each和map
	//      each内置遍历，无返回值
	//		map匹配返回原值至数组，未匹配返回undefined至数组，结果为可能含undefined的数组
	//-----------------------------------------------------------------------------------------------------

	var firstfind = _.find([1, 3, , 5, 7, 9], function(n) {
		if (!(n % 2))
			return n;
	})
	console.log(firstfind);

	var filterArr = _.filter([1, 2, 3, 4, 5, 6], function(n) {
		if (!(n % 2)) return n;
	})
	console.log(filterArr);
	//-----------------------------------------------------------------------------------------------------
	//find和filter
	//      find返回第一个匹配值，没有匹配则undefined
	//		filter返回匹配条件的数组，没有匹配返回空数组
	//      注：map返回原数组的长度数组，没有匹配会将undefined作为数据元素，这是和filter的区别
	//-----------------------------------------------------------------------------------------------------

	var stu = [{
		name: '张三',
		score: '60'
	}, {
		name: '李四',
		score: '40'
	}, {
		name: '王五',
		score: '80'
	}]

	var max = _.max(stu, function(n) {
		return n.score
	})
	console.log('得分最高的是：' + max.name + max.score + '分');
	//-----------------------------------------------------------------------------------------------------
	//max/min
	//       max、min除了对单一的数组求值，还可对对象求值，如上例
	//-----------------------------------------------------------------------------------------------------

	var sort = _.sortBy([4, 2, 5, 1, 3]);
	console.log('sort:' + sort)

	var sortAsc = _.sortBy(stu, function(n) {
		return n.score
	});
	var sortDesc = sortAsc.reverse();

	console.log('升序后：')
	_.find(sortAsc, function(n) {
		console.log(n)
	})

	console.log('降序后：')
	_.filter(sortDesc, function(n) {
			console.log(n)
	})
	//-----------------------------------------------------------------------------------------------------
	//sortBy
	//      升序排列，降序需自定义*-1或charCodeAt()*-1或reverse()倒序
	//-----------------------------------------------------------------------------------------------------

	var group = _.groupBy(stu,function(n){
		return n.score>=60
	})
	console.log('group:'+group)

	console.log('---------------------------------');
	var arr = [1,2,3]
	var result = _.find(arr,function(n){
		return n == 2;
	})
	console.log(result)
})