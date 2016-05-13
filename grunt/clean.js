// Cleans the dist directory (deletes all files)
module.exports = function(grunt) {

  grunt.config('clean', {
    tmp: ['tmp']
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
};
