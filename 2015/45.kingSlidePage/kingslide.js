/***
 * @Author:jyjin
 * @Date  :2015.06.09
 */

var log = function(msg) {
	console.log(msg)
}

var Person = (function() {

	function Person(name, age, _sex, _phone) {
		this.name = name;
		this.age = age;
		var sex = _sex;
		var phone = _phone;

		this.family = [];

		this.setPhone = function(_phone) {
			phone = _phone;
		}

		this.getPhone = function() {
			return phone;
		}

		this.setSex = function(_sex) {
			sex = _sex;
		}

		this.getSex = function() {
			return sex;
		}
	}

	Person.prototype.setName = function(name) {
		this.name = name;
	}

	Person.prototype.setAge = function(name) {
		this.name = name;
	}

	return Person;
})(window, $)

var Student = (function() {

	function Student() {
		var stuCode;

		this.setStuCode = function(_stuCode) {
			stuCode = _stuCode;
		}

		this.getStuCode = function() {
			return stuCode;
		}
	}

	Student.prototype = new Person();

	return Student;
})(window, $)


var res = {
	"errorCode": "0",
	"result": {
		"10": {
			"name": "个人免费版",
			"fee": 0,
			"cost": 0,
			"duration": false,
			"rights": [{
				"name": "创建AR应用数",
				"hasRight": true,
				"count": 10
			}, {
				"name": "同一个邀请码应用上限",
				"hasRight": true,
				"count": 20
			}, {
				"name": "公共频道应用上限",
				"hasRight": false,
				"count": 0
			}, {
				"name": "免费模板",
				"hasRight": true
			}, {
				"name": "企业模板",
				"hasRight": false
			}, {
				"name": "高级邀请码",
				"hasRight": true
			}, {
				"name": "扫描次数统计(即将上线)",
				"hasRight": true
			}, {
				"name": "用户城市分布统计(即将上线)",
				"hasRight": false
			}, {
				"name": "用户设备类型分布统计(即将上线)",
				"hasRight": false
			}, {
				"name": "论坛解答",
				"hasRight": true
			}, {
				"name": "邮件支持",
				"hasRight": true
			}, {
				"name": "电话支持",
				"hasRight": false
			}, {
				"name": "专属顾问",
				"hasRight": false
			}]
		},
		"20": {
			"name": "企业免费版",
			"fee": 0,
			"cost": 0,
			"duration": false,
			"rights": [{
				"name": "创建AR应用数",
				"hasRight": true,
				"count": 10
			}, {
				"name": "同一个邀请码应用上限",
				"hasRight": true,
				"count": 30
			}, {
				"name": "公共频道应用上限",
				"hasRight": false,
				"count": 0
			}, {
				"name": "免费模板",
				"hasRight": true
			}, {
				"name": "企业模板",
				"hasRight": false
			}, {
				"name": "高级邀请码",
				"hasRight": true
			}, {
				"name": "扫描次数统计(即将上线)",
				"hasRight": true
			}, {
				"name": "用户城市分布统计(即将上线)",
				"hasRight": false
			}, {
				"name": "用户设备类型分布统计(即将上线)",
				"hasRight": false
			}, {
				"name": "论坛解答",
				"hasRight": true
			}, {
				"name": "邮件支持",
				"hasRight": true
			}, {
				"name": "电话支持",
				"hasRight": true
			}, {
				"name": "专属顾问",
				"hasRight": false
			}]
		},
		"30": {
			"name": "企业VIP体验版",
			"fee": 0,
			"cost": 0,
			"duration": {
				"unit": "day",
				"count": 15
			},
			"rights": [{
				"name": "创建AR应用数",
				"hasRight": true,
				"count": 20
			}, {
				"name": "同一个邀请码应用上限",
				"hasRight": true,
				"count": 30
			}, {
				"name": "公共频道应用上限",
				"hasRight": false,
				"count": 0
			}, {
				"name": "免费模板",
				"hasRight": true
			}, {
				"name": "企业模板",
				"hasRight": true
			}, {
				"name": "高级邀请码",
				"hasRight": true
			}, {
				"name": "扫描次数统计(即将上线)",
				"hasRight": true
			}, {
				"name": "用户城市分布统计(即将上线)",
				"hasRight": true
			}, {
				"name": "用户设备类型分布统计(即将上线)",
				"hasRight": true
			}, {
				"name": "论坛解答",
				"hasRight": true
			}, {
				"name": "邮件支持",
				"hasRight": true
			}, {
				"name": "电话支持",
				"hasRight": true
			}, {
				"name": "专属顾问",
				"hasRight": true
			}]
		},
		"40": {
			"name": "企业VIP版",
			"fee": 16999,
			"cost": 19999,
			"duration": {
				"unit": "year",
				"count": 1
			},
			"rights": [{
				"name": "创建AR应用数",
				"hasRight": true,
				"count": 1000
			}, {
				"name": "同一个邀请码应用上限",
				"hasRight": true,
				"count": 100
			}, {
				"name": "公共频道应用上限",
				"hasRight": false,
				"count": 100
			}, {
				"name": "免费模板",
				"hasRight": true
			}, {
				"name": "企业模板",
				"hasRight": true
			}, {
				"name": "高级邀请码",
				"hasRight": true
			}, {
				"name": "扫描次数统计(即将上线)",
				"hasRight": true
			}, {
				"name": "用户城市分布统计(即将上线)",
				"hasRight": true
			}, {
				"name": "用户设备类型分布统计(即将上线)",
				"hasRight": true
			}, {
				"name": "论坛解答",
				"hasRight": true
			}, {
				"name": "邮件支持",
				"hasRight": true
			}, {
				"name": "电话支持",
				"hasRight": true
			}, {
				"name": "专属顾问",
				"hasRight": true
			}]
		}
	}
}
var data = {
	thead: [],
	tbody: []
};
var length = 0;
for (var i in res.result) {
	length++;
}
data.thead.push('功能对比');
for (var i = 1; i <= length; i++) {
	var key = i * 10;
	data.thead.push(res.result[key].name)
}

for (var i = 0, l = res.result['10'].rights.length; i < l; i++) {
	var row = [];
	row.push(res.result['10'].rights[i].name);
	for (var j = 1; j <= length; j++) {
		var key = j * 10;
		if (res.result[key].rights[i].count) {
			row.push(res.result[key].rights[i].count);
		} else {
			row.push(res.result[key].rights[i].hasRight);
		}
	}
	data.tbody.push({
		row: row
	})
} 

{
	row: ['费用', '免费', '免费体验3个月', '￥9999', '原价19999']
}
var lastRow = ['费用', '免费'];
var d = res.result['40'].duration.unit;
if(d=='year')
	d='年'
if(d=='month')
	d='个月'
if(d=='day')
	d='天'
lastRow.push('免费体验'+res.result['40'].duration.count+'天');
lastRow.push('￥'+res.result['40'].fee);
lastRow.push('原价'+res.result['40'].cost);
data.tbody.push({
	row:lastRow
})


// var Slider = (function() {

// 	var setting = {
// 		width: '',
// 		height: '',
// 		images: [],
// 		btnImages:{
// 			width: '20px',
// 			height: '20px',
// 			src:['btn_next.png','btn_pre.png']
// 		}, 
// 		btnSlide:{
// 			width:'10px',
// 			height:'10px',
// 			distance:'10px',
// 			normalColor:'#fff',
// 			currentColor:'#00a0e9'
// 		}
// 	}

// 	var slider = {};
// 	slider.innerFunc = {};
// 	slider.outerFunc = {};

// 	slider.innerFunc.getBrowerWidth = function() {
// 		var id = this.timestamp();
// 		var width = 0;
// 		var div = '<div id=' + id + ' style="width:100%;height:1px"></div>';
// 		$('body').append(div);
// 		div = $('#' + id);
// 		width = div.width();
// 		div.remove();
// 		return width;
// 	}

// 	slider.init = function(opt) {

// 	}

// 	function Slider(opt) {
// 		debugger;
// 		setting = $.extend({setting,opt})
// 	}

// 	Slider.prototype = slider.outerFunc;

// 	return Slider();
// })(window, $);

// $(function() {
// 	new Slider({
// 		width:500,
// 		height:300
// 	})
// })