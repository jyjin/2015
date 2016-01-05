var DO= (function() {
	var p = {};

	p.inner = function(){
		console.log('inner...');
	}

	p.out =function(){
		console.log('out...');
	}
	
	function D() {};


	D.prototype.callInner = function(){
		p.inner();
		p.out();
	}

	D.prototype = p;
	return D;
})(jQuery)

$(function(){
	var d = new DO();
})