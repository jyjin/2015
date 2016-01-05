var AutoDialog = (function() {
    function AutoDialog() {}
    AutoDialog.prototype.readyDilaog = function(opts) {
        var id = opts.id || '';
        this.dialogStr = '';
        this.dialogStr += '<div id="dlgHolder' + id + '" class="dlgHolder dlgHolder' + id + '">';
        this.dialogStr += '<div id="dlgCover" class="dlgCover"></div>';
        this.dialogStr += '<div id="dlgBox" class="dlgBox">';
        this.dialogStr += '<div id="dlgTitle" class="dlgTitle"></div>';
        this.dialogStr += '<div id="dlgBtnClose" class="dlgBtnClose"></div>';
        this.dialogStr += '<div id="dlgContent" class="dlgContent">';
        this.dialogStr += '</div>';
        this.dialogStr += '<div id="dlgBtnsDouble" class="dlgBtnsDouble dn" >';
        this.dialogStr += '<input id="leftDlgBtn" type= "button" class="leftDlgBtn"/>';
        this.dialogStr += '<span class="divideBtn"></span>';
        this.dialogStr += '<input id="rightDlgBtn" type= "button" class="rightDlgBtn"/>';
        this.dialogStr += '</div>';
        this.dialogStr += '<div id= "dlgBtnsSingle" class="dlgBtnsSingle dn">';
        this.dialogStr += '<input id="centerDlgBtn" type= "button" class="centerDlgBtn"/>';
        this.dialogStr += '</div></div></div>';
        $('body').append(this.dialogStr);
        this.autoDialog = $('#dlgHolder' + id);
        this.dialogBox = $('.dlgBox', this.autoDialog);
        this.closeBtn = $('.dlgBtnClose', this.autoDialog);
        this.leftDlgBtn = $('.leftDlgBtn', this.autoDialog);
        this.rightDlgBtn = $('.rightDlgBtn', this.autoDialog);
        this.centerDlgBtn = $('.centerDlgBtn', this.autoDialog);
        this.doubleBtnWrap = $('.dlgBtnsDouble', this.autoDialog);
        this.singleBtnWrap = $('.dlgBtnsSingle', this.autoDialog);
        this.dialogContent = $('.dlgContent', this.autoDialog);
        this.dialogCover = $('.dlgCover', this.autoDialog);
        this.dialogTitle = $('.dlgTitle', this.autoDialog);
    };
    AutoDialog.prototype.setDialog = function(opts) {
        var _this = this;
        this.width = opts.width || 300;
        this.height = opts.height || 180;
        this.padding = opts.padding || 0;
        this.title = opts.title || '提示';
        this.titleColor = opts.titleColor || 'inherit';
        this.titleFontSize = opts.titleFontSize || '18';
        this.titleTextAlign = opts.titleTextAlign || 'center';
        this.contentColor = opts.contentColor || 'inherit';
        this.contentFontFamily = opts.contentFontFamily || 'inherit';
        this.contentFontSize = opts.contentFontSize || 16;
        this.buttonFontFamily = opts.buttonFontFamily || 'Microsoft YaHei';
        this.buttonFontSize = opts.buttonFontSize || 14;
        this.buttonWidth = opts.buttonWidth || 80;
        this.buttonHeight = opts.buttonHeight || 30;
        this.buttonColor = opts.buttonColor || '#00a0e9';
        this.buttonBackgroundColor = opts.buttonBackgroundColor || '#fff';
        this.btns = opts.btns || ['确认', '取消'];
        opts.confirm = opts.confirm || function() {
            return false;
        };
        opts.cancel = opts.cancel || function() {};
        opts.beforeClose = opts.beforeClose || function() {};
        opts.beforeConfirm = opts.beforeConfirm || function() {};
        opts.beforeCancel = opts.beforeCancel || function() {};
        opts.beforeLoad = opts.beforeLoad || function() {};
        opts.afterClose = opts.afterClone || function() {};
        opts.afterConfirm = opts.afterConfirm || function() {};
        opts.afterCancel = opts.afterCancel || function() {};
        opts.afterLoad = opts.afterLoad || function() {};
        opts.close = function(opts) {
            opts.beforeClose();
            _this.getCurrentDiaolog(opts).remove();
            opts.afterClose();
        };
        this.dialogContent.html(opts.content || '');
        this.dialogTitle.html(this.title);
        if (this.btns.length >= 2) {
            this.leftDlgBtn.val(this.btns[0]);
            this.rightDlgBtn.val(this.btns[1]);
            this.doubleBtnWrap.removeClass('dn');
        }
        if (this.btns.length == 1) {
            this.centerDlgBtn.val(this.btns[0]);
            this.singleBtnWrap.removeClass('dn');
        }
        return opts;
    };
    AutoDialog.prototype.setDialogStyle = function(opts) {
        var dialogBoxStyle = {
            width: this.width,
            minHeight: this.height,
            left: '50%',
            top: '50%',
            marginLeft: (0 - this.width) / 2,
            marginTop: (0 - this.height) / 2
        };
        var dialogTitleStyle = {
            fontSize: this.titleFontSize + 'px',
            textAlign: this.titleTextAlign,
        };
        var dialogContentStyle = {
            fontFamily: this.contentFontFamily,
            fontSize: this.contentFontSize,
            color: this.contentColor,
            minHeight: this.height - 117,
            position: 'relative'
        };
        var buttonStyle = {
            width: this.buttonWidth,
            height: this.buttonHeight,
            lineHeight: (this.buttonHeight - 4) + 'px',
            fontSize: this.buttonFontSize,
            fontFamily: this.buttonFontFamily
        };
        this.dialogBox.css(dialogBoxStyle);
        this.dialogTitle.css(dialogTitleStyle);
        this.dialogContent.css(dialogContentStyle);
        this.leftDlgBtn.css(buttonStyle);
        this.rightDlgBtn.css(buttonStyle);
        this.centerDlgBtn.css(buttonStyle);
        $('body').append(this.autoDialog);
        opts.afterLoad();
    };
    AutoDialog.prototype.getCurrentDiaolog = function(opts) {
        return $('#dlgHolder' + (opts.id || ''));
    };
    AutoDialog.prototype.reset = function(opts) {
        var id = opts.id || '';
        $('#dlgHolder' + id).remove();
    };
    AutoDialog.prototype.resetAll = function() {
        $('.dlgHolder').remove();
    };
    AutoDialog.prototype.dialogShow = function(opts) {
        this.getCurrentDiaolog(opts).removeClass('dn');
    };
    AutoDialog.prototype.bindEvent = function(opts) {
        this.leftDlgBtn.unbind('click').bind('click', function(event) {
            opts.beforeConfirm();
            var bo = opts.confirm();
            opts.afterConfirm();
            if (!bo)
                opts.close(opts);
        });
        this.rightDlgBtn.unbind('click').bind('click', function(event) {
            opts.beforeCancel();
            opts.cancel();
            opts.afterCancel();
            opts.close(opts);
        });
        this.centerDlgBtn.unbind('click').bind('click', function(event) {
            var bo = opts.confirm();
            if (!bo)
                opts.close(opts);
        });
        this.closeBtn.unbind('click').bind('click', function(event) {
            opts.close(opts);
        });
    };
    AutoDialog.prototype.show = function(opts) {
        this.readyDilaog(opts);
        this.reset(opts);
        this.setDialog(opts);
        this.setDialogStyle(opts);
        this.bindEvent(opts);
    };
    return AutoDialog;
})();