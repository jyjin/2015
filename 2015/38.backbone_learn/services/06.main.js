var Student = Backbone.Model.extend({
	initialize: function() {
		this.on('invalid',function(model,error){
			console.log(error)
		})
		this.on('change:name',function(model,value){
			console.log('你修改了name,从'+(model.previous('name')?model.previous('name'):'空')+'修改为'+value)
		})
	},
	defaults: {
		name: '',
		score: 0,
		code: ''
	},
	validate: function(obj) {
		if(!(_.isString(obj.name))||!(_.isNumber(obj.score))||!(_.isString(obj.code))){
			console.log('输入类型有误')
			return 'your have a error message'
		}
	}
})

var tom = new Student();
tom.set({
	name:'Tom',
	score:'90',
	code:'001'
},{validate:true})

tom.set({
	name:'Tom',
	score:90,
	code:'001'
},{silent:true})
console.log(tom.toJSON())
tom.unset('name');
console.log(tom.toJSON())
tom.clear()
console.log(tom.toJSON());
//-----------------------------------------------------------------------------------------------------------------
//1.set方法可接受两个参数，后面参数作相应设置
//		silent:true 忽略所有事件，不触发事件
//      validate:true 开启数据验证事件
//2.invalid事件
//      在初始化方法initialize绑定invalid事件
//      构建validate方法
//      注：validate事件执行>其他事件
//3.validate方法
//      接收一个参数为Model实例引用，可访问相关属性
//      return 返回值 直接打印于控制台
//-----------------------------------------------------------------------------------------------------------------