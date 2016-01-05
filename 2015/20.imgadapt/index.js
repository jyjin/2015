// var imgHandler = function(imgId, maxWidth, maxHeight) {
//     var width, height, rateWidth, rateHeight, param = {
//         width: 0,
//         height: 0
//     };
//     im = new Image();
//     im.src = document.getElementById(imgId).src;
//     width = im.width;
//     height = im.height;

//     rateWidth = width / maxWidth;
//     rateHeight = height / maxHeight;
//     if (width > maxWidth && height > maxHeight) {
//         //1.只需水平居中 不用处理
//         if (rateWidth < rateHeight) return;
//         //2.宽满置顶 垂直居中
//         param.width = maxWidth;
//         param.height = Math.round(height / rateWidth);
//         setImgCenter.call(this, imgId, param.width, param.height);
//     } else if (width > maxWidth) {
//         //3.宽满置顶 垂直居中
//         param.width = maxWidth;
//         param.height = Math.round(height / rateWidth);
//         setImgCenter.call(this, imgId, param.width, param.height);
//     } else if (height > maxHeight) {
//         return;
//     } else {
//         param.width = width;
//         param.height = height;
//         setImgCenter.call(this, imgId, param.width, param.height);
//     }
// }

// /**
//  * imgId:图片Id
//  * width:图片自适应后的宽度
//  * height：图片自适应后的高度
//  */
// function setImgCenter(imgId, width, height) {
//     $('#' + imgId).css({
//         'position': 'absolute',
//         'left': '50%',
//         'top': '50%',
//         'margin-top': 0 - (height / 2),
//         'margin-left': 0 - (width / 2)
//     });
// }

// window.onload = function() {
//     imgHandler('img', 600, 800);
//     imgHandler('img1', 600, 800);
//     imgHandler('img2', 600, 800);
//     imgHandler('img3', 600, 800);
// }


var i = 0;

function run() {
    _s = setInterval(function() {
        d = new Date();
        console.log(d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + " " + d.getMilliseconds());
        $('#wrap').animate({
            top: 500 * i
        }, 500, function() {
            d1 = new Date();
            console.log(d1.getHours() + ":" + d1.getMinutes() + ":" + d1.getSeconds() + " " + d1.getMilliseconds());
            console.error('--------------------------------------------');
            i++;
            if(i==10) i=0;
        });
    }, 3000);
}

function runto(top) {
    $('#wrap').animate({
        top: top
    }, 500);
}

function stop() {
    clearInterval(_s);
}

function reset() {
    i = 0;
    stop();
    run();
}

$(function() {
    $('#wrap').animate({
        top: 100 * i
    }, 500);
    i++;
    $(document).on('click', '#start', function() {
        run();
    });

    $(document).on('click', '#stop', function() {
        stop();
    });

    $(document).on('click', '#reset', function() {
        reset();
    });

    $(document).on('click', '#300', function() {
        stop();
        runto(300);
        run();
    });
})