var fs = require('fs');
var file = './view/template/header.tpl';
var encode = 'utf8';
var targetname = 'header';
var data = fs.readFileSync(file, encode);
for (var i = 0; i < 50; i++) {
	fs.writeFile('./view/template/'+targetname + i + '.tpl', data, encode);
	console.log('>>copy the '+targetname+i+'.tpl success...');
}
console.log('>>building header tpl file success...without error')