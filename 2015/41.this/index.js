$(function() {
    var arr = [];
    for (var i = 0; i < 20000000; i++) {
        arr.push(1111111)
    };

    //------------------------------------------------------------------------
    //length不缓存 每次都重新计算
    //------------------------------------------------------------------------
    var a = new Date().getTime();
    for (var i = 0; i < arr.length; i++) {
        var d = i;
    }
    var b = new Date().getTime();
    console.log('test1:' + (b - a) / 1000)

    //------------------------------------------------------------------------
    //length缓存 
    //------------------------------------------------------------------------
    var a1 = new Date().getTime();
    for (var i = 0, l = arr.length; i < l; i++) {
        var d = i;
    }
    var b1 = new Date().getTime();
    console.log('test2:' + (b1 - a1) / 1000);

    //------------------------------------------------------------------------
    //length缓存 
    //------------------------------------------------------------------------
    var a2 = new Date().getTime();
    var l = arr.length;
    for (var i = 0; i < l; i++) {
        var d = i;
    }
    var b2 = new Date().getTime();
    console.log('test3:' + (b2 - a2) / 1000)
})