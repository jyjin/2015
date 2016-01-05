// var onWindowResize = function(){
//     //事件队列
//     debugger;
//     var queue = [],
 
//     indexOf = Array.prototype.indexOf || function(){
//         var i = 0, length = this.length;
//         for( ; i < length; i++ ){
//             if(this[i] === arguments[0]){
//                 return i;
//             }
//         }
 
//         return -1;
//     };
 
//     var isResizing = {}, //标记可视区域尺寸状态， 用于消除 lte ie8 / chrome 中 window.onresize 事件多次执行的 bug
//     lazy = true, //懒执行标记
 
//     listener = function(e){ //事件监听器
//         var h = window.innerHeight || (document.documentElement && document.documentElement.clientHeight) || document.body.clientHeight,
//             w = window.innerWidth || (document.documentElement && document.documentElement.clientWidth) || document.body.clientWidth;
 
//         if( h === isResizing.h && w === isResizing.w){
//             return;
 
//         }else{
//             e = e || window.event;
         
//             var i = 0, len = queue.length;
//             for( ; i < len; i++){
//                 queue[i].call(this, e);
//             }
 
//             isResizing.h = h,
//             isResizing.w = w;
//         }
//     }
 
//     return {
//         add: function(fn){
//             if(typeof fn === 'function'){
//                 if(lazy){ //懒执行
//                     if(window.addEventListener){
//                         window.addEventListener('resize', listener, false);
//                     }else{
//                         window.attachEvent('onresize', listener);
//                     }
 
//                     lazy = false;
//                 }
 
//                 queue.push(fn);
//             }else{  }
 
//             return this;
//         },
//         remove: function(fn){
//             if(typeof fn === 'undefined'){
//                 queue = [];
//             }else if(typeof fn === 'function'){
//                 var i = indexOf.call(queue, fn);
 
//                 if(i > -1){
//                     queue.splice(i, 1);
//                 }
//             }
 
//             return this;
//         }
//     };
// }.call(this);

(function($) {  
    $.fn.wresize = function(f) {  
        version = '1.1';  
        wresize = {  
            fired : false,  
            width : 0  
        };  
  
        function resizeOnce() {  
            if ($.browser.msie) {  
                if (!wresize.fired) {  
                    wresize.fired = true;  
                } else {  
                    var version = parseInt($.browser.version, 10);  
                    wresize.fired = false;  
                    if (version < 7) {  
                        return false;  
                    } else if (version == 7) {  
                        // a vertical resize is fired once, an horizontal resize  
                        // twice  
                        var width = $(window).width();  
                        if (width != wresize.width) {  
                            wresize.width = width;  
                            return false;  
                        }  
                    }  
                }  
            }  
            return true;  
        }  
  
        function handleWResize(e) {  
            if (resizeOnce()) {  
                return f.apply(this, [ e ]);  
            }  
        }  
  
        this.each(function() {  
            if (this == window) {  
                $(this).resize(handleWResize);  
            } else {  
                $(this).resize(f);  
            }  
        });
          
        return this;  
    };  
})(jQuery); 