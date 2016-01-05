(function() {
	function addEventHandler(ele, eName, fun, param) {
		param = param || '';
		var fn = fun;
		if (param) {
			fn = function(e) {
				//fun.call(this, param);
				fun(param);
			}
		}
		if (ele.attachEvent) {
			ele.attachEvent('on' + eName, fn);
			return;
		}
		if (ele.addEventListener) {
			ele.addEventListener(eName, fn, false);
			return;
		}
		ele['on' + eName] = fn;
	};
	window.addEventHandler = addEventHandler;
})(window)

document.ready(function() {
	addEventHandler(window, 'storage', function() {
		console.log('seession changed...');
	});
	// window.addEventListener('storage',function(){
	// 	console.log('>>>>>>>>>>>>>>>>>>>>>>>>')
	// },false);
	localStorage.setItem('a',1);
})