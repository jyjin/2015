	var App = function(){}

	App.Routers.Main = Backbone.Routers.extend({
		routes:{
			"":"index",
			"/page1":"/getPage"
		},

		index:function(){
			//homepage
		},

		getPage:function(){
			//pagelist
		}
	})
	return App;
