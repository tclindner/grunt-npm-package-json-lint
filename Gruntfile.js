'use strict';

/* eslint object-curly-newline: 'off' */

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Configuration to be run (and then tested).
    npmpackagejsonlint: {
      defaultOptions: {
        options: {
          configFile: 'test/.npmpackagejsonlintrc'
        },
        files: {
          'tmp/default_options': [
            'test/fixtures/invalid-one/package.json',
            'test/fixtures/invalid-two/package.json',
            'test/fixtures/invalid-three/package.json'
          ]
        }
      },
      ignoreWarnings: {
        options: {
          configFile: 'test/.npmpackagejsonlintrc',
          ignorewarnings: true
        },
        files: {
          'tmp/ignorewarnings': [
            'test/fixtures/invalid-one/package.json',
            'test/fixtures/invalid-two/package.json',
            'test/fixtures/invalid-three/package.json'
          ]
        }
      },
      stoponerror: {
        options: {
          configFile: 'test/.npmpackagejsonlintrc',
          stoponerror: true
        },
        files: {
          'tmp/stoponerror': [
            'test/fixtures/invalid-one/package.json',
            'test/fixtures/invalid-two/package.json',
            'test/fixtures/invalid-three/package.json'
          ]
        }
      },
      stoponwarning: {
        options: {
          configFile: 'test/.npmpackagejsonlintrc',
          stoponwarning: true
        },
        files: {
          'tmp/stoponwarning': [
            'test/fixtures/invalid-one/package.json',
            'test/fixtures/invalid-two/package.json',
            'test/fixtures/invalid-three/package.json'
          ]
        }
      },
      showallerrors: {
        options: {
          configFile: 'test/.npmpackagejsonlintrc',
          showallerrors: true
        },
        files: {
          'tmp/showallerrors': [
            'test/fixtures/invalid-one/package.json',
            'test/fixtures/invalid-two/package.json',
            'test/fixtures/invalid-three/package.json',
            'test/fixtures/valid/package.json'
          ]
        }
      },
      showallerrswithstop: {
        options: {
          configFile: 'test/.npmpackagejsonlintrc',
          showallerrors: true,
          stoponwarning: true
        },
        files: {
          'tmp/showallerrswithstop': [
            'test/fixtures/invalid-one/package.json',
            'test/fixtures/invalid-two/package.json',
            'test/fixtures/invalid-three/package.json'
          ]
        }
      },
      stoponboth: {
        options: {
          configFile: 'test/.npmpackagejsonlintrc',
          stoponwarning: true,
          stoponerror: true
        },
        files: {
          'tmp/stoponboth': [
            'test/fixtures/invalid-one/package.json',
            'test/fixtures/invalid-two/package.json',
            'test/fixtures/invalid-three/package.json'
          ]
        }
      },
      pass: {
        options: {
          configFile: 'test/.npmpackagejsonlintrc'
        },
        files: {
          'tmp/pass': 'test/fixtures/valid/package.json'
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
