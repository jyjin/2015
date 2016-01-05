var json1 = [{
	"id": "1",
	"name": "条件项一"
}, {
	"id": "2",
	"name": "条件项二"
}, {
	"id": "3",
	"name": "条件项三"
}, {
	"id": "4",
	"name": "条件项四"
}];


var json2 = [{
	"id": "11",
	"name": "条件项一",
	"values": [{
		"id": "111",
		"name": "子条件项111"
	}, {
		"id": "112",
		"name": "子条件项112"
	}, {
		"id": "113",
		"name": "子条件项113"
	}]
}, {
	"id": "12",
	"name": "条件项二",
	"values": []
}, {
	"id": "13",
	"name": "条件项三",
	"values": [{
		"id": "131",
		"name": "子条件项131"
	}, {
		"id": "132",
		"name": "子条件项132"
	}, {
		"id": "133",
		"name": "子条件项133"
	}]
}, {
	"id": "14",
	"name": "条件项四",
	"values": []
}];


$(function() {
	$('#demo1').kingMultiSelect({
		data: json1,
		selectText: ['条件项四', '条件项一']
	});
	$('#demo2').kingMultiSelect({
		data: json2,
		showAllSelectText: true,
		allSelectText: '已全选',
		disSelectText: '没选中',
		memory: true,
		associatting: true,
		itemClick: function(clickObj) {
			console.log(clickObj + 'itemClick')
		},
		whenConfirm: function() {
			console.log('confirm...');
		},
		whenClose: function() {
			console.log('close...');
		},
		loadAfter: function() {
			console.log('loadAfter...');
		},
		width: '200px',
		height: '30px',
		icon: './plugin/kingMultiSelect/images/icon1.png',
		iconWidth: '30px',
		iconHeight: '30px',
		iconPX: '12px',
		iconPY: '11px',
		optHeight: '200px',
		borderColor: '#37ADF0',
		itemHeight: '24px',
		font: '宋体 arial',
		color: '#37ADF0',
		hoverColor: '#E2BEA4',
		fontSize: '14px'
	});

	//测试回调
	$('#demo2').kingMultiSelect('setSpeciSelect',['13','112']);
	$('#demo2').kingMultiSelect('setAllSelecting', 'CITY', true);
	$('#demo2').kingMultiSelect('selfOpen');
	$('#demo3').kingMultiSelect({
		data: json2,
		memory: false,
		whenConfirm: function() {
			console.log('confirm...');
		}
	});
	$('#demo4').kingMultiSelect({
		data: json2,
		initAllSelect: true,
		showAllSelectText: true,
		whenConfirm: function() {
			console.log('confirm...');
		}
	});
});