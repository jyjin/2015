module.exports = function(grunt) {

    grunt.initConfig({
        less: {
          development: {
            options: {
              compress: false,
              yuicompress: false
            },
            files: {
              "index.css": "index.less",
              //"css/APP.web.index.css": "src/web/less/APP.web.index.less"
            }
          },
        }
      }
      );
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.registerTask('default', ['less']);

    };