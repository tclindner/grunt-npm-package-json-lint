/* eslint array-bracket-newline: 'off', array-element-newline: 'off' */

module.exports = function(grunt) {
  grunt.config.set('watch', {
    json: {
      files: [
        '**/*.json'
      ],
      tasks: [
        'jsonlint'
      ]
    },
    js: {
      files: [
        'tasks/**/*.js',
        'test/**/*_test.js'
      ],
      tasks: [
        'eslint',
        'nodeunit'
      ]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
};
