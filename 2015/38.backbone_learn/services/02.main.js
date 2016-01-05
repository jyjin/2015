$(function() {
	window.Test = Backbone.Model.extend({
		default: {
			content: ''
		}
	})

	window.TestList = Backbone.Collection.extend({
		model: Test
	})

	var data = new TestList([{
			content: 'hello,Backbone',
			name: 'nice to meet you ,Backbone'
		},
		{
			content: 'hello,Backbone',
			name: 'nice to meet you ,too'
		}]) //为什么不能传入两个对象实例化？

	window.TestView = Backbone.View.extend({
		el: $('body'),
		initialize: function() {
			$('#divTip').html(data.models[1].get('name'))
		}
	})

	window.App = new TestView();
	//-----------------------------------------------------------------------------------------------------
	//简单MVC
	//       Backbone.View->Backbone.Collection->Backbone.Model
	//-----------------------------------------------------------------------------------------------------
})