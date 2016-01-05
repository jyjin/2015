require.config({
    baseUrl: 'E:/07.workspace/03.subProject/2015/backbone/script',
    paths: {
        //services
        'index': 'service/index',
        //module
        'app': 'app',
        'user': 'module/user',
        //libs
        'jquery': 'lib/jquery/jquery.min',
        'underscore': 'lib/underscore/underscore',
        'backbone': 'lib/backbone/backbone'
    },
    waitSeconds: 20,
    shim: {
        jquery: {
            exports: 'jQuery'
        },
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        }
    }
});

require(['jquery'], function($) {
    // alert($().jquery);
});