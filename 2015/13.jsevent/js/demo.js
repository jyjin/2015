/**
 * 功能：显示提示窗口
 * 作者：申楠 qq：38371354 email：amushen1@yahoo.com.cn http;//amushen.cnblogs.com
 * 日期：2005-10-26
 * 版本：1.1
 * 备注：版权没有，随便拷贝，如果用于商业应用请通知本人，同时保留这段注释。
 *
 */
/**
 * 改造：黑旋风 QQ:23929003 email：lewclear97@163.com
 * 日期：2006-03-17
 * 版本：1.2
 * 说明：本人在申楠同志的《显示提示窗口》基础上，将
 */

var alternateFrame = null; //生成的iframe
var alternateWin = null;

window.alert = showAlert;
window.confirm = showConfirm;

/**
 * 人机交互窗口，覆盖自带的
 */
function alternateWindow() {
		this.win = null; //生成对话框的窗口对象
		this.pBody = null; //生成的body容器对象
		this.pBg = null;
		this.type = "alert"; //默认的种类是alert
		this.FocusWhere = "OK"; //焦点在哪个按钮上
	}
	/**
	 * 模仿的alert窗口
	 */
function showAlert(info) {
		alternateWin = new alternateWindow();
		var pBody = alternateWin.init();
		alternateWin.initAlertBody(pBody, info);
		alternateWin.type = "alert";
	}
	/**
	 * 模仿的alert窗口
	 */
function showConfirm(info, ok_func, notok_func, ok_str, not_okstr) {
		alternateWin = new alternateWindow();
		var pBody = alternateWin.init();
		alternateWin.initConfirmBody(pBody, info, ok_func, notok_func, ok_str, not_okstr);
		alternateWin.type = "confirm";
	}
	/**
	 * 作用：初始基本信息
	 */
alternateWindow.prototype.init = function() {
	if (alternateFrame == null) {
		alternateFrame = document.createElement("<iframe allowTransparency='true' id='popframe' frameborder=0 marginheight=0 src='about:blank' marginwidth=0 hspace=0 vspace=0 scrolling=no></iframe>")
		alternateFrame.style.position = "absolute";
		document.body.appendChild(alternateFrame);
	} else {
		alternateFrame.style.visibility = "visible";
	}
	alternateFrame.style.width = screen.availWidth;
	alternateFrame.style.height = screen.availHeight;
	alternateFrame.style.left = document.body.scrollLeft;
	alternateFrame.style.top = document.body.scrollTop;
	alternateFrame.name = alternateFrame.uniqueID;

	this.win = window.frames[alternateFrame.name];
	this.win.document.write("<body leftmargin=0 topmargin=0 oncontextmenu='self.event.returnValue=false'><div id=popbg></div><div id=popbody></div><div></div></body>");
	this.win.document.body.style.backgroundColor = "transparent";
	document.body.style.overflow = "hidden";
	this.pBody = this.win.document.body.children[1];
	this.pBg = this.win.document.body.children[0];
	this.hideAllSelect();
	this.initBg();

	return this.pBody;
}

/**
 * 作用：初始化背景层
 */
alternateWindow.prototype.initBg = function() {
		with(this.pBg.style) {
			position = "absolute";
			left = "0";
			top = "0";
			width = "100%";
			height = "100%";
			visibility = "hidden";
			backgroundColor = "#333333";
			filter = "blendTrans(duration=1) alpha(opacity=30)";
		}
		this.pBg.filters.blendTrans.apply();
		this.pBg.style.visibility = "visible";
		this.pBg.filters.blendTrans.play();
	}
	/**
	 * 作用：初始化显示层
	 */
alternateWindow.prototype.initAlertBody = function(obj, info) {
	with(obj.style) {
		position = "absolute";
		width = "400";
		height = "150";
		backgroundColor = "#ffffff";
	}
	obj.style.left = window.document.body.clientWidth / 2 - 200;
	obj.style.top = window.document.body.clientHeight / 3;
	var str;
	str = "<table border=0 cellpadding=0 cellspacing=1 bgcolor=#000000 width=100% height=100%><tr height=30>";
	str += "<td align=left style='color:#000000;font-size:14px;font-weight:bold' bgcolor=#9999ff>[提示]</td></tr>";
	str += "<tr><td align=center bgcolor=#efefff style='font-size:12px;color:#000000;vertical-align: middle;'>";
	str += info + "</td></tr><tr height=30 bgcolor=#efefef><td align=center>" +
		"<input type='button' value='确定' id='OK'" +
		" onkeydown='parent.alternateWin.onKeyDown(event,this)'" +
		" onclick='parent.alternateWin.closeWin()' style='border:solid 1px #666666;background:#cccccc'>" +
		"</td></tr></table>";
	obj.innerHTML = str;
	this.win.document.body.all.OK.focus();
	this.FocusWhere = "OK";
}

alternateWindow.prototype.onKeyDown = function(event, obj) {
		switch (event.keyCode) {
			case 9:
				event.keyCode = -1;
				if (this.type == "confirm") {
					if (this.FocusWhere == "OK") {
						this.win.document.body.all.NO.focus();
						this.FocusWhere = "NO";
					} else {
						this.win.document.body.all.OK.focus();
						this.FocusWhere = "OK";
					}
				}
				break;
			case 13:
				obj.click();;
				break;
			case 27:
				this.closeWin();
				break;
		}

	}
	/**
	 * 作用：初始化显示层 conFirm提示层
	 */
alternateWindow.prototype.initConfirmBody = function(obj, info, ok_func, notok_func, ok_str, notok_str) {
	with(obj.style) {
		position = "absolute";
		width = "400";
		height = "150";
		backgroundColor = "#ffffff";
	}
	if (ok_str == null) {
		ok_str = "确定";
	}
	if (notok_str == null) {
		notok_str = "取消";
	}
	obj.style.left = window.document.body.clientWidth / 2 - 200;
	obj.style.top = window.document.body.clientHeight / 3;
	var str;
	str = "<table border=0 cellpadding=0 cellspacing=1 bgcolor=#000000 width=100% height=100%><tr height=30>";
	str += "<td align=left style='color:#000000;font-size:14px;font-weight:bold' bgcolor=#9999ff>[询问]</td></tr>";
	str += "<tr><td align=center bgcolor=#efefff style='font-size:12px;color:#000000;vertical-align: middle;'>";
	str += info + "</td></tr><tr height=30 bgcolor=#efefef><td align=center>" +
		"<input type='button' id='OK'" +
		" onkeydown='parent.alternateWin.onKeyDown(event,this)'" +
		" onclick='parent.alternateWin.closeWin();parent." + ok_func + "();' " +
		" value='" + ok_str + "' style='border:solid 1px #666666;background:#cccccc'>" +
		"&nbsp;&nbsp;&nbsp;<input type='button' value='" + notok_str + "' id='NO'" +
		" onkeydown='parent.alternateWin.onKeyDown(event,this)'" +
		" onclick='parent.alternateWin.closeWin();" +
		" parent." + notok_func + "();' style='border:solid 1px #666666;background:#cccccc'></td></tr></table>";
	obj.innerHTML = str;
	this.win.document.body.all.OK.focus();
}

/**
 * 作用：关闭一切
 */
alternateWindow.prototype.closeWin = function() {
		alternateFrame.style.visibility = "hidden";
		this.showAllSelect();
		document.body.style.overflow = "auto";
	}
	/**
	 * 作用:隐藏所有的select
	 */
alternateWindow.prototype.hideAllSelect = function() {
		var obj;
		obj = document.getElementsByTagName("SELECT");
		var i;
		for (i = 0; i < obj.length; i++)
			obj[i].style.visibility = "hidden";
	}
	/**
	 * 显示所有的select
	 */
alternateWindow.prototype.showAllSelect = function() {
	var obj;
	obj = document.getElementsByTagName("SELECT");
	var i;
	for (i = 0; i < obj.length; i++)
		obj[i].style.visibility = "visible";
}