module.exports = function(grunt) {

  grunt.config('nodeunit', {
    tests: ['test/*_test.js']
  });

  grunt.loadNpmTasks('grunt-contrib-nodeunit');
};
