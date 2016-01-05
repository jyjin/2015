function Index() {}

// Function.prototype.getName = function() {
// 	console.log(this.name || this.toString().match(/function\s*([^(]*)\(/)[1]);
// 	return this.name || this.toString().match(/function\s*([^(]*)\(/)[1]
// }

// Object.prototype.getName = function() {
// 	var funcNameRegex = /function (.{1,})\(/;
// 	var results = (funcNameRegex).exec((this).constructor.toString());
// 	return (results && results.length > 1) ? results[1] : "";
// }

Index.constructor = function(){
	// this.newName = function(){
	// 	for(var name in this.global)
	// }
	debugger;
}

$(function() {
	debugger;
	var index = new Index();
	index.getName();
});