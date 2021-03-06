/**
 *功能：多选下拉列表
 *@author:jyjin
 *@date:2014.06.25
 *      2015.04.12 recode by jyjin
 */

(function(jQuery) {

    var Default_data = [{
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

    var __memoryArr = [];

    function getCurWrapId(obj) {
        return obj.hasClass('multi-region') ? obj.parent().attr('id') : obj.parents('.multi-region').parent().attr('id');
    };

    function getCurMulti() {
        var $curMulti;
        $('.multi-region-wrap').each(function() {
            if (!$(this).hasClass('dn')) {
                $curMulti = $(this);
                return;
            }
        });
        return $curMulti;
    };

    function argumentHandler(argumentsArr, callback) {
        var arr = [];
        for (var i = 0; i < argumentsArr.length; i++) {
            if (callback) {
                var innerArrItem = callback(argumentsArr[i]);
                if (innerArrItem) arr.push(innerArrItem);
            }
            if (typeof argumentsArr[i] === 'string') {
                argumentsArr[i] = '\\"' + argumentsArr[i] + '\\"';
            }

        }
        if (arr.length) {
            return arr;
        }
        return argumentsArr;
    };

    function getMethod(args, options) {
        var _arguments = '',
            defaultVal = {},
            argumentsArr = [];
        defaultVal.id = '#' + $(this).attr('id');
        argumentsArr = (Array.prototype.slice.call(args, 1, args.length));
        argumentsArr = argumentHandler.call(argumentsArr, argumentsArr, function(item) {
            if (typeof item === 'object') {
                var newArgArr = item.toString().split(',');
                var arr = argumentHandler.call(newArgArr, newArgArr);
                return '\[' + arr.toString() + '\]';
            }
        });
        argumentsArr.splice(0, 0, 'defaultVal').join(',');
        _arguments = eval('("' + argumentsArr.toString() + '")');
        return eval('multiSelect["' + options + '"](' + _arguments + ')');
    };

    function getTextWrapStyle(defaultVal) {
        var lineHeight = (parseInt(defaultVal.height) + 2) + 'px';
        return 'width:' + defaultVal.width + ';height:' + defaultVal.height + ';line-height:' + lineHeight + ';';
    };

    function getInputStyle(defaultVal) {
        var width = parseInt(defaultVal.width) - parseInt(defaultVal.iconWidth) - 18 + 'px';
        var lineHeight = parseInt(defaultVal.height) + 'px';
        return 'width:' + width + ';height:' + defaultVal.height + ';line-height:' + lineHeight + ';';
    };

    function getIconStyle(defaultVal) {
        var background = 'url(' + defaultVal.icon + ') no-repeat';
        return 'width:' + defaultVal.iconWidth + ';height:' + defaultVal.iconHeight + ';background:' + background + ';background-position-x:' + defaultVal.iconPX + ';background-position-y:' + defaultVal.iconPY + ';';
    };

    function getItemStyle(defaultVal) {
        var itemLineHeight = (parseInt(defaultVal.itemHeight) + 2) + 'px';
        return 'min-height:' + defaultVal.itemHeight + ';max-height:' + defaultVal.itemHeight + ';line-height:' + itemLineHeight + ';';
    };

    function multiSelectMethod() {};

    multiSelectMethod.prototype.allClose = function() {
        $('.multi-region-wrap').addClass('dn');
    };

    multiSelectMethod.prototype.callback = function(defaultVal) {
        if (defaultVal.selectId || defaultVal.selectText) {
            multiSelect.setDefaultSelect(defaultVal);
        }
        if (defaultVal.initAllSelect) {
            multiSelect.setAllSelecting(defaultVal, 'ALL', true);
            if (!defaultVal.memory) {
                multiSelect.setMultiValue(defaultVal);
            }
            $('.multi-region-btn-confirm', defaultVal.id).trigger('click', 'TRI');
        }
        if (defaultVal.loadAfter) {
            defaultVal.loadAfter();
        }
    };

    multiSelectMethod.prototype.checkAllNoSelected = function(defaultVal, type, obj) {
        var inp = '',
            bo = true;
        inp = multiSelect.getOptionsType(defaultVal, type, obj);
        $.each(inp, function(i, item) {
            if ($(item).prop('checked')) {
                bo = false;
                return false;
            }
        });
        return bo;
    };

    multiSelectMethod.prototype.checkAllSelected = function(defaultVal, type, obj) {
        var inp = '',
            bo = true;
        inp = multiSelect.getOptionsType(defaultVal, type, obj);
        $.each(inp, function(i, item) {
            if (!$(item).prop('checked')) {
                bo = false;
                return false;
            }
        });
        return bo;
    };

    multiSelectMethod.prototype.eventHandler = function(defaultVal) {
        //global click set all list close
        $(document).on('click', function(e) {
            var $target = $(e.target),
                _flag = false;
            if (!$target.parents().hasClass('multi-region')) {
                if (!getCurMulti()) return;
                defaultVal.id = '#' + getCurWrapId.call(this, getCurMulti());
                multiSelect.allClose();
                _flag = true;
            } else {
                var id = $target.parent().attr('id');
                multiSelect.selfOpen(id);
            }

            if (_flag && defaultVal.memory) {
                multiSelect.setMemory(defaultVal);
                $('.multi-region-btn-confirm', defaultVal.id).trigger('click', 'TRI');
            } else if (_flag && !defaultVal.memory) {
                $('.multi-region-btn-confirm', defaultVal.id).trigger('click', 'TRI');
            }
        });

        //prevent option wrap click trigger global click
        $(defaultVal.id).on('click', '.multi-region', function(e) {
            e.stopPropagation();
        });

        //list switch by icon select
        $(defaultVal.id).on('click', '.multi-text-wrap', function(e) {
            $(this).find('.icon-select').trigger('click', 'TRI');
        });

        //event handler for hover 
        $(defaultVal.id).on('mouseover', '.li-pro, .li-city', function() {
            $(this).css({
                'background-color': defaultVal.hoverColor
            });
        }).on('mouseout', '.li-pro, .li-city', function() {
            $(this).css({
                'background': 'none'
            });
        });

        //event handler for list switch
        $(defaultVal.id).on('click', '.icon-select', function(e, _tri) {
            defaultVal.id = '#' + getCurWrapId.call(this, $(this));
            var $list = $('.multi-region-wrap', defaultVal.id);
            $list.hasClass('dn') ? multiSelect.selfOpen(defaultVal, 'SAVE') : multiSelect.selfClose(defaultVal);
            if ($list.hasClass('dn') && defaultVal.memory) {
                multiSelect.setMemory(defaultVal);
            } else if ($list.hasClass('dn') && !defaultVal.memory) {
                $('.multi-region-btn-confirm', defaultVal.id).trigger('click', 'TRI');
            }
            e.stopPropagation();
        });

        //event handler for all select
        $(defaultVal.id).on('click', '.multi-region-sel-all', function() {
            var _flag = true;
            defaultVal.id = '#' + getCurWrapId.call(this, $(this));
            if (defaultVal.allselectBefore) {
                _flag = defaultVal.allselectBefore();
            }
            if (_flag) {
                multiSelect.checkAllSelected(defaultVal, 'ALL') ? multiSelect.setAllSelecting(defaultVal, 'ALL', false) : multiSelect.setAllSelecting(defaultVal, 'ALL', true);
            }
            if (!defaultVal.memory) {
                multiSelect.setMultiValue(defaultVal);
            }
        });

        //event handler for first level click
        $(defaultVal.id).on('click', '.li-pro', function(e, _tri) {
            var $this = $(this),
                inp = $this.find('.multi-pro-inp'),
                icon = $this.find(".multi-region-icon");
            defaultVal.id = '#' + getCurWrapId.call(this, $(this));
            if ($this.attr('cityvalue') == '1') {
                var citys = $this.next();
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

            if (_tri) {
                e.stopPropagation();
                return;
            }
            if (defaultVal.itemClick) {
                defaultVal.itemClick($this);
            }
            if (!defaultVal.memory) {
                multiSelect.setMultiValue(defaultVal);
            }
            e.stopPropagation();
        });

        //event handler for second level click
        $(defaultVal.id).on('click', '.li-city', function(e, _tri) {
            var $this = $(this),
                inp = $this.find('.multi-city-inp'),
                proInp = $this.parent().parent().prev().find('.multi-pro-inp');
            defaultVal.id = '#' + getCurWrapId.call(this, $(this));
            inp.prop('checked') ? inp.prop('checked', false) : inp.prop('checked', true);

            if (multiSelect.checkAllSelected(defaultVal, 'CITY', $this.parent())) {
                proInp.prop("checked", true).prop('indeterminate', false);
            } else if (multiSelect.checkAllNoSelected(defaultVal, 'CITY', $this.parent())) {
                proInp.prop('checked', false).prop('indeterminate', false);
            } else {
                proInp.prop('checked', false).prop('indeterminate', true);
            }

            e.stopPropagation();
            if (_tri) {
                return;
            }
            if (defaultVal.itemClick) {
                defaultVal.itemClick($this);
            }
            if (!defaultVal.memory) {
                multiSelect.setMultiValue(defaultVal);
            }
        });

        //event handler for each textbox 
        $(defaultVal.id).on('click', '.multi-inp', function(e) {
            var $this = $(this);
            defaultVal.id = '#' + getCurWrapId.call(this, $(this));
            $this.prop('checked') ? $this.prop('checked', true) : $this.prop('checked', false);
            if ($this.hasClass('multi-city-inp')) {
                var proLi = $this.parent().parent().parent().prev(),
                    proInp = proLi.find('.multi-pro-inp');
                if (multiSelect.checkAllSelected(defaultVal, 'CITY', $this.parent().parent())) {
                    proInp.prop('checked', true).prop('indeterminate', false);
                } else if (multiSelect.checkAllNoSelected(defaultVal, 'CITY', $this.parent().parent())) {
                    proInp.prop('checked', false).prop('indeterminate', false);
                } else {
                    proInp.prop('checked', false).prop('indeterminate', true);
                }
            } else {
                var cityLi = $this.parent().next();
                if ($this.prop('checked')) {
                    multiSelect.setAllSelecting(defaultVal, 'CITY', true, cityLi);
                } else {
                    multiSelect.setAllSelecting(defaultVal, 'CITY', false, cityLi);
                }
            }
            if (defaultVal.itemClick) {
                defaultVal.itemClick($this);
            }
            if (!defaultVal.memory) {
                multiSelect.setMultiValue(defaultVal);
            }
            e.stopPropagation();
        });

        //event handler for confirm btn
        $(defaultVal.id).on('click', '.multi-region-btn-confirm', function(e, _tri) {
            defaultVal.id = '#' + getCurWrapId.call(this, $(this));
            multiSelect.setMultiValue(defaultVal);
            $(".multi_region_wrap", defaultVal.id).addClass('dn');
            if (_tri) return;
            if (defaultVal.whenConfirm) defaultVal.whenConfirm($(this));
        });

        //enable associatting 
        if (!defaultVal.associatting) {
            $('.select-val', defaultVal.id).attr('readonly', 'readonly');
            return;
        }

        //associatting
        $('.select-val', defaultVal.id).keyup(function() {
            var _flag = true,
                $this = $(this),
                tagStr = $this.val(),
                // $opt = $('.multi-region-wrap', defaultVal.id),
                pEles = $($('.multi-region-pro-ul', defaultVal.id).find('p'));
            $('.multi-region-pro-ul', defaultVal.id).find('li').addClass('dn');
            // if ($opt.hasClass('dn')) $opt.removeClass('dn');
            if (tagStr.indexOf('，') != -1) tagStr = ($.replaceAll(tagStr, '，', ','));
            if (tagStr.indexOf(',') != -1) tagStr = tagStr.split(',');
            if (typeof tagStr == 'object') {
                $.each(pEles, function(i, pEle) {
                    var $p = $(pEle);
                    for (var i = 0; i < tagStr.length; i++) {
                        if ($p.html().indexOf(tagStr[i]) != -1) {
                            //检查层级
                            _flag = false;
                            $p.parent('li').removeClass('dn');
                            if ($p.parent().parent().hasClass('multi-region-city-ul')) {
                                $p.parent().parent().removeClass('dn').parent().prev().removeClass('dn');
                            }
                        }
                    }
                });
            } else {
                $.each(pEles, function(i, pEle) {
                    var $p = $(pEle);
                    //匹配文本
                    if ($p.html().indexOf(tagStr) != -1) {
                        //检查层级
                        _flag = false;
                        $p.parent('li').removeClass('dn');
                        if ($p.parent().parent().hasClass('multi-region-city-ul')) {
                            $p.parent().parent().removeClass('dn').parent().prev().removeClass('dn');
                        }
                    }
                });
            };
            _flag ? $('.no-result', defaultVal.id).removeClass('dn') : $('.no-result', defaultVal.id).addClass('dn');

        }).focus(function() {
            var $this = $(this);
            $this.css({
                'text-align': 'left'
            });
            $this.attr('ov', $this.val());
            if ($this.val() == defaultVal.allSelectText) {
                $this.val('');
            }
            if ($this.val() == defaultVal.disSelectText) {
                $this.val('');
            }
            $this.keyup();
        }).blur(function() {
            var $this = $(this);
            $this.css({
                'text-align': 'center'
            });
            if ($this.val() === '') {
                $this.val($this.attr('ov'));
            }
        }).keydown(function() {
            if (event.keyCode == 13) {
                $(".icon-select", defaultVal.id).click();
            }
        });
    };

    multiSelectMethod.prototype.getAttrHtml = function(data, keys) {
        var attrHtml = '';
        for (var i = 0; i < keys.length; i++) {
            if (typeof data[keys[i]] === 'object') continue;
            attrHtml += " " + multiSelect.getStr(keys[i]) + "='" + multiSelect.getStr(data[keys[i]]) + "'";
        }
        return attrHtml;
    };

    multiSelectMethod.prototype.getKey = function(data) {
        var keys = [];
        for (var i in data)
            keys.push(i);
        return keys;
    };

    multiSelectMethod.prototype.getOptionsType = function(defaultVal, _type, obj) {
        obj = obj || defaultVal.id;
        var inp, _type = _type || 'ALL';
        switch (_type) {
            case 'PRO':
                {
                    inp = obj ? $('.multi-pro-inp', obj) : $('.multi-pro-inp');
                }
                break;
            case 'CITY':
                {
                    inp = obj ? $('.multi-city-inp', obj) : $('.multi-city-inp');
                }
                break;
            case 'ALL':
                {
                    inp = obj ? $('.multi-inp', obj) : $('.multi-inp');
                }
                break;
        }
        return inp;
    };

    multiSelectMethod.prototype.getSelectItemID = function(defaultVal) {
        var inp = $('.multi-inp', defaultVal.id),
            arr = [],
            id = '';
        $.each(inp, function(i, item) {
            if ($(item).prop('checked')) {
                id = $(item).parent().attr('m_value');
                arr.push(id);
            };
        });
        return arr;
    };

    multiSelectMethod.prototype.getSelectItemText = function(defaultVal) {
        var $pro = $('.multi-pro-inp', defaultVal.id),
            arr = [];
        $.each($pro, function(i, item) {
            var $item = $(item);
            if ($item.prop('checked')) {
                arr.push($item.parent().find('p').text());
            } else if ($item.prop('indeterminate')) {
                var text = $item.parent().find('p').text() + '[',
                    $city = $item.parent().next().find('.multi-city-inp'),
                    cityArr = [];
                $.each($city, function(i, c) {
                    var $c = $(c);
                    if ($c.prop('checked')) {
                        cityArr.push($c.parent().find('p').text());
                    }
                });
                text += cityArr.join('/');
                text += ']';
                arr.push(text);
            }
        });

        return arr;
    };

    multiSelectMethod.prototype.getSelectItemAttr = function(defaultVal, attr) {
        var pro = $('.multi-pro-inp', defaultVal.id),
            arr = [];
        $.each(pro, function(i, item) {
            var $item = $(item);
            if ($item.prop('checked')) { //1.省全选
                arr.push($item.parent().attr(attr));
            } else if ($item.prop('indeterminate')) { //2.省半选
                var attrs = $item.parent().attr(attr) + '[',
                    city = $item.parent().next().find('.multi-city-inp'),
                    cityArr = [];
                $.each(city, function(i, c) {
                    var $c = $(c);
                    if ($c.prop('checked')) {
                        cityArr.push($c.parent().attr(attr));
                    }
                });
                attrs += cityArr.join('/');
                attrs += ']';
                arr.push(attrs);
            }
        });

        return arr;
    };

    multiSelectMethod.prototype.getStr = function(str) {
        return str = str ? str.toString() : str;
    };

    multiSelectMethod.prototype.init = function(defaultVal) {
        var proHtml = '',
            lineHeight = (parseInt(defaultVal.height) + 2) + 'px',
            itemLineHeight = (parseInt(defaultVal.itemHeight) + 2) + 'px',
            $scope = $(defaultVal.id);

        proList = [];
        proHtml = "<div class='multi-region multi-text-wrap bw-1111 border-solid border-color' style='" + getTextWrapStyle(defaultVal) + "'>";
        proHtml += "<input class='select-val ell' value='请选择' m_value='no-selected' style='" + getInputStyle(defaultVal) + "'/>";
        proHtml += "<span class='icon-select bw-0001 border-solid border-color' style='" + getIconStyle(defaultVal) + "'></span>";
        proHtml += "</div>";
        proHtml += "<div class='multi-region multi-region-wrap bw-0111 border-solid border-color dn' style='width:" + defaultVal.width + "' >";
        proHtml += "<div class='multi-region-options-wrap'><ul class='multi-region-pro-ul' style='max-height:" + defaultVal.optHeight + "'>";
        proHtml += "<li class='li-pro no-result dn'><p class='ell' >无结果</p></li>";
        proList.push(proHtml);
        var data = defaultVal.data;
        $.each(data, function(i, pro) {
            var cityList = [];
            var keys = multiSelect.getKey(pro);
            if (pro.values && 　pro.values.length) {
                proHtml = "<li class='li-pro'" + multiSelect.getAttrHtml(pro, keys) + " cityvalue='1' m_value='" + $.trim(pro.id) + "' style='" + getItemStyle(defaultVal) + "'>";
                proHtml += "<input type='checkbox' class='multi-pro-inp multi-inp' value='0'/>";
                proHtml += "<label class='multi-region-icon'>+</label>";
                proHtml += "<p class='ell' title='" + pro.name + "'>" + pro.name + "</p></li>";
                proHtml += "<li class='dn'><ul class='multi-region-city-ul'>";
                proList.push(proHtml);
                $.each(pro.values, function(i, city) {
                    var cityHtml = '';
                    var keys1 = multiSelect.getKey(city);
                    cityHtml += "<li class='li-city' " + multiSelect.getAttrHtml(city, keys1) + " m_value='" + $.trim(city.id) + "' style='" + getItemStyle(defaultVal) + "'>";
                    cityHtml += "<input type='checkbox'  class='multi-city-inp multi-inp' value='0'/>";
                    cityHtml += " <p class='ell' title='" + city.name + "'>" + city.name + "</p></li>"
                    cityList.push(cityHtml);
                });
                proHtml = cityList.join('');
                proHtml += "</ul></li>";
                proList.push(proHtml);
            } else {
                proHtml = "<li class='li-pro' " + multiSelect.getAttrHtml(pro, keys) + " cityvalue='0' m_value='" + $.trim(pro.id) + "' style='" + getItemStyle(defaultVal) + "'>";
                proHtml += "<input type='checkbox' class='multi-pro-inp multi-inp' value='0'/>";
                proHtml += "<label class='multi-region-icon'></label>";
                proHtml += "<p class='ell' title='" + pro.name + "'>" + pro.name + "</p></li>";
                proList.push(proHtml);
            }
        });
        proHtml = " </ul></div><div class='multi-region-btn-wrap bw-1000 border-solid border-color'>";
        proHtml += "<a href='javascript:void(null);' class='multi-region-btn multi-region-btn-confirm bw-1111 border-solid border-color " + (defaultVal.memory ? '' : 'dn') + "'>确定</a>";
        proHtml += "<a href='javascript:void(null);' class='multi-region-btn multi-region-sel-all bw-1111 border-solid border-color'>全选</a>";
        proHtml += "</div>";
        proList.push(proHtml);
        $scope.html(proList.join(''));

        var style = defaultVal.id + ' *{font-family:' + defaultVal.font + ';color:' + defaultVal.color + ';font-size:' + defaultVal.fontSize + ';}' + defaultVal.id + ' .border-color{border-color:' + defaultVal.borderColor + ';}';
        if (!$('style').length) {
            $('head').append(
                '<style type="text/css">' + style + '</style>'
            );
        } else {
            style += $('style').html();
            $('style').remove();
            $('head').append(
                '<style type="text/css">' + style + '</style>'
            );
        }

        $(defaultVal.id).css({
            'float': 'left',
            'position': 'relative'
        })
    };

    multiSelectMethod.prototype.setAllSelecting = function(defaultVal, _type, _isallselect, obj) {
        var _type = _type || 'ALL',
            _isallselect = _isallselect || false,
            inp = multiSelect.getOptionsType(defaultVal, _type, obj);
        switch (_isallselect) {
            case true:
                {
                    $.each(inp, function(i, item) {
                        var $item = $(item);
                        if (!$item.prop('checked') || $item.prop('indeterminate')) {
                            $item.prop('checked', true).prop('indeterminate', false);
                        }
                    });
                }
                break;

            case false:
                {
                    $.each(inp, function(i, item) {
                        var $item = $(item);
                        if ($item.prop('checked') || $item.prop('indeterminate')) {
                            $item.prop('checked', false).prop('indeterminate', false);
                        }
                    });
                }
                break;
        }
    };

    multiSelectMethod.prototype.setDefaultSelect = function(defaultVal) {
        var inp = multiSelect.getOptionsType(defaultVal, 'ALL', defaultVal.id);
        if (defaultVal.selectText) {
            $.each(inp, function(i, item) {
                var $item = $(item),
                    text = $item.parent().find('p').html();
                if ($.inArray(text, defaultVal.selectText) != -1) {
                    $item.prop('checked', true).prop('indeterminate', false);
                }
            });
        }
        if (defaultVal.selectId) {
            $.each(inp, function(i, item) {
                var $item = $(item),
                    m_value = $item.parent().attr('m_value');
                if ($.inArray(m_value, defaultVal.selectId) != -1) {
                    $item.prop('checked', true).prop('indeterminate', false);
                }
            });
        }
        $('.multi-region-btn-confirm', defaultVal.id).trigger('click', 'TRI');
    };

    multiSelectMethod.prototype.selfClose = function(defaultVal) {
        new multiSelectMethod().allClose();
        if (typeof defaultVal !== 'object') $('.multi-region-wrap', defaultVal).removeClass('dn');
        if (defaultVal.whenClose) defaultVal.whenClose();
    };

    multiSelectMethod.prototype.selfOpen = function(defaultVal, _save) {
        new multiSelectMethod().allClose();
        $list = $('.multi-region-wrap', defaultVal.id);
        $list.removeClass('dn');
        if (_save) __memoryArr = multiSelect.getSelectItemID(defaultVal);
    };

    multiSelectMethod.prototype.setMemory = function(defaultVal) {
        multiSelect.setAllSelecting(defaultVal, 'ALL', false, defaultVal.id);
        multiSelect.setSpeciSelect(defaultVal, __memoryArr);
    };

    multiSelectMethod.prototype.setMultiValue = function(defaultVal) {
        var text = '',
            m_value = '';
        __memoryArr = multiSelect.getSelectItemID(defaultVal);
        multiSelect.setSpeciSelect(defaultVal, __memoryArr);
        if (defaultVal.memory) $('.multi-region-wrap').addClass('dn');
        if (multiSelect.checkAllSelected(defaultVal, 'PRO', defaultVal.id) && defaultVal.showAllSelectText) {
            text = defaultVal.allSelectText;
            m_value = 'all-selected';
        } else if (multiSelect.checkAllNoSelected(defaultVal, 'ALL', defaultVal.id)) {
            text = defaultVal.disSelectText;
            m_value = 'no-selected';
        } else {
            var txtArr = multiSelect.getSelectItemText(defaultVal),
                valArr = multiSelect.getSelectItemAttr(defaultVal, 'm_value');
            text = txtArr.join(',');
            m_value = valArr.join(',');
        }
        $('.select-val', defaultVal.id).val(text).attr('title', text).attr('m_value', m_value);
    };

    multiSelectMethod.prototype.setRegionCityClose = function(defaultVal) {
        $("li[cityvalue='1']", defaultVal.id).each(function(i, item) {
            var $item = $(item).find('.multi-region-icon');
            if ($item.text() == '-') {
                $item.text('+').parent().next().addClass('dn');
            }
        });
    };

    multiSelectMethod.prototype.setSpeciSelect = function(defaultVal, arr) {
        multiSelect.setAllSelecting(defaultVal, 'ALL', false, defaultVal.id);
        $.each(arr, function(i, item) {
            $('#' + item, defaultVal.id).trigger('click', 'TRI');
        });
        if (defaultVal.memory) multiSelect.setRegionCityClose(defaultVal);
    };

    var multiSelect = new multiSelectMethod();

    $.fn.kingMultiSelect = function(options) {
        if (multiSelect[options]) {
            if (arguments.length > 1) {
                return getMethod.call(this, arguments, options);
            }
            var defaultVal = {};
            defaultVal.id = '#' + $(this).attr('id');
            return multiSelect[options](defaultVal);
        } else if (typeof options === 'object' || !options) {
            return this.each(function() {
                $.kingMultiSelect(options, '#' + $(this).attr('id'));
            });
        } else {
            $.error('The method ' + options + ' does not exist in $.kingMultiSelect');
        }
    };

    $.extend({
        kingMultiSelect: function(options, id) {
            var defaultVal = {
                id: id,
                data: Default_data, //data source
                selectId: '', //the id of default selected
                selectText: '', //the text of default selected text
                initAllSelect: false, //is select all when loading by default
                allSelectText: '全部', //the text for replacing select all value-texts
                disSelectText: '请选择', //the text for replacing select none value-texts
                showAllSelectText: false, //is show the replacing text when select all  
                associatting: false, //is open the associatting
                allselectBefore: '', //the handler before all select event excute
                loadAfter: '', //the handler after dom load complete 
                itemClick: '', //callback when item click
                // whenClose: '', //callback when list closing
                whenConfirm: '', //callback when confirm selectting
                icon: './plugin/kingMultiSelect/images/icon.png', //icon image
                iconPX: '7px', //backgroud-position-x for icon
                iconPY: '7px', //backgroud-position-y for icon
                iconWidth: '23px', //the width of icon
                iconHeight: '20px', //the height of icon
                width: '114px', //the container width of value area
                height: '20px', //the container height of value area
                optHeight: '150px', //the container height of list area
                itemHeight: '20px', //the item heigth of each list
                color: '#a1a1a1', //font color in kingMultiSelect
                font: '微软雅黑 Arial', //font family in  kingMultiSelect
                fontSize: '12px', //font size
                borderColor: '#e1e1e1', //border color
                hoverColor: '#37ADF0', //item hover color
                memory: true //memory the past selectting when closing by no confirm
            };
            defaultVal = $.extend(defaultVal, options || {}, true);
            multiSelect.init(defaultVal); //init dom
            multiSelect.eventHandler(defaultVal); //event bind
            multiSelect.callback(defaultVal); //loadbind
        },
        replaceAll: function(str, oldS, newS) {
            while (str.indexOf(oldS) > 0) {
                str = str.replace(oldS, newS);
            }
            return str;
        }
    });
})();