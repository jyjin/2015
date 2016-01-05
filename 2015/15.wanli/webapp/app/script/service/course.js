/**
 * Created by jyjin on 2015/4/21.
 */
define(['jquery','require','exports'],function($,require,exports){
    exports.initDesc=function(listObject){
        listObject.find("li").hover(function(){
            $(this).find(".hide-desc").stop().animate({"bottom":"0px"});
        },function(){

            $(this).find(".hide-desc").stop().animate({"bottom":"-40px"});
        });
    }
});
