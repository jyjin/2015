/***
 *@author:jyjin
 *@data:2015.06.01
 *@remark:
 */
define(function(require, exports, module) {
    require('common');
    require('jqueryUi');
    var $ = require('tmpl');

    var imgHandler = {};

    /**
     * imgId:图片Id
     * width:图片自适应后的宽度
     * height：图片自适应后的高度
     */
    imgHandler.setImgCenter = function(imgId, width, height) {
        $('#d_img').css({
            'position': 'absolute',
            'left': '50%',
            'top': '50%',
            'margin-top': 0 - (height / 2),
            'margin-left': 0 - (width / 2)
        });
    }

    imgHandler.timestamp = function() {
        var timestamp1 = Date.parse(new Date());
        var timestamp2 = (new Date()).valueOf();
        var timestamp3 = new Date().getTime();
        return timestamp1.toString() + timestamp2.toString() + timestamp3.toString();
    }

    //获取图片原信息：
    //  创建一个新img元素，绑定src
    //  重新渲染到页面（要等到加载完成）
    //  new Image()对象
    //  绑定src所得即可
    imgHandler.setBackgroundImg = function(bg) {
        var im = document.createElement('img');
        var id = imgHandler.timestamp();
        im.setAttribute('id', id);
        im.style.display = 'none';
        im.src = document.defaultView.getComputedStyle(bg.get(0), null).getPropertyValue('background-image').replace('url(', '').replace(')', '');
        document.body.appendChild(im);
        bg.attr('imgid', id);
    };

    imgHandler.handImgToCenter = function(imgId, width, height, maxWidth, maxHeight) {
        var rateWidth, rateHeight, param = {
            width: 0,
            height: 0
        };
        im = new Image();

        rateWidth = width / maxWidth;
        rateHeight = height / maxHeight;
        if (width > maxWidth && height > maxHeight) {
            //1.只需水平居中 不用处理
            if (rateWidth < rateHeight) return;
            //2.宽满置顶 垂直居中
            param.width = maxWidth;
            param.height = Math.round(height / rateWidth);
            imgHandler.setImgCenter.call(this, imgId, param.width, param.height);
        } else if (width > maxWidth) {
            //3.宽满置顶 垂直居中
            param.width = maxWidth;
            param.height = Math.round(height / rateWidth);
            imgHandler.setImgCenter.call(this, imgId, param.width, param.height);
        } else if (height > maxHeight) {
            return;
        } else {
            param.width = width;
            param.height = height;
            imgHandler.setImgCenter.call(this, imgId, param.width, param.height);
        }
    }

    function ExcitingApp() {};

    ExcitingApp.prototype.loadCreData = function() {
        var appdata = require('appdata');
        $('#cre_tmpl').tmpl(appdata).insertBefore('#cre_li');
    };

    ExcitingApp.prototype.loadDialog = function() {
        $('#dialog').dialog({
            show: "fadeIn",
            hide: "fadeOut",
            width: 920,
            height: 720,
            modal: true,
            dialogClass: "my",
            open: function(event, ui) {
                $(".ui-dialog-titlebar", $(this).parent()).hide();
            }
        });
    };

    ExcitingApp.prototype.event = function() {
        $(document).on('click', '#close,.ui-widget-overlay', function() {
            $('#dialog').dialog('close');
        })
    }

    var excitingApp = new ExcitingApp();

    ExcitingApp.prototype.main = function(first_argument) {
        $(function() {
            excitingApp.loadCreData();
            excitingApp.event();
        });
        window.onload = function() {
            /***************************************************************
             *step1: 将裁减图片复制到弹层imgX
             *step2: 将原图片append到一个新的imgY标签（setBackgroundImg），并必须加载完成！！！
             *step3: 获取加载好的imgY,得到原图片尺寸
             *step4: 图片定位（handImgToCenter）
             **************************************************************/
            $('.pic-panel').on('click', '.panel-img', function() {
                $('#d_img').attr('src', $(this).attr('src'));
                // imgHandler.setBackgroundImg($(this));
                // imgid = $(this).attr('imgid')
                // var $img = $('#' + imgid) //$('#' + $(this).attr('imgid'));
                // imgHandler.handImgToCenter('d_img', $img.width(), $img.height(), 500, 600);
                // $img.remove();
                excitingApp.loadDialog();
            })
        }
    };

    module.exports = ExcitingApp;
})