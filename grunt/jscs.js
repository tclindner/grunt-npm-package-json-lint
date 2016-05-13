module.exports = function(grunt) {

  grunt.config('jscs', {
    main: {
      options: {
        config: '.jscsrc'
      },
      src: [
        'tasks/**/*.js',
        'grunt/**/*.js',
        'test/**/*_test.js',
        '*.js'
      ]
    }
  });

  grunt.loadNpmTasks('grunt-jscs');
};
