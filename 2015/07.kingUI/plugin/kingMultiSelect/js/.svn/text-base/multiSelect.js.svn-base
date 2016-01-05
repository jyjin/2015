/**
 *功能：多选下拉列表
 *@author:jyjin
 *@date:2014.06.25
 */
define(function(require) {
	require('tool');
	var jQuery = require('cjquery');
	(function(jQuery) {
		$.fn.myMultiSelect = function(options) {
			//默认数据
			var json = [{
				"id": "111",
				"name": "我是条件项一"
			}, {
				"id": "222",
				"name": "我是条件项二"
			}, {
				"id": "333",
				"name": "我是条件项三"
			}, {
				"id": "444",
				"name": "我是特长条件项四"
			}];

			//默认值
			var defaultVal = {
				jsonData: json, //数据源
				input: false, //是否展示输入框
				confirm: '', //
				itemClick: '', //单击事件回调
				selectId: '', //默认选中值的id
				selectValue: '', //默认选中值的text 
				allSelect: false, //是否默认全选
				showAllSelectValue: false, //是否展示'全选' bool
				beforeSelectAll: '', //全选前事件
				loadAfter: '', //加载完成函数
				getValue: [], //确定是绑定字段 arr
				associating: false, //联想搜索
				whenClose:''//关闭事件
			};

			var obj = $.extend(defaultVal, options);

			return this.each(function() {
				var thisObj = $(this);
				var _id = "#" + $(this).attr("id");
				var selectedArr = [];
				var multiSelect = {
						/**
						 *获取自定义属性key值
						 */
						getKey: function(data) {
							var keys = [];
							for (var i in data) {
								keys.push(i);
							}
							return keys;
						},

						/**
						 * 防止空字段toString
						 */
						getStr: function(str) {
							return str = str ? str.toString() : str;
						},

						/**
						 *获取自定义属性html片段
						 */
						getAttrHtml: function(data, keys) {
							var attrHtml = '';
							for (var i = 0; i < keys.length; i++) {
								if (typeof data[keys[i]] === 'object') continue;
								attrHtml += " " + multiSelect.getStr(keys[i]) + "='" + multiSelect.getStr(data[keys[i]]) + "'";
							}
							return attrHtml;
						},

						/**
						 *初始化下拉列表dom
						 *_id:下拉列表包裹容器id字符串 '#id'
						 */
						init: function(_id, data) {
							var proHtml = '',
								proList = [];
							proHtml = "<div class='bg_multi_region'><input class='select_val ell' value='请选择' m_value='no-selected'/>";
							proHtml += "</div>";
							proHtml += "<div class='multi_region_wrap dn'><div class='multi_region_options_wrap'><ul class='multi_region_pro_ul'>";
							proHtml += '<li class="li_pro no-result dn" ><p class="ell" >无结果</p></li>';
							proList.push(proHtml);
							var jsonObj = data;
							$.each(jsonObj, function(i, pro) {
								var cityList = [];
								var keys = multiSelect.getKey(pro);
								if (pro.values && 　pro.values.length) {
									proHtml = "<li class='li_pro'" + multiSelect.getAttrHtml(pro, keys) + " cityvalue='1' m_value='" + $.trim(pro.id) + "'>";
									proHtml += "<input type='checkbox' class='multi_pro_inp multi_inp' value='0'/>";
									proHtml += "<label class='multi_region_icon'>+</label>";
									proHtml += "<p class='ell' title='" + pro.name + "'>" + pro.name + "</p></li>";
									proHtml += "<li class='dn'><ul class='multi_region_city_ul'>";
									proList.push(proHtml);
									$.each(pro.values, function(i, city) {
										var cityHtml = '';
										var keys1 = multiSelect.getKey(city);
										cityHtml += "<li class='li_city' " + multiSelect.getAttrHtml(city, keys1) + " m_value='" + $.trim(city.id) + "'>";
										cityHtml += "<input type='checkbox'  class='multi_city_inp multi_inp' value='0'/>";
										cityHtml += " <p class='ell' title='" + city.name + "'>" + city.name + "</p></li>"
										cityList.push(cityHtml);
									});
									proHtml = cityList.join('');
									proHtml += "</ul></li>";
									proList.push(proHtml);
								} else {
									proHtml = "<li class='li_pro' " + multiSelect.getAttrHtml(pro, keys) + " cityvalue='0' m_value='" + $.trim(pro.id) + "'>";
									proHtml += "<input type='checkbox' class='multi_pro_inp multi_inp' value='0'/>";
									proHtml += "<label class='multi_region_icon'></label>";
									proHtml += "<p class='ell' title='" + pro.name + "'>" + pro.name + "</p></li>";
									proList.push(proHtml);
								}
							});
							proHtml = " </ul></div><div class='multi_region_btn_wrap'>";
							if (obj.input) {
								proHtml += "<div class='multi_fixed_item_wrapper '>";
								proHtml += "<input type='text' class='multi_item_input multi_start_num'/>";
								proHtml += "-";
								proHtml += "<input type='text' class='multi_item_input multi_end_num'/></div>";
							}
							proHtml += "<a href='javascript:void(null);' class='multi_region_btn multi_region_sel_all'>全选</a>";
							proHtml += "<a href='javascript:void(null);' class='multi_dn_confirm dn'></a>";
							proHtml += "<a href='javascript:void(null);' class='multi_region_btn multi_region_btn_confirm'>确定</a></div>";
							proList.push(proHtml);
							$(_id).html(proList.join(''));
						},

						/**
						 *获取操作对象
						 *@type 类型：'pro'省对象
						 *            'city'市对象
						 *            'all'省和市对象
						 *@return:操作对象
						 */
						getOptionsType: function(type, obj) {
							var inp;
							obj = obj || _id;
							var type = type || 'all';
							switch (type) {
								case 'pro':
									{
										inp = obj ? $('.multi_pro_inp', obj) : $('.multi_pro_inp');
									}
									break;
								case 'city':
									{
										inp = obj ? $('.multi_city_inp', obj) : $('.multi_city_inp');
									}
									break;
								case 'all':
									{
										inp = obj ? $('.multi_inp', obj) : $('.multi_inp');
									}
									break;
							}
							return inp;
						},

						/**
						 *判断省市是否全选
						 *@type 类型：'pro'省对象
						 *            'city'市对象
						 *            'all'省和市对象
						 *@obj 可选，后代选择器父节点（指定特定省下的市）
						 *@return:true是全选，false未全选
						 */
						checkAllSelected: function(type, obj) {
							var inp = '',
								bo = true;
							inp = multiSelect.getOptionsType(type, obj);
							$.each(inp, function(i, item) {
								if (!$(item).prop('checked')) {
									bo = false;
									return false;
								}
							});
							return bo;
						},

						/**
						 *判断省市是否全选
						 *@type 类型：'pro'省对象
						 *            'city'市对象
						 *            'all'省和市对象
						 *@obj 后代选择器父节点（指定特定省下的市）
						 *@return:true是全不选，false有选中
						 */
						checkAllNoSelected: function(type, obj) {
							var inp = '',
								bo = true;
							inp = multiSelect.getOptionsType(type, obj);
							$.each(inp, function(i, item) {
								if ($(item).prop('checked')) {
									bo = false;
									return false;
								}
							});
							return bo;
						},

						/**
						 *全选或全不选未确定
						 *@type 类型：'pro'省对象
						 *            'city'市对象
						 *            'all'省和市对象
						 *@isallselect:true(全选) or false(全不选)
						 *@obj 后代选择器父节点（指定特定省下的市）
						 *@return:对省、市、省和市全选或全不选
						 */
						setAllSelecting: function(type, isallselect, obj) {
							var type = type || 'all';
							var isallselect = isallselect || false;
							inp = multiSelect.getOptionsType(type, obj);
							switch (isallselect) {
								case true:
									{
										$.each(inp, function(i, item) {
											if (!$(item).prop('checked') || $(item).prop('indeterminate')) {
												$(item).prop('checked', true).prop('indeterminate', false);
											}
										});
									}
									break;

								case false:
									{
										$.each(inp, function(i, item) {
											if ($(item).prop('checked') || $(item).prop('indeterminate')) {
												$(item).prop('checked', false).prop('indeterminate', false);
											}
										});
									}
									break;
							}
						},

						/**
						 *设置默认选中项 jyjin20150108
						 */
						setDefaultSelect: function(_id) {
							var inp = multiSelect.getOptionsType('all', _id);
							if (defaultVal.selectValue) {
								$.each(inp, function(i, item) {
									var text = $(item).parent().find('p').html();
									if ($.inArray(text, defaultVal.selectValue) != -1) {
										$(item).prop('checked', true).prop('indeterminate', false);
									}
								})
							}
							if (defaultVal.selectId) {
								$.each(inp, function(i, item) {
									var m_value = $(item).parent().attr('m_value');
									if ($.inArray(m_value, defaultVal.selectId) != -1) {
										$(item).prop('checked', true).prop('indeterminate', false);
									}
								})
							}
							$('.multi_dn_confirm', _id).trigger('click');
						},

						/*
						 *获取所有选中项text值，缓存到数组
						 *注：省选中，直接返回省名称，不获取省下市值
						 *返回选中的省市，
						 */
						getSelectItemText: function() {
							var pro = $('.multi_pro_inp', _id),
								arr = [];
							$.each(pro, function(i, item) {
								var next = $(item).parent().next();
								if ($(item).prop('checked')) { //1.省全选
									arr.push($(item).parent().find('p').text());
								} else if ($(item).prop('indeterminate')) { //2.省半选
									var text = $(item).parent().find('p').text() + '[';
									var city = next.find('.multi_city_inp');
									var cityArr = [];
									$.each(city, function(i, c) {
										if ($(c).prop('checked')) {
											cityArr.push($(c).parent().find('p').text());
										}
									});
									text += cityArr.join('/');
									text += ']';
									arr.push(text);
								}
							});

							return arr;
						},

						/*
						 *获取所有选中项value值，缓存到数组
						 *注：省选中，直接返回省名称，不获取省下市值
						 *返回选中的省市，
						 */
						getSelectItemValue: function(m_value) {
							var pro = $('.multi_pro_inp', _id),
								arr = [];
							$.each(pro, function(i, item) {
								var next = $(item).parent().next();
								if ($(item).prop('checked')) { //1.省全选
									arr.push($(item).parent().attr('m_value'));
								} else if ($(item).prop('indeterminate')) { //2.省半选
									var ids = $(item).parent().attr('m_value') + '[';
									var city = next.find('.multi_city_inp');
									var cityArr = [];
									$.each(city, function(i, c) {
										if ($(c).prop('checked')) {
											cityArr.push($(c).parent().attr('m_value'));
										}
									});
									ids += cityArr.join('/');
									ids += ']';
									arr.push(ids);
								}
							});

							return arr;
						},

						/*
						 *获取自由输入框值
						 *@type: 获取复选框值
						 */
						getInputText: function() {
							var arr = [];
							var num1 = $(".multi_start_num", _id).val();
							var num2 = $(".multi_end_num", _id).val();
							arr = multiSelect.createMultiValue(arr, num1, num2);
							return arr;
						},

						/*
						 *获取所有选中项id，缓存到数组
						 *注：省选中，省下的市也获取了
						 *返回选中的省市，
						 */
						getSelectItemID: function() {
							var inp = $('.multi_inp', _id),
								arr = [],
								id = '';
							$.each(inp, function(i, item) {
								if ($(item).prop('checked')) {
									id = $(item).parent().attr('m_value');
									arr.push(id);
								};
							});
							return arr;
						},

						/*
						 *设置指定元素选中
						 *@arr:要选中元素的id集合
						 */
						setSpeciSelect: function(arr) {
							multiSelect.setAllSelecting('all', false);
							$.each(arr, function(i, item) {
								$('#' + item, _id).trigger('click');
							});
							multiSelect.setRegionCityClose(); //jyjin 20140922
						},

						/**
						 *关闭打开的省份项
						 */
						setRegionCityClose: function() {
							$("li[cityvalue='1']", _id).find('.multi_region_icon').each(function(i, item) {
								if ($(item).text() == '-') {
									$(item).text('+');
									$(item).parent().next().addClass('dn');
								}
							});
						},

						/*
						 *关闭其他插件打开
						 *@flag：
						 */
						setOtherClose: function(flag) {
							$('html').trigger('click');
							if (flag) {
								$(".multi_region_wrap", _id).removeClass('dn');
							}
						},

						/*
						 *区域值创建
						 *@array:返回接收数组
						 *@n:起始值
						 *@m:终止值
						 */
						createMultiValue: function(array, n, m) {
							for (var i = n * 1.0; i <= m; i++) {
								array.push(i);
							};
							return array;
						},

						/*
						 *清空自由输入框
						 */
						resetManelInput: function() {
							$(".multi_start_num", _id).val("");
							$(".multi_end_num", _id).val("");
						},

						/*
						 *自输入框校验
						 */
						inputConfirm: function() {
							var patten = new RegExp(/^[0-9]+$/);
							var num1 = $(".multi_start_num", _id).val();
							var num2 = $(".multi_end_num", _id).val();
							var bo = true;
							if (!patten.test(num1)) {
								alert("请输入数字！");
								$(".multi_start_num", _id).val('').focus();
								$(".multi_start_num", _id).val('');
								bo = false;
								return false;
							}
							if (!patten.test(num2)) {
								alert("请输入数字！");
								$(".multi_end_num", _id).val('').focus();
								$(".multi_start_num", _id).val('');
								bo = false;
								return false;
							}
							if (bo && num1 * 1.0 > num2 * 1.0) {
								alert("起始值不能大于终止值");
								bo = false;
								$(".multi_start_num", _id).val('').focus();
							}
							if (bo) {
								multiSelect.setAllSelecting('all', false);
								var multi_value = multiSelect.getInputText().join(',');
								$(".select_val", _id).val(multi_value).attr("title", multi_value);
							}
						},

						/*
						 *绑定多选值至显示框
						 */
						setMultiValue: function(defaultVal) {
							var text = '',
								m_value = '';
							selectedArr = multiSelect.getSelectItemID();
							multiSelect.setSpeciSelect(selectedArr);
							$('.multi_region_wrap').addClass('dn');
							//全选时判断显示所有选项还是用字符串代替
							if (multiSelect.checkAllSelected('pro') && !defaultVal.showAllSelectValue) {
								text = '全部';
								m_value = 'all-selected';
							} else if (multiSelect.checkAllNoSelected('all')) {
								text = '请选择';
								m_value = 'no-selected';
							} else {
								var txtArr = multiSelect.getSelectItemText();
								var valArr = multiSelect.getSelectItemValue();
								text = txtArr.join(',');
								m_value = valArr.join(',');
								if (defaultVal.getValue && defaultVal.getValue.length) {
									$.each(defaultVal.getValue, function(i, item) {
										var attr = multiSelect.getSelectItemValue(item);
										attr = attr.join(',');
										$('.select_val', _id).attr(item, attr);
									});
								}
							}
							$('.select_val', _id).val(text).attr('title', text).attr('m_value', m_value);
						},

						/*
						 *插件事件集
						 */
						clickEvent: function(defaultVal) {
							//省份悬停样式
							$(".li_pro").mouseover(function() {
								var obj = $(this);
								$(this).addClass("li_pro_hover");
							}).mouseout(function() {
								$(this).removeClass("li_pro_hover");
							});

							//打开关闭下拉列表
							$('.bg_multi_region', _id).click(function(e) {
								multiSelect.resetManelInput();
								//打开自身
								var opt = $('.multi_region_wrap', _id);
								if (opt.hasClass('dn')) {
									multiSelect.setOtherClose('y');
									selectedArr = multiSelect.getSelectItemID();
								}
								// else {
								// 	//关闭自身及其他multiSelect插件下拉
								// 	multiSelect.setOtherClose();
								// 	multiSelect.setSpeciSelect(selectedArr);
								// }
								e.stopPropagation();
							});

							//阻止事件冒泡
							$("div", ".multi_region_wrap").click(function(e) {
								e.stopPropagation();
							});

							//点击其他任意关闭
							$(document).on('click', 'html', function() {
								$('.multi_region_wrap').addClass('dn');
								if(defaultVal.whenClose){
									defaultVal.whenClose();
								}
								multiSelect.setSpeciSelect(selectedArr);
								//全选时判断显示所有选项还是用字符串代替
								if (multiSelect.checkAllSelected('pro') && !defaultVal.showAllSelectValue) {
									text = '全部';
									m_value = 'all-selected';
								} else if (multiSelect.checkAllNoSelected('all')) {
									text = '请选择';
									m_value = 'no-selected';
								} else {
									var txtArr = multiSelect.getSelectItemText();
									var valArr = multiSelect.getSelectItemValue();
									text = txtArr.join(',');
									m_value = valArr.join(',');
									if (defaultVal.getValue && defaultVal.getValue.length) {
										$.each(defaultVal.getValue, function(i, item) {
											var attr = multiSelect.getSelectItemValue(item);
											attr = attr.join(',');
											$('.select_val', _id).attr(item, attr);
										});
									}
								}
								$('.select_val', _id).val(text).attr('title', text).attr('m_value', m_value);
							});

							//全选按钮
							$('.multi_region_sel_all', _id).click(function() {
								var flag = true;
								if (defaultVal.beforeSelectAll) {
									flag = defaultVal.beforeSelectAll();
								}
								if (flag) {
									multiSelect.resetManelInput();
									multiSelect.checkAllSelected('all') ? multiSelect.setAllSelecting('all', false) : multiSelect.setAllSelecting('all', true);
								}
							});

							//省份单项点击
							$('.li_pro', _id).click(function() {
								multiSelect.resetManelInput();
								var inp = $(this).find('.multi_pro_inp');
								var icon = $(this).find(".multi_region_icon");
								if ($(this).attr('cityvalue') == '1') {
									var citys = $(this).next();
									if (citys.hasClass('dn')) {
										citys.removeClass('dn');
										icon.text('-');
									} else {
										citys.addClass('dn');
										icon.text('+');
									}
								} else {
									inp.prop('checked') ? inp.prop('checked', false) : inp.prop('checked', true);
								}
								if (defaultVal.itemClick) { //jyjin 20150108
									defaultVal.itemClick($(this));
								}
							});

							//市单项点击
							$('.li_city', _id).click(function(e) {
								var inp = $(this).find('.multi_city_inp');
								var proInp = $(this).parent().parent().prev().find('.multi_pro_inp');
								inp.prop('checked') ? inp.prop('checked', false) : inp.prop('checked', true);
								if (multiSelect.checkAllSelected('city', $(this).parent())) {
									//proInp.prop('checked',true);
									proInp.prop("checked", true);
									proInp.prop('indeterminate', false);
								} else if (multiSelect.checkAllNoSelected('city', $(this).parent())) {
									proInp.prop('checked', false);
									proInp.prop('indeterminate', false);
								} else {
									proInp.prop('checked', false);
									proInp.prop('indeterminate', true);
								}
								if (defaultVal.itemClick) { //jyjin 20150108
									defaultVal.itemClick($(this));
								}
								e.stopPropagation();
							});

							//阻止复选框默认事件
							$('.multi_inp', _id).click(function(e) {
								var obj = $(this);
								obj.prop('checked') ? obj.prop('checked', true) : obj.prop('checked', false);
								if (obj.hasClass('multi_city_inp')) {
									var proLi = $(this).parent().parent().parent().prev();
									var proInp = proLi.find('.multi_pro_inp');
									if (multiSelect.checkAllSelected('city', $(this).parent().parent())) {
										proInp.prop('checked', true);
										proInp.prop('indeterminate', false);
									} else if (multiSelect.checkAllNoSelected('city', $(this).parent().parent())) {
										proInp.prop('checked', false);
										proInp.prop('indeterminate', false);
									} else {
										proInp.prop('checked', false);
										proInp.prop('indeterminate', true);
									}
								} else {
									var cityLi = $(this).parent().next();
									if (obj.prop('checked')) {
										multiSelect.setAllSelecting('city', true, cityLi);
									} else {
										multiSelect.setAllSelecting('city', false, cityLi);
									}
								}
								if (defaultVal.itemClick) { //jyjin 20150108
									defaultVal.itemClick(obj);
								}
								e.stopPropagation();
							});

							//确定按钮
							$('.multi_region_btn_confirm', _id).click(function() {
								if (obj.input) {
									var num1 = $(".multi_start_num", _id).val();
									var num2 = $(".multi_end_num", _id).val();
									if (num1 || num2) {
										multiSelect.inputConfirm();
									} else {
										multiSelect.setMultiValue(defaultVal);
									}
								} else {
									multiSelect.setMultiValue(defaultVal);
								}
								$(".multi_region_wrap", _id).addClass('dn');
								if (defaultVal.whenConfirm) { //jyjin 20141225
									defaultVal.whenConfirm();
								}
							});

							//确定按钮
							$('.multi_dn_confirm', _id).click(function() {
								if (obj.input) {
									var num1 = $(".multi_start_num", _id).val();
									var num2 = $(".multi_end_num", _id).val();
									if (num1 || num2) {
										multiSelect.inputConfirm();
									} else {
										multiSelect.setMultiValue(defaultVal);
									}
								} else {
									multiSelect.setMultiValue(defaultVal);
								}
								$(".multi_region_wrap", _id).addClass('dn');
							});

							/**新增联想**/
							$('.select_val', _id).keyup(function() {
								var $this = $(this);
								var tagStr = $this.val();
								var pEles = $($('.multi_region_pro_ul', _id).find('p'));
								var flag = true;

								$('.multi_region_pro_ul', _id).find('li').addClass('dn');

								if (tagStr.indexOf('，') != -1) {
									tagStr = ($.replaceAll(tagStr, '，', ','));
								}

								if (tagStr.indexOf(',') != -1) {
									tagStr = tagStr.split(',');
								}

								if (typeof tagStr == 'object') {
									$.each(pEles, function(i, pEle) {
										var _p = $(pEle);
										for (var i = 0; i < tagStr.length; i++) {
											if (_p.html().indexOf(tagStr[i]) != -1) {
												//检查层级
												flag = false;
												_p.parent('li').removeClass('dn');
												if (_p.parent().parent().hasClass('multi_region_city_ul')) {
													_p.parent().parent().removeClass('dn').parent().prev().removeClass('dn');
												}
											}
										}
									});
								} else {
									$.each(pEles, function(i, pEle) {
										var _p = $(pEle);
										//匹配文本
										if (_p.html().indexOf(tagStr) != -1) {
											//检查层级
											flag = false;
											_p.parent('li').removeClass('dn');
											if (_p.parent().parent().hasClass('multi_region_city_ul')) {
												_p.parent().parent().removeClass('dn').parent().prev().removeClass('dn');
											}
										}
									});
								};

								flag ? $('.no-result', _id).removeClass('dn') : $('.no-result', _id).addClass('dn');

							}).focus(function() {
								//聚焦清空默认值
								var $this = $(this);
								$this.css({
									'text-align': 'left'
								});
								$this.attr('ov', $this.val());
								if ($this.val() == '全部') {
									$this.val('');
								}
								if ($this.val() == '请选择') {
									$this.val('');
								}
								$this.keyup();
							}).blur(function() {
								//离焦未赋值还原
								var $this = $(this);
								$this.css({
									'text-align': 'center'
								});
								if ($this.val() === '') {
									$this.val($this.attr('ov'));
								}
							});
						}
					}
					//初始化DOM
				multiSelect.init(_id, obj.jsonData);
				//事件监听
				multiSelect.clickEvent(defaultVal);
				//默认选中项
				if (defaultVal.selectId || defaultVal.selectValue) {
					multiSelect.setDefaultSelect(_id);
				}
				//自定义全选
				if (defaultVal.allSelect) {
					while (!multiSelect.checkAllSelected('all')) {
						$('.multi_region_sel_all', _id).trigger('click');
					}
					$('.multi_region_btn_confirm', _id).trigger('click');
				}
				//加载完毕函数
				if (defaultVal.loadAfter) {
					defaultVal.loadAfter();
				}
			});
		};
	})(jQuery);
	return jQuery;
})