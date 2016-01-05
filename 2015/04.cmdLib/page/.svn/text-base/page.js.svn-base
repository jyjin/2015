/**
 * 翻页控件
 */
define(function(require) {
    var $ = require('cjquery');
    var PPage = (function(window) {

        return function(pid, curNum, maxNum, funcName, elevator) {
            //直达页面UI是否出现 , 为true 时出现
            elevator = elevator || false;

            if (curNum && $.trim(curNum)) {
                curNum = (curNum);
            }
            if (maxNum && $.trim(maxNum)) {
                maxNum = (maxNum);
            }
            if (funcName && $.trim(funcName)) {
                funcName = (funcName);
            }

            function getAHtml(num) {
                if (num && $.trim(num)) {
                    num = (num);
                }
                return '<a href="javascript:;" onclick="' + funcName + '(' + num + ');return false;"  hidefocus="true">' + num + '</a>';
            };

            var page = typeof pid == "string" ? document.getElementById(pid) : pid,

                sPrev = '',
                sNext = '',
                sResult = '',
                sp = '',
                sn = '',
                sCur = '<em>' + curNum + '</em>',
                gd = '<span>...</span>',

                prevNum,
                nextNum,

                i,

                elevatorHtml = '';

            if (curNum == 1) {
                sPrev = '';
            } else {
                prevNum = curNum - 1;
                sPrev = '<a href="javascript:;" onclick="' + funcName + '(' + prevNum + ');return false;"  hidefocus="true">上一页</a>';
            }

            if (curNum == maxNum) {
                sNext = '';
            } else {
                nextNum = curNum + 1;
                sNext = '<a href="javascript:;" onclick="' + funcName + '(' + nextNum + ');return false;"  hidefocus="true">下一页</a>';
            }
            if (maxNum <= 6) {
                for (i = 1; i < curNum; i++) {
                    sp += getAHtml(i);
                }

                for (i = curNum + 1; i <= maxNum; i++) {
                    sn += getAHtml(i);
                }

                sResult = sPrev + sp + sCur + sn + sNext;
            } else {
                if (curNum <= 4) {
                    for (i = 1; i < curNum; i++) {
                        sp += getAHtml(i);
                    }
                    if (maxNum <= 6) {
                        for (i = curNum + 1; i <= maxNum - 3; i++) {
                            sn += getAHtml(i);
                        }
                    }
                    for (i = curNum + 1; i <= 6; i++) {
                        sn += getAHtml(i);
                    }
                    sNext = getAHtml(maxNum) + sNext;
                    sResult = sPrev + sp + sCur + sn + gd + sNext;
                } else {
                    sPrev = sPrev + getAHtml(1);

                    if (curNum < maxNum - 3) {
                        for (i = curNum - 2; i < curNum; i++) {
                            sp += getAHtml(i);
                        }

                        for (i = curNum + 1; i <= curNum + 2; i++) {
                            sn += getAHtml(i);
                        }

                        sNext = getAHtml(maxNum) + sNext;

                        sResult = sPrev + gd + sp + sCur + sn + gd + sNext;
                    } else {
                        for (i = maxNum - 4; i < curNum; i++) {
                            sp += getAHtml(i);
                        }

                        for (i = curNum + 1; i <= maxNum; i++) {
                            sn += getAHtml(i);
                        }
                        sResult = sPrev + gd + sp + sCur + sn + sNext;
                    }
                }
            }

            if (elevator === true) {
                var n1 = +new Date(),
                    n2 = parseInt(Math.random() * 1000),
                    pagetTextId = "j-page-num" + n1 + n2,
                    pageWarningId = "j-page-elevator-warning" + n1 + n2,

                    timeout = "time" + n1 + n2,
                    time = 2000,

                    f = funcName.replace(/\./g, "_");

                window['PPage_elevator_' + f] = function(v, max) {
                    v = +v;
                    if (!v || typeof v !== "number" ||v.toString().indexOf('.')!==-1 || v > max || v < 0) {
                        var pageWarningElem = document.getElementById(pageWarningId);

                        clearTimeout(timeout);

                        pageWarningElem.style.display = "block";

                        timeout = setTimeout(function() {
                            pageWarningElem.style.display = "none";
                        }, time);

                        return;
                    }
                    eval(funcName + '(' + v + ')');
                };

                elevatorHtml = '<span class="page-elevator-wrap"><div id="' + pageWarningId + '" class="page-elevator-warning" style="display:none;"><span>最大页数 ' + maxNum + '</span><b></b><i></i></div>' + "<span class='page-jump'>去第</span>" + '<input class="page-txt" onkeydown="KeyDown.call(this)" type="text" id="' + pagetTextId + '" autocomplete="off" style="ime-mode:disabled" title="请输入页码，最大页数：' + maxNum + '" />' + "<span class='page-jump'>页</span>" + '<a class="page-btn dn" onclick="PPage_elevator_' + f + '((document.getElementById(\'' + pagetTextId + '\').value),' + maxNum + ');return false;"   hidefocus="true">Go</a></span>';
            }

            page.innerHTML = sResult + elevatorHtml;
        };
    })(window);

    function KeyDown() //回车事件
    {
        if (event.keyCode == 13) {
            $(".page-btn").click();
        }
    }
    window.KeyDown = KeyDown;
    return PPage;
})