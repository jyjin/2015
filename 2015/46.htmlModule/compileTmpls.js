var fs = require('fs');
var path = './view/template';
var encode = 'utf8';
var textType = '.html';
var targetFile = './js/common/templates.js';
var files = [];
var pathes = [];
var walk = require('walk');

var walker = walk.walk(path, {
	followLinks: false
});

walker.on('file', function(root, stat, next) {
	files.push(stat.name.replace(textType, ''));
	pathes.push(root + '/' + stat.name);
	next();
})

walker.on('end', function() {
	fileHandler(files);
})

function trim(data, symbolArray) {
	for (var i = 0, l = symbolArray.length; i < l; i++) {
		while (data.indexOf(symbolArray[i]) != -1) {
			data = data.replace(symbolArray[i], "");
		}
	}
	return data;
}

function fileHandler() {
	var result = '';
	for (var i = 0, l = files.length; i < l; i++) {
		console.log('>>reading the file ' + files[i] + textType + '...');
		var data = fs.readFileSync(pathes[i], encode);
		while (data.indexOf("'") != -1) {
			data = data.replace("'", '"');
		}
		data = trim(data, ["\r\n","\t","\n","  "]);
		data = "Tpl." + files[i] + "='" + data + "';";
		result += data;
		console.log('>>building ' + files[i] + textType + ' success')
	}
	result = '(function(){var Tpl={};' + result + 'window.Tpl=Tpl;})(window)';
	fs.writeFile(targetFile, result, encode);
	console.log('>>building tpl.js success...without error')
}