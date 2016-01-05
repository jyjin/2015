//以下代码测试waypoints

$(function() {
    new Waypoint({
        element: document.getElementById('div1'),
        handler: function(direction) {
            if (direction == 'up') return;
            $('body').stop().animate({
                scrollTop: $('#div2').offset().top
            }, 500)
        }
    });

    new Waypoint({
        element: document.getElementById('div2'),
        handler: function(direction) {
            direction == 'down' ? $('body').stop().animate({
                scrollTop: $('#div3').offset().top
            }, 500) : $('body').stop().animate({
                scrollTop: $('#div1').offset().top
            }, 500)
        }
    });

    new Waypoint({
        element: document.getElementById('div3'),
        handler: function(direction) {
            direction == 'down' ? $('body').stop().animate({
                scrollTop: $('#div4').offset().top
            }, 500) : $('body').stop().animate({
                scrollTop: $('#div2').offset().top
            }, 500)
        }
    });

    new Waypoint({
        element: document.getElementById('div4'),
        handler: function(direction) {
            direction == 'down' ? $('body').stop().animate({
                scrollTop: $('#div5').offset().top
            }, 500) : $('body').stop().animate({
                scrollTop: $('#div3').offset().top
            }, 500)
        }
    });

    new Waypoint({
        element: document.getElementById('div5'),
        handler: function(direction) {
            direction == 'down' ? $('body').stop().animate({
                scrollTop: $('#div6').offset().top
            }, 500) : $('body').stop().animate({
                scrollTop: $('#div4').offset().top
            }, 500)
        }
    });

    new Waypoint({
        element: document.getElementById('div6'),
        handler: function(direction) {
            if (direction == 'down') return;
            $('body').stop().animate({
                scrollTop: $('#div5').offset().top
            }, 500)
        }
    });

})