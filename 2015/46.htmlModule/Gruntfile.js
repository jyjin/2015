module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        // banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        // src: 'src/<%= pkg.name %>.js',
        // dest: 'build/<%= pkg.name %>.min.js'
      }
    },
    execute: {
      target: {
        src: ['compileTmpls.js']
      }
    },
    watch: {
      tpl: {
        files: ['view/template/*.html'],
        tasks: ['execute']
      }
    }
  });

  // 加载包含 "uglify" 任务的插件。
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-execute');//node执行
  grunt.loadNpmTasks('grunt-contrib-watch');//文件监听

  // 默认被执行的任务列表。
  grunt.registerTask('default', ['uglify','execute']);

};