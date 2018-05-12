'use strict';

/* eslint object-curly-newline: 'off', array-bracket-newline: 'off', array-element-newline: 'off' */

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Configuration to be run (and then tested).
    npmpackagejsonlint: {
      defaultOptions: {
        options: {
          configFile: './test/.npmpackagejsonlintrc.json'
        },
        files: {
          'tmp/default_options': [
            './test/fixtures/invalid-one/package.json',
            './test/fixtures/invalid-two/package.json',
            './test/fixtures/invalid-three/package.json'
          ]
        }
      },
      quiet: {
        options: {
          configFile: './test/.npmpackagejsonlintrc.json',
          quiet: true
        },
        files: {
          'tmp/quiet': [
            './test/fixtures/invalid-one/package.json',
            './test/fixtures/invalid-two/package.json',
            './test/fixtures/invalid-three/package.json'
          ]
        }
      },
      maxWarningsOne: {
        options: {
          configFile: './test/.npmpackagejsonlintrc.json',
          maxWarnings: 0
        },
        files: {
          'tmp/maxWarningsOne': [
            './test/fixtures/invalid-one/package.json'
          ]
        }
      },
      maxWarningsTwo: {
        options: {
          configFile: './test/.npmpackagejsonlintrc.json',
          maxWarnings: 1
        },
        files: {
          'tmp/maxWarningsTwo': [
            './test/fixtures/invalid-one/package.json'
          ]
        }
      },
      empty: {
        options: {
          configFile: './test/.npmpackagejsonlintrc.json'
        },
        files: {
          'tmp/empty': []
        }
      },
      pass: {
        options: {
          configFile: './test/.npmpackagejsonlintrc.json'
        },
        files: {
          'tmp/pass': './test/fixtures/valid/package.json'
        }
      }
    }
  });

  // Load Grunt plugins from the config files in the grunt/ directory
  grunt.loadTasks('grunt');
  grunt.loadTasks('tasks');
  require('time-grunt')(grunt);

  // Register task for running linters
  grunt.registerTask('lint', [
    'jsonlint',
    'eslint'
  ]);

  // Whenever the 'test' task is run, first clean the 'tmp' dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', [
    'clean',
    'nodeunit'
  ]);

  // By default, lint and run all tests.
  grunt.registerTask('default', [
    'lint',
    'test'
  ]);
};
