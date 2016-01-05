define(['require', 'module', 'exports', 'jquery','backbone','user'], function(require, module, exports, $,'Backbone', User) {
	function Index() {}

	var log = function(o) {
		console.log('name:' + o.get('name'));
		console.log('birthDate:' + o.get('birthDate'));
	}


	Index.createUser = function() {
		var user = new User()
		log(user)
		var jyjin = new User({
			name: "jyjin",
			birthDate: 2011
		})
		log(jyjin)
	}

	Index.prototype.main = function() {
		$(function() {
			console.log($().jquery);
			Index.createUser();

		});
	}

	module.exports = Index;
})