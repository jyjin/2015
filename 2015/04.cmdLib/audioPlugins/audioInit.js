define(function(require, exports, module) {
    var $ = require('cjquery');

    function onSilverlightError(sender, args) {
        var appSource = "";
        if (sender != null && sender != 0) {
            appSource = sender.getHost().Source;
        }

        var errorType = args.ErrorType;
        var iErrorCode = args.ErrorCode;

        if (errorType == "ImageError" || errorType == "MediaError") {
            return;
        }

        var errMsg = "Unhandled Error in Silverlight Application " + appSource + "\n";

        errMsg += "Code: " + iErrorCode + "    \n";
        errMsg += "Category: " + errorType + "       \n";
        errMsg += "Message: " + args.ErrorMessage + "     \n";

        if (errorType == "ParserError") {
            errMsg += "File: " + args.xamlFile + "     \n";
            errMsg += "Line: " + args.lineNumber + "     \n";
            errMsg += "Position: " + args.charPosition + "     \n";
        } else if (errorType == "RuntimeError") {
            if (args.lineNumber != 0) {
                errMsg += "Line: " + args.lineNumber + "     \n";
                errMsg += "Position: " + args.charPosition + "     \n";
            }
            errMsg += "MethodName: " + args.methodName + "     \n";
        }

        throw new Error(errMsg);
    }

    function setSpeehResource(url) {
        var slt = document.getElementById("silverlightCtrl");
        var tags = "[{ \"Start\": 79550.00, \"End\": 79880.00, \"Text\": \"有没有\", \"Position\": \"UP\", \"Style\": \"ellipse1\", \"BackColor\": \"255, 0, 0, 255\", \"FrameColor\": \"255, 0, 255, 0\" },{ \"Start\": \"101630.00\", \"End\": \"101980.00\", \"Text\": \"开通\", \"Position\": \"DOWN\", \"Style\": \"ellipse1\", \"BackColor\": \"255, 0, 0, 255\", \"FrameColor\": \"255, 0, 255, 0\" }]";
        if (slt) {
            try {
                //slt.Content.Page.setWidth(400);
                slt.Content.Page.setJsonContent(tags);
                slt.Content.Page.setSpeehResource(url);
            } catch (e) {}
        }
    }

    function setControlRes(url) {
        var slt = document.getElementById("silverlightCtrl");
        if (slt) {
            try {
                //slt.Content.Page.setWidth(240);
                slt.Content.Page.setResource(url);
            } catch (e) {}
        }
    }

    function playrange1(st, et, url) {
        var slt = document.getElementById("silverlightCtrl");
        if (slt) {
            try {
                // slt.Content.Page.setSpeehResource(url, st, et);
                slt.Content.Page.playRangeScript(st, et);
            } catch (e) {}
        }
    }

    function playrange2(st, et) {
        var slt = document.getElementById("silverlightCtrl");
        if (slt) {
            try {
                slt.Content.Page.playRangeScript(st, et);
                // slt.Content.Page.freeMemory();
                //slt.Content.Page.doubleClick("aaa");
            } catch (e) {}
        }
    }

    function playforward() {
        var slt = document.getElementById("silverlightCtrl");
        if (slt) {
            try {
                //slt.Content.Page.playRangeScript(st, et);
                // slt.Content.Page.freeMemory();
                slt.Content.Page.playForward();
            } catch (e) {}
        }
    }

    function playBack() {
        var slt = document.getElementById("silverlightCtrl");
        if (slt) {
            try {
                //slt.Content.Page.playRangeScript(st, et);
                // slt.Content.Page.freeMemory();
                slt.Content.Page.playBack();
            } catch (e) {}
        }
    }

    function stopVoice() {
        var slt = document.getElementById("silverlightCtrl");

        if (slt) {
            try {
                slt.Content.Page.clearResource();
                selFristTab();
            } catch (e) {}
        }
    }

    function btnSearch() {
        var keyword = document.getElementById("keyword").value;
        var slt = document.getElementById("silverlightCtrl");
        if (slt) {
            try {
                slt.Content.Page.btnSearch(keyword);
            } catch (e) {}
        }
    }

    function selFristTab() {
        $("#silverlightControlHost").html("");
    }

    function setPlayerHeigth(height) {
        $("#silverlightControlWrapper").css("height", "135px");
    }

    function onebestAdd(val, val1) {
        // alert(val);
    }

    function onebestEdit(words) {
            var slt = document.getElementById("silverlightCtrl");
            slt.Content.Page.doubleClick("测试");
    }

    // 播放器保存函数
    function onebestSave(onebest1, onebest2, onebesttime1, onebesttime2) {
        alert(onebest1);
        alert(onebest2);
        alert(onebesttime1);
        alert(onebesttime2);
    }

    function setInputData() {
        var slt = document.getElementById("silverlightCtrl");
        var s = document.getElementById("tn").value;
        slt.Content.Page.setValue(s);
    }

    window.onSilverlightError =onSilverlightError;
    window.setSpeehResource = setSpeehResource;
    window.setControlRes = setControlRes;
    window.playrange1 =playrange1 ;
    window.playrange2 = playrange2;
    window.playforward = playforward;
    window.playBack = playBack;
    window.stopVoice = stopVoice;
    window.btnSearch =btnSearch ;
    window.selFristTab = selFristTab;
    window.setPlayerHeigth =setPlayerHeigth ;
    window.onebestAdd = onebestAdd;
    window.onebestEdit =onebestEdit ;
    window.onebestSave = onebestSave;
    window.setInputData = setInputData;
    $(function() {
        setPlayerHeigth("135");
    })
});