var Person = Backbone.Model.extend({
	defaults: {
		name: 'jyjin',
		sex: 'male'
	}
})

var man = new Person();
man.on('change', function() {
	console.log('Person changed')
})

man.set('name', 'jyjin');
//----------------------------------------------------------------------------------------
//1.backbone对象的初始化，通过set方法初始化属性
//2.事件绑定只能是实力化后的对象
//3.对象属性赋值了，但和原值相同，不触发changes事件
//----------------------------------------------------------------------------------------

man.on('change:sex', function(model, value) {
	console.log('the last sex value is ' + value);
})

man.set('sex', 'female');
//----------------------------------------------------------------------------------------
//1.backbone 可监听指定属性值的变化
//2.事件回调函数，第一个参数model，第二个参数value
//----------------------------------------------------------------------------------------

var student = Backbone.Model.extend({
	defaults: {
		name: '',
		age: 18,
		score: 60
	}
})
var tom = new student();
tom.on('change:age', function(model, value) {
	var oldage = model.previous('age');
	if (oldage < value) {
		console.log('你又老了' + (value - oldage) + '岁')
	} else if (oldage == value) {
		console.log('你的年龄没变')
	} else {
		console.log('你又年轻了' + (oldage - value) + '岁')
	}
})
tom.on('change:score', function(model, value) {
	var oldscore = model.previous('score');
	if (oldscore < value) {
		console.log('你比上次进步了' + (value - oldscore) + '分')
	} else if (oldscore == value) {
		console.log('你的成绩没变')
	} else {
		console.log('你比上次落后了' + (oldscore - value) + '分')
	}
})
tom.set({
	'age': 19,
	'score': 80
})
tom.set('age', 18)
tom.set('score', 58);
//----------------------------------------------------------------------------------------
//model.attributes属性等同改变后原实例化对象
//      model.preiousAttributes()
//  即：model.attributes.name = new Person().name
//      model.attributes.sex = new Person().sex
//----------------------------------------------------------------------------------------

var m = 0;
var n = 0;
function ca() {
	m++
	console.log('a事件次数：' + m)
}
function cb() {
	n++
	console.log('b事件次数：' + n)
}
tom.on('ea', ca)
tom.on('eb', cb)
tom.trigger('ea eb')
tom.off('eb')
// tom.trigger('ea eb')
