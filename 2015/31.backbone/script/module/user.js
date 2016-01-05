define(['require','exports','module','jquery','backbone','underscore'],function(require,exports,module,$,backbone,_){
	var User = Backbone.Model.extend({
        initialize: function(){
            console.log("---------------------------\ncreating a user... ");
        },
          defaults: {
            name: 'new baby',
            birthDate: new Date().getYear(),
        }
    });
	return User;
})