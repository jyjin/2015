$(function() {
		var Student = Backbone.Model.extend({
			name: '',
			score: 0,
			code: ''
		})
		var StudentList = Backbone.Collection.extend({
			model: Student
		})
		var data = [{
			name: 'Tom',
			score: 90,
			code: '001'
		}, {
			name: 'Mokia',
			score: 55,
			code: '002'
		}, {
			name: 'Kelly',
			score: 95,
			code: '003'
		}]
		var stuList = new StudentList(data)
		for (var i = 0, l = stuList.models.length; i < l; i++) {
			console.log(stuList.models[i].toJSON())
		}

		var stuList1 = new Backbone.Collection(data, {
			model: Student
		})
		for (var i = 0, l = stuList1.models.length; i < l; i++) {
			console.log(stuList.models[i].toJSON())
		}
	})
	//-------------------------------------------------------------------------------
	//Collection集合对象的两种构建方式
	//     1.var list = Backbone.Collection.extend({model:Model name})
	//		 new list(data)
	//     2.new Backbone.Collection(data,{model:Model name})
	//-------------------------------------------------------------------------------